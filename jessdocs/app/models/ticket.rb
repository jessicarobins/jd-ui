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
        tracker_url = "https://www.pivotaltracker.com/story/show/"
        tracker_url + self.string_id
    end

    def self.get_url(str_id)
        "https://www.pivotaltracker.com/story/show/" + str_id
    end

    private
        def add_ids
            add_tracker_id
            parse_string_id
        end
        
        def add_tracker_id
            self.tracker_id = self.spec.project.organization.org_setting.tracker_id
        end
        
        def parse_string_id
            string_id = self.name.strip
            
            if self.tracker.leading_characters
                regex = Regexp.new self.tracker.leading_characters
                string_id = string_id.sub regex, ''
            end
            self.string_id = string_id
        end
end
