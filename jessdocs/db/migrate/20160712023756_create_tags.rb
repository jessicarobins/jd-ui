class CreateTags < ActiveRecord::Migration
  def change
    create_table :tags do |t|

      t.timestamps null: false
      
      t.column :spec_id, :integer, null: false
      t.column :tag_type_id, :integer, null: false
      t.column :deleted_at, :time
      t.column :deleted_by_id, :int
    end
  end
end
