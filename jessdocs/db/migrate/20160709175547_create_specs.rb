class CreateSpecs < ActiveRecord::Migration
  def change
    create_table :specs do |t|
      
      t.string :description, null: false
      t.integer :created_by_id, null: false
      t.integer :updated_by_id, null: false
      t.string :ancestry
      t.integer :project_id, null: false
      t.boolean :bookmarked, default: false, null: false
      t.integer :spec_order, null: false
      t.time :deleted_at
      t.timestamps null: false
    end
    
    add_index :specs, :ancestry
    add_index :specs, :project_id, :name => 'project_id_ix'
  end
end
