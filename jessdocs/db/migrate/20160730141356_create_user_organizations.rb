class CreateUserOrganizations < ActiveRecord::Migration
  def change
    create_table :user_organizations do |t|
      
      t.column :user_id, :int
      t.column :organization_id, :int
      t.timestamps null: false
    end
  end
end
