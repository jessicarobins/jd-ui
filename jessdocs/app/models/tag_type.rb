class TagType < ActiveRecord::Base
    belongs_to :tag_type_group
    belongs_to :deleted_by, class_name: "User"
    belongs_to :created_by, class_name: "User"
    belongs_to :organization
    has_many :tags, dependent: :destroy
    
    acts_as_paranoid
    
    validates_presence_of :name
    # validates_uniqueness_of :name, :scope => :tag_type_group_id, :allow_nil => true, :allow_blank => true
    validates_presence_of :color
    
    default_scope { order("tag_type_group_id nulls first, LOWER(name)")}
    
    scope :by_group, -> { includes(:tag_type_group).all.group_by(&:tag_type_group) }
    
    before_create :downcase
    
    private
        def downcase
            self.name.downcase!
        end
end
