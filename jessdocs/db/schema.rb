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

ActiveRecord::Schema.define(version: 20160712024531) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "organizations", force: :cascade do |t|
    t.string   "name"
    t.string   "domain"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "projects", force: :cascade do |t|
    t.string   "name",            null: false
    t.integer  "organization_id"
    t.integer  "created_by_id",   null: false
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

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

  create_table "tag_type_groups", force: :cascade do |t|
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.string   "name"
    t.string   "color"
    t.integer  "organization_id"
    t.integer  "created_by_id"
  end

  create_table "tag_types", force: :cascade do |t|
    t.datetime "created_at",        null: false
    t.datetime "updated_at",        null: false
    t.string   "name",              null: false
    t.string   "color",             null: false
    t.integer  "tag_type_group_id"
    t.integer  "organization_id"
    t.integer  "created_by_id",     null: false
    t.time     "deleted_at"
    t.integer  "deleted_by_id"
  end

  create_table "tags", force: :cascade do |t|
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
    t.integer  "spec_id",       null: false
    t.integer  "tag_type_id",   null: false
    t.time     "deleted_at"
    t.integer  "deleted_by_id"
  end

  create_table "tickets", force: :cascade do |t|
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
    t.string   "name",          null: false
    t.integer  "spec_id",       null: false
    t.string   "tracker_id"
    t.time     "deleted_at"
    t.integer  "deleted_by_id"
  end

  create_table "users", force: :cascade do |t|
    t.string   "provider",               default: "email", null: false
    t.string   "uid",                    default: "",      null: false
    t.string   "encrypted_password",     default: "",      null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,       null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.string   "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string   "unconfirmed_email"
    t.string   "name"
    t.string   "nickname"
    t.string   "image"
    t.string   "email"
    t.json     "tokens"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "users", ["email"], name: "index_users_on_email", using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree
  add_index "users", ["uid", "provider"], name: "index_users_on_uid_and_provider", unique: true, using: :btree

end
