class CreateTrackers < ActiveRecord::Migration
  def change
    create_table :trackers do |t|
      t.string :name, null: false
      t.string :url, null: false
      t.string :link_format
      t.string :leading_characters
      t.boolean :public, default: false, null: false
      t.boolean :domain, default: false, null: false
      
      t.timestamps null: false
    end
    
    Tracker.create!(
      :name => 'Pivotal',
      :url => 'https://www.pivotaltracker.com/story/show/',
      :leading_characters => '#',
      :public => true,
      :link_format => '#00000000',
      :domain => false)
  end
end
