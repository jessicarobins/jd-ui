class Ticket < ActiveRecord::Base
    acts_as_paranoid
    
    belongs_to :spec
    belongs_to :tracker
    
    before_create :parse_string_id
    
    validates_presence_of :spec_id
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
        def parse_string_id
            string_id = self.name.strip
            if string_id.first === '#'
                string_id.slice!(0)
            end
            self.string_id = string_id
        end
end
