class UserSettingsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_user_setting, only: [:show, :update, :destroy]

  # GET /user_settings
  # GET /user_settings.json
  def index
    @user_settings = UserSetting.all

    render json: @user_settings
  end

  # GET /user_settings/1
  # GET /user_settings/1.json
  def show
    render json: @user_setting
  end

  # POST /user_settings
  # POST /user_settings.json
  def create
    @user_setting = UserSetting.new(user_setting_params)

    if @user_setting.save
      render json: @user_setting, status: :created, location: @user_setting
    else
      render json: @user_setting.errors, status: :unprocessable_entity
    end
  end
  
  def toggle_menu_favorite
    favorite = menu_favorite_params[:name]
    setting = current_user.user_setting
    if setting.menu_favorites.include? favorite
      setting.menu_favorites.delete(favorite)
    else
      setting.menu_favorites.push favorite
    end
    setting.save!
  end

  # PATCH/PUT /user_settings/1
  # PATCH/PUT /user_settings/1.json
  def update
    @user_setting = UserSetting.find(params[:id])

    if @user_setting.update(user_setting_params)
      head :no_content
    else
      render json: @user_setting.errors, status: :unprocessable_entity
    end
  end

  # DELETE /user_settings/1
  # DELETE /user_settings/1.json
  def destroy
    @user_setting.destroy

    head :no_content
  end

  private

    def set_user_setting
      @user_setting = UserSetting.find(params[:id])
    end

    def user_setting_params
      params[:user_setting]
    end
    
    def menu_favorite_params
      params.require(:favorite).permit(:name)
    end
end
