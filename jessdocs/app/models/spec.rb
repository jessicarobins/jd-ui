class Spec < ActiveRecord::Base
    before_save :format
    
    has_ancestry
    
    acts_as_list scope: :project_id, column: :spec_order
    
    alias_attribute :name, :description
    
    validates_presence_of :description
    validates_presence_of :project_id
    
    belongs_to :project
    belongs_to :created_by, class_name: "User"
    belongs_to :updated_by, class_name: "User"
    has_many :tags, dependent: :destroy
    has_many :tickets, dependent: :destroy
    has_many :comments, dependent: :destroy
    has_many :tag_types, through: :tags
    
    alias_attribute :name, :description
    
    default_scope { order('spec_order ASC') }
    scope :with_tag_type, ->(type_id) { joins(:tags).where(tags: {tag_type_id: type_id})  }
    scope :for_project, ->(project_id) { where(:project_id => project_id) }
    scope :has_ticket, -> { joins(:tickets) }
    scope :full_ancestry_of_spec, -> (spec) {spec.path.union(spec.descendants)}
    
    def full_ancestry_ids
        self.path.union(self.descendants).pluck(:id)
    end
    
    def grouped_comments_json
        self.comments
            .includes(:user)
            .group_by(&:resolved)
            .as_json(:include => {:user => {:only => [:image, :name]}})
    end
    
    def self.filter(filter_params)
        specs = Spec.for_project(filter_params[:project_id])
        
        @filtered_spec_ids_array = []
        
        @spec_id = filter_params[:id]
        if @spec_id
            @filtered_spec_ids_array << Spec.find(@spec_id).subtree.pluck(:id)
        end
        
        @ticketed = filter_params[:ticketed]
        if @ticketed == true.to_s
            @filtered_spec_ids_array << Spec.all_ancestry_ids(specs.has_ticket)
        end
        
        @tag_type_ids = filter_params[:tag_types]
        if @tag_type_ids
            @tag_type_ids.each do |tag_type_id|
              @filtered_spec_ids_array << Spec.all_ancestry_ids(specs.with_tag_type(tag_type_id))
            end
        end
        
        @filtered_spec_ids = @filtered_spec_ids_array.inject(:&)
      
        if @filtered_spec_ids
            @filtered_spec_ids.uniq!
            specs = Spec.where(:id => @filtered_spec_ids)
        end
        
        specs
    end
    
    def self.all_ancestry_ids(specs)
        query = specs
        specs.map do |spec|
            query = query.union(Spec.full_ancestry_of_spec(spec))
        end
        
        query.pluck(:id)
    end

    def self.all_ancestry(specs)
        query = specs
        specs.map do |spec|
            query = query.union(Spec.full_ancestry_of_spec(spec))
        end
        
        query
    end
    
    def self.move(spec:, parent_id:nil, sibling_id:nil)
        if sibling_id
            sibling = Spec.find(sibling_id)
            new_pos = sibling.spec_order + 1
            spec.insert_at(new_pos)
            spec.update!(:parent => sibling.parent)
        elsif parent_id
            parent = Spec.find(parent_id)
            new_pos = parent.spec_order + 1
            spec.insert_at(new_pos)
            spec.update!(:parent => parent)
        else
            spec.move_to_top
            spec.update!(:parent => nil)
        end
        
    end

    def self.parse_block(text:, project_id:, parent_id: nil, created_by_id:)
        if parent_id
            insert_at = Spec.find(parent_id).spec_order + 1
        end
        return self.parse_alternate(   
            :text_array => text.split("\n"), 
            :project_id => project_id, 
            :parent_id => parent_id,
            :created_by_id => created_by_id,
            :insert_at => insert_at)
    end
    
    def self.parse_alternate(text_array:, project_id:, parent_id:nil, depth:0, previous:nil, error_count:0, created_by_id:, insert_at:nil, spec_count:0)
        #regex = /(\t*|-*)\s?(\w+)\s?(.*)/
        #instead of looking for s{2}* we should replace s{2}* with \t
        # not sure if this needs to be just the leading whitespace only?
        regex = /(-*)\s?(\w+)\s?(.*)/
        unless text_array.any?
            return {:specs_created => spec_count, :errors => error_count}
        end
        
        line = text_array.first
        #this is where we turn spaces into -s
        line.gsub!(/[ ]{2}/, '-')
        line.gsub!(/\t/, '-')
        
        tabs, spec_type_indicator, spec_description_rest = line.scan(regex).first
        spec_depth = tabs.nil? ? 0 : tabs.length
        
        spec_description = "#{spec_type_indicator} #{spec_description_rest}"
        
        begin
            spec = Spec.new(
                :description => spec_description,
                :project_id => project_id,
                :bookmarked => false,
                :created_by_id => created_by_id,
                :updated_by_id => created_by_id)
            if(spec_depth == 0)
                spec.parent_id = parent_id
            else
                if(depth == spec_depth)
                    parent = previous.nil? ? nil : previous.parent
                    spec.parent = parent
                elsif (spec_depth > depth) #deeper in, set the parent
                    spec.parent = previous
                else #spec_depth < depth. farther out... no idea
                    (depth-spec_depth).times do #this is how far back we need to go
                        previous = previous.parent
                    end
                    spec.parent = previous.parent
                end
            end
            
            spec.save!
            if insert_at
                spec.insert_at(insert_at)
                insert_at = insert_at + 1
            end
            spec_count = spec_count + 1
        rescue => error
            error_count = error_count + 1
            puts error.inspect
        end
        
        text_array.delete(line)
        self.parse_alternate(   
            :text_array => text_array, 
            :project_id => project_id, 
            :depth => spec_depth, 
            :previous => spec, 
            :error_count => error_count,
            :parent_id => parent_id,
            :insert_at => insert_at,
            :created_by_id => created_by_id,
            :spec_count => spec_count)
    end
    
    def self.export_spec_to_protractor(spec:, protractor_html: "", depth: 0)
        
        if spec["children"].any?
            depth.times do 
                protractor_html << "\t"
            end
            protractor_html << "describe('#{spec["description"].squish}', function(){\n\n"
            
            # children
            spec["children"].each do |child|
                export_spec_to_protractor( :spec => child, 
                                            :protractor_html => protractor_html,
                                            :depth => depth + 1)
            end
            
            
        else
            depth.times do 
                protractor_html << "\t"
            end
            protractor_html << "it('#{spec["description"].squish}', function(){\n\n"
            depth.times do 
                protractor_html << "\t"
            end
            protractor_html << "});\n\n"
            return protractor_html
        end
        depth.times do 
            protractor_html << "\t"
        end
        protractor_html << "};\n\n"
        
        protractor_html
    end
    
    def self.export_specs_to_protractor(specs:)
        protractor_html = "\n"
        
        specs.each do |spec|
            protractor_html << export_spec_to_protractor(:spec => spec)
        end
            
        protractor_html
    end
    
    private
        def format
            self.name.downcase!
            self.name.squish!
        end
end
