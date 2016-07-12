class CreateTagTypes < ActiveRecord::Migration
  def change
    create_table :tag_types do |t|

      t.timestamps null: false
      
      t.column :name, :string, null: false
      t.column :color, :string, null: false
      t.column :tag_type_group_id, :int
      t.column :organization_id, :int
      t.column :created_by_id, :int, null: false
      
      #acts as paranoid
      t.column :deleted_at, :time
      t.column :deleted_by_id, :int
    end
  end
end
