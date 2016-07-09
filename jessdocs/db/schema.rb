# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160709175547) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "specs", force: :cascade do |t|
    t.string   "description",                   null: false
    t.integer  "created_by_id",                 null: false
    t.integer  "updated_by_id",                 null: false
    t.string   "ancestry"
    t.integer  "project_id",                    null: false
    t.boolean  "bookmarked",    default: false, null: false
    t.integer  "spec_order",                    null: false
    t.time     "deleted_at"
    t.datetime "created_at",                    null: false
    t.datetime "updated_at",                    null: false
  end

  add_index "specs", ["ancestry"], name: "index_specs_on_ancestry", using: :btree
  add_index "specs", ["project_id"], name: "project_id_ix", using: :btree

end
