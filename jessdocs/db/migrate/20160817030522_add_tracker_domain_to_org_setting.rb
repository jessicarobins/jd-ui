class AddTrackerDomainToOrgSetting < ActiveRecord::Migration
  def change
    add_column :org_settings, :tracker_domain, :string
  end
end
