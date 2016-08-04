class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      
      t.string  :text,      null: false
      t.boolean :resolved,  null: false, default: false
      t.integer :user_id,   null: false
      t.integer :spec_id,   null: false
      t.string  :ancestry
    
      t.timestamps null: false
    end
    
    add_index :comments, :ancestry
  end
end
