class UserOrganizationsController < ApplicationController
  before_action :set_user_organization, only: [:show, :update, :destroy]

  # GET /user_organizations
  # GET /user_organizations.json
  def index
    @user_organizations = UserOrganization.all

    render json: @user_organizations
  end

  # GET /user_organizations/1
  # GET /user_organizations/1.json
  def show
    render json: @user_organization
  end

  # POST /user_organizations
  # POST /user_organizations.json
  def create
    @user_organization = UserOrganization.new(user_organization_params)

    if @user_organization.save
      render json: @user_organization, status: :created, location: @user_organization
    else
      render json: @user_organization.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /user_organizations/1
  # PATCH/PUT /user_organizations/1.json
  def update
    @user_organization = UserOrganization.find(params[:id])

    if @user_organization.update(user_organization_params)
      head :no_content
    else
      render json: @user_organization.errors, status: :unprocessable_entity
    end
  end

  # DELETE /user_organizations/1
  # DELETE /user_organizations/1.json
  def destroy
    @user_organization.destroy

    head :no_content
  end

  private

    def set_user_organization
      @user_organization = UserOrganization.find(params[:id])
    end

    def user_organization_params
      params[:user_organization]
    end
end
