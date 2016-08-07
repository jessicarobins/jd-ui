class SpecsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_spec, only: [:show, :update, :destroy, :breadcrumbs, :move]

  # GET /specs
  # GET /specs.json
  def index
    @specs = Spec.all
    
    render json: @specs.arrange_serializable(:order => 'spec_order ASC')
  end
  
  def filter
    @specs = Spec.filter(params)
    
    json = @specs.includes(:comments).arrange_serializable(:order => 'spec_order ASC') do |parent, children|
    {
         data: parent.as_json(
            :methods => [
              :grouped_comments_json, :open_comments_count
            ]),
         children: children
    }
    end
    
    @bookmarks = @specs.where(:bookmarked => true)
    render json: {
      specs: json, 
      bookmarks: @bookmarks }
  end

  # GET /specs/1
  # GET /specs/1.json
  def show
    render json: @spec
  end
  
  def bookmarks
    @specs = Spec.filter(params).where(:bookmarked => true)
    render json: @specs
  end
  
  def breadcrumbs
    @breadcrumbs = @spec.path
    render json: @breadcrumbs
  end
  
  def export
    if params[:spec_ids]
      @specs = Spec.where(:id => params[:spec_ids]).arrange_serializable(:order => 'spec_order ASC')
      @spec_data = Spec.export_specs_to_protractor(:specs => @specs)
    else
      @spec_data = nil
    end
    
    render json: {export: @spec_data}
  end

  # POST /specs
  # POST /specs.json
  def create
    @spec = Spec.new(spec_params)

    if @spec.save
      render json: @spec, status: :created, location: @spec
    else
      render json: @spec.errors, status: :unprocessable_entity
    end
  end
  
  def create_many
    parent_id = params[:parent_id]
    @selected_project_id = params[:project_id]
  
    results = Spec.parse_block(
      :text => params[:text], 
      :project_id => @selected_project_id, 
      :parent_id => parent_id,
      :created_by_id => current_user.id)
      
    render :json => results
  end

  # PATCH/PUT /specs/1
  # PATCH/PUT /specs/1.json
  def update
    update_params.merge(:updated_by => current_user)
    if @spec.update(update_params)
      head :no_content
    else
      render json: @spec.errors, status: :unprocessable_entity
    end
  end
  
  def move
    Spec.move(
      :spec => @spec, 
      :parent_id => move_params[:parent_id],
      :sibling_id => move_params[:sibling_id])
  end
  
  # DELETE /specs/1
  # DELETE /specs/1.json
  def destroy
    @spec.destroy

    head :no_content
  end

  private

    def set_spec
      @spec = Spec.find(params[:id])
    end

    def spec_params
      params[:spec]
    end
    
    def update_params
      params.require(:spec).permit(:bookmarked, :description)
    end
    
    def move_params
      params.require(:spec).permit(:parent_id, :sibling_id)
    end
end
