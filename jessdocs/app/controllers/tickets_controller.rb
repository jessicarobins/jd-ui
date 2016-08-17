class TicketsController < ApplicationController
  before_action :set_ticket, only: [:show, :update, :destroy]

  # GET /tickets
  # GET /tickets.json
  def index
    @tickets = Ticket.all

    render json: @tickets.group_by(&:spec_id).to_json(:methods => :url)
  end

  # GET /tickets/1
  # GET /tickets/1.json
  def show
    render json: @ticket
  end

  # POST /tickets
  # POST /tickets.json
  def create
    
    @ticket = Ticket.new(create_params)

    if @ticket.save
      render json: @ticket.to_json(:methods => :url), status: :created, location: @ticket
    else
      render json: @ticket.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /tickets/1
  # PATCH/PUT /tickets/1.json
  def update
    @ticket = Ticket.find(params[:id])

    if @ticket.update(ticket_params)
      head :no_content
    else
      render json: @ticket.errors, status: :unprocessable_entity
    end
  end

  # DELETE /tickets/1
  # DELETE /tickets/1.json
  def destroy
    @ticket.destroy

    head :no_content
  end

  private

    def set_ticket
      @ticket = Ticket.find(params[:id])
    end

    def ticket_params
      params[:ticket]
    end
    
    def create_params
      params.require(:ticket).permit(:name, :spec_id)
    end
end
