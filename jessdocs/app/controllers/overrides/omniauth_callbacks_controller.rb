module Overrides
  class OmniauthCallbacksController < DeviseTokenAuth::OmniauthCallbacksController

    def omniauth_success
      get_resource_from_auth_hash
      create_token_info
      set_token_on_resource
      create_auth_params
  
      if resource_class.devise_modules.include?(:confirmable)
        # don't send confirmation email!!!
        @resource.skip_confirmation!
      end
  
      sign_in(:user, @resource, store: false, bypass: false)
  
      @resource.save!
  
      yield @resource if block_given?
  
      render_data_or_redirect('deliverCredentials', 
        @auth_params.as_json, 
        @resource.as_json(
          :include => [{
            :organizations => {
              :include => {
                :org_setting => {
                  :include => :tracker
                }}}}, :user_setting], :methods => :roles))
    end
  end
end