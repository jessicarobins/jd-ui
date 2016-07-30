class TagTypeGroup < ActiveRecord::Base
    has_many :tag_types
    belongs_to :organization
    belongs_to :created_by, class_name: "User"
    
    validates_uniqueness_of :name
    validates_presence_of :name
    validates_presence_of :color
    
    before_create :downcase
    
    default_scope { order('lower(name)') }
    scope :for_user, -> (user) { where(:created_by => user) }
    
    private
        def downcase
            self.name.downcase!
        end
end
