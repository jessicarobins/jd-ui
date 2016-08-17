class AddTrackerToTicket < ActiveRecord::Migration
  def change
    rename_column :tickets, :tracker_id, :string_id
    add_column :tickets, :tracker_id, :integer, :default => 1, :null => false
  end
  
  Ticket.all.each do |ticket|
    ticket.update!(:tracker_id => 1)
  end
end
