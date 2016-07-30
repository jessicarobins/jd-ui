class ProjectsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_project, only: [:show, :update, :destroy]

  # GET /projects
  # GET /projects.json
  def index
    @projects = Project.for_user(current_user)
    render json: @projects
  end

  # GET /projects/1
  # GET /projects/1.json
  def show
    render json: @project
  end

  # POST /projects
  # POST /projects.json
  def create
    @project = Project.new(create_params)

    if @project.save
      render json: @project, status: :created, location: @project
    else
      render json: @project.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /projects/1
  # PATCH/PUT /projects/1.json
  def update
    if @project.update(update_params)
      head :no_content
    else
      render json: @project.errors, status: :unprocessable_entity
    end
  end

  # DELETE /projects/1
  # DELETE /projects/1.json
  def destroy
    @project.destroy

    head :no_content
  end

  private

    def set_project
      @project = Project.find(params[:id])
    end

    def project_params
      params[:project]
    end
    
    def create_params
      params.require(:project).permit(:name, :created_by_id)
    end
    
    def update_params
      params.require(:project).permit(:name)
    end
end
