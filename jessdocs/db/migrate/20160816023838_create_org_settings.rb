class CreateOrgSettings < ActiveRecord::Migration
  def change
    create_table :org_settings do |t|
      t.integer :tracker_id, default: 1
      t.integer :organization_id, null: false
      t.string :default_role, default: 'read'
      t.boolean :autoadd, default: false
      t.timestamps null: false
      t.timestamps null: false
    end
    
    Organization.all.each do |org|
      OrgSetting.create!(:organization_id => org.id)
    end
  end
end
