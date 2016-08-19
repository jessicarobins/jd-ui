class Ticket < ActiveRecord::Base
    acts_as_paranoid
    
    belongs_to :spec
    belongs_to :tracker
    
    before_create :add_ids
    
    validates_presence_of :spec_id
    validates_presence_of :tracker_id
    validates_presence_of :name
    
    validates_as_paranoid
    validates_uniqueness_of_without_deleted :name, :scope => :spec_id
    
    def url
        tracker_url = self.tracker.url
        if self.tracker.domain
            domain = self.spec.project.organization.org_setting.tracker_domain
            tracker_url.sub!('#', domain)
        end
        tracker_url + self.string_id
    end

    private
        def add_ids
            add_tracker_id
            format_strings
        end
        
        def add_tracker_id
            self.tracker_id = self.spec.project.organization.org_setting.tracker_id
        end
        
        def format_strings
            string_id = self.name.strip
            name = string_id
            
            if self.tracker.remove_from_name
                regex = Regexp.new self.tracker.remove_from_name
                name = name.sub regex, ''
            end
            self.name = name
            
            if self.tracker.remove_from_string_id
                regex = Regexp.new self.tracker.remove_from_string_id
                string_id = string_id.sub regex, ''
            end
            self.string_id = string_id
        end
end
