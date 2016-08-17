class TrackersController < ApplicationController
  before_action :set_tracker, only: [:show, :update, :destroy]

  # GET /trackers
  # GET /trackers.json
  def index
    @trackers = Tracker.where(:public => true)

    render json: @trackers
  end

  # GET /trackers/1
  # GET /trackers/1.json
  def show
    render json: @tracker
  end

  # POST /trackers
  # POST /trackers.json
  def create
    @tracker = Tracker.new(tracker_params)

    if @tracker.save
      render json: @tracker, status: :created, location: @tracker
    else
      render json: @tracker.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /trackers/1
  # PATCH/PUT /trackers/1.json
  def update
    @tracker = Tracker.find(params[:id])

    if @tracker.update(tracker_params)
      head :no_content
    else
      render json: @tracker.errors, status: :unprocessable_entity
    end
  end

  # DELETE /trackers/1
  # DELETE /trackers/1.json
  def destroy
    @tracker.destroy

    head :no_content
  end

  private

    def set_tracker
      @tracker = Tracker.find(params[:id])
    end

    def tracker_params
      params[:tracker]
    end
end
