# app/controllers/overrides/token_validations_controller.rb
module Overrides
  class TokenValidationsController < DeviseTokenAuth::TokenValidationsController

    def validate_token
      # @resource will have been set by set_user_by_token concern
      if @resource
        render json: {
          data: @resource.as_json(
            :include => [{
            :organizations => {
              :include => {
                :org_setting => {
                  :include => :tracker
                }}}}, :user_setting], :methods => :roles)
        }
      else
        render json: {
          success: false,
          errors: ["Invalid login credentials"]
        }, status: 401
      end
    end
  end
end