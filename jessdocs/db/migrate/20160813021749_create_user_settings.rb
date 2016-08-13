class CreateUserSettings < ActiveRecord::Migration
  def change
    create_table :user_settings do |t|
      t.string :menu_favorites, array: true, default: []
      t.integer :user_id, null: false
      t.timestamps null: false
    end
    
    User.all.each do |user|
      UserSetting.create!(:user => user)
    end
  end
end
