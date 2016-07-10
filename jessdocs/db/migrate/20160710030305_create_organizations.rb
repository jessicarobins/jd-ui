class CreateOrganizations < ActiveRecord::Migration
  def change
    create_table :organizations do |t|
      t.string :name
      t.string :domain
      
      t.timestamps null: false
    end
  end
end
