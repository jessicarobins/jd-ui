class SpecsController < ApplicationController
  before_filter :authenticate_user!
  before_action :set_spec, only: [:show, :update, :destroy]

  # GET /specs
  # GET /specs.json
  def index
    @specs = Spec.all

    render json: @specs.arrange_serializable
  end

  # GET /specs/1
  # GET /specs/1.json
  def show
    render json: @spec
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
    
    if parent_id
      parent = Spec.find(parent_id)
      if parent.has_children?
        next_top_order = parent.children.last.spec_order + 1
      else
        next_top_order = 1
      end
    else
      next_top_order = Spec.for_project(@selected_project_id).pluck(:spec_order).max.to_i + 1
    end
    
    Spec.parse_block(params[:text], 
                      @selected_project_id, 
                      parent_id,
                      next_top_order,
                      :created_by_id => params[:created_by_id])
  end

  # PATCH/PUT /specs/1
  # PATCH/PUT /specs/1.json
  def update
    @spec = Spec.find(params[:id])

    if @spec.update(spec_params)
      head :no_content
    else
      render json: @spec.errors, status: :unprocessable_entity
    end
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
end
