class OrgSetting < ActiveRecord::Base
    belongs_to :organization
    belongs_to :tracker
end
