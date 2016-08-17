class OrgSettingsController < ApplicationController
  before_action :set_org_setting, only: [:show, :update, :destroy]

  # GET /org_settings
  # GET /org_settings.json
  def index
    @org_settings = OrgSetting.all

    render json: @org_settings
  end

  # GET /org_settings/1
  # GET /org_settings/1.json
  def show
    render json: @org_setting
  end

  # POST /org_settings
  # POST /org_settings.json
  def create
    @org_setting = OrgSetting.new(org_setting_params)

    if @org_setting.save
      render json: @org_setting, status: :created, location: @org_setting
    else
      render json: @org_setting.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /org_settings/1
  # PATCH/PUT /org_settings/1.json
  def update
    if @org_setting.update(update_params)
      render json: @org_setting.to_json(:include => :tracker)
    else
      render json: @org_setting.errors, status: :unprocessable_entity
    end
  end

  # DELETE /org_settings/1
  # DELETE /org_settings/1.json
  def destroy
    @org_setting.destroy

    head :no_content
  end

  private

    def set_org_setting
      @org_setting = OrgSetting.find(params[:id])
    end

    def org_setting_params
      params[:org_setting]
    end
    
    def update_params
      params.require(:org_setting).permit(:tracker_id)
    end
end
