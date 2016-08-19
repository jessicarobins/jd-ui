class Tracker < ActiveRecord::Base
    default_scope { order('lower(name)') }
end
