class CreateTagTypeGroups < ActiveRecord::Migration
  def change
    create_table :tag_type_groups do |t|

      t.timestamps null: false
      
      t.column :name, :string
      t.column :color, :string
      t.column :organization_id, :int
      t.column :created_by_id, :int
    end
  end
end
