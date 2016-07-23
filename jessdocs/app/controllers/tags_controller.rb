class TagsController < ApplicationController
  before_action :set_tag, only: [:show, :update, :destroy]

  # GET /tags
  # GET /tags.json
  def index
    @tags = Tag.all

    render json:  Tag.all.includes(:tag_type).group_by(&:spec_id).to_json(:include => :tag_type)
  end

  # GET /tags/1
  # GET /tags/1.json
  def show
    render json: @tag
  end

  # POST /tags
  # POST /tags.json
  def create
    @tag = Tag.new(create_params)

    if @tag.save
      render json: @tag.to_json(:include => :tag_type), status: :created, location: @tag
    else
      render json: @tag.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /tags/1
  # PATCH/PUT /tags/1.json
  def update
    if @tag.update(tag_params)
      head :no_content
    else
      render json: @tag.errors, status: :unprocessable_entity
    end
  end

  # DELETE /tags/1
  # DELETE /tags/1.json
  def destroy
    @tag.destroy

    head :no_content
  end

  private

    def set_tag
      @tag = Tag.find(params[:id])
    end

    def tag_params
      params[:tag]
    end
    
    def create_params
      params.require(:tag).permit(:tag_type_id, :spec_id)
    end
end
