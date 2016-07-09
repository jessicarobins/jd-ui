class SpecsController < ApplicationController
  before_action :set_spec, only: [:show, :update, :destroy]

  # GET /specs
  # GET /specs.json
  def index
    @specs = Spec.all

    render json: @specs
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
