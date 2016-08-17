# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


Tracker.create!(
    :name => 'jira',
    :url => "https://#.atlassian.com/browse/",
    :link_format => 'PROJ-1',
    :public => true,
    :domain => true)
    
Tracker.create!(
    :name => 'trello',
    :url => 'https://trello.com/c/',
    :link_format => '1a1aAaaa/card-description',
    :leading_characters => '[^\/]+\/',
    :domain => false,
    :public => true)