class CreateProjects < ActiveRecord::Migration
  def change
    create_table :projects do |t|
      t.column :name, :string, null:false
      t.column :organization_id, :integer
      t.column :created_by_id, :integer, null: false
      t.timestamps null: false
    end
  end
end
