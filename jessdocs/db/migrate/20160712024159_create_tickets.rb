class CreateTickets < ActiveRecord::Migration
  def change
    create_table :tickets do |t|

      t.timestamps null: false
      
      t.column :name, :string, :null => false
      t.column :spec_id, :integer, :null => false
      t.column :tracker_id, :string
      t.column :deleted_at, :time
      t.column :deleted_by_id, :int
    end
  end
end
