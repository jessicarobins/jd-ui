class TrackerLeadingChars < ActiveRecord::Migration
  def change
    rename_column :trackers, :leading_characters, :remove_from_name
    add_column :trackers, :remove_from_string_id, :string
  end
end
