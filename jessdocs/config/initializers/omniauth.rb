# config/initializers/omniauth.rb
Rails.application.config.middleware.use OmniAuth::Builder do
  provider :google_oauth2, "459892137518-4dbpdd2r0a7bsrjc1dovngrb4kvvi4i8.apps.googleusercontent.com",   "E1UNqKaSJfavoHMqUyo96aTJ"
end