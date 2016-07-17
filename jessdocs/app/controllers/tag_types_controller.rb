class TagTypesController < ApplicationController
  before_action :set_tag_type, only: [:show, :update, :destroy]

  # GET /tag_types
  # GET /tag_types.json
  def index
    @tag_types = TagType.all

    render json: {by_group: TagType.tag_hash, all_types: @tag_types}
  end

  # GET /tag_types/1
  # GET /tag_types/1.json
  def show
    render json: @tag_type
  end

  # POST /tag_types
  # POST /tag_types.json
  def create
    @tag_type = TagType.new(create_params)

    if @tag_type.save
      render json: @tag_type, status: :created, location: @tag_type
    else
      render json: @tag_type.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /tag_types/1
  # PATCH/PUT /tag_types/1.json
  def update
    @tag_type = TagType.find(params[:id])

    if @tag_type.update(tag_type_params)
      head :no_content
    else
      render json: @tag_type.errors, status: :unprocessable_entity
    end
  end

  # DELETE /tag_types/1
  # DELETE /tag_types/1.json
  def destroy
    @tag_type.destroy

    head :no_content
  end

  private

    def set_tag_type
      @tag_type = TagType.find(params[:id])
    end

    def tag_type_params
      params[:tag_type]
    end
    
    def create_params
      params.require(:tag_type).permit(:name, :color, :created_by_id, :tag_type_group_id)
    end
end
