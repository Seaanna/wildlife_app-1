class SightingsController < ApplicationController
  before_action :set_sighting, only: [:show, :edit, :update, :destroy]

  # GET /sightings
  # GET /sightings.json
  def index
    # IFFFF we have an start date AND and end date
    if !params[:start_date].nil? && !params[:start_date].empty? && !params[:end_date].nil? && !params[:end_date].empty? && !params[:region].nil? && !params[:region].empty?
    # then use the where to select sightings
      @sightings = Sighting.where(date: params[:start_date]..params[:end_date], region: params[:region])
    # else just set @sightings to all sightings in the DB
    else
      @sightings = Sighting.all
    end

  end

  # GET /sightings/1
  # GET /sightings/1.json
  def show
  end

  # GET /sightings/new
  def new
    @sighting = Sighting.new
    @animals_for_select = Animal.all.map do |animal|
      [animal.common_name, animal.id]
    end
  end

  # GET /sightings/1/edit
  def edit
    @animals_for_select = Animal.all.map do |animal|
      [animal.common_name, animal.id]
    end
  end

  # POST /sightings
  # POST /sightings.json
  def create
    @sighting = Sighting.new(sighting_params)

    respond_to do |format|
      if @sighting.save
        format.html { redirect_to @sighting, notice: 'Sighting was successfully created.' }
        format.json { render :show, status: :created, location: @sighting }
      else
        format.html { render :new }
        format.json { render json: @sighting.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /sightings/1
  # PATCH/PUT /sightings/1.json
  def update
    respond_to do |format|
      if @sighting.update(sighting_params)
        format.html { redirect_to @sighting, notice: 'Sighting was successfully updated.' }
        format.json { render :show, status: :ok, location: @sighting }
      else
        format.html { render :edit }
        format.json { render json: @sighting.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /sightings/1
  # DELETE /sightings/1.json
  def destroy
    @sighting.destroy
    respond_to do |format|
      format.html { redirect_to sightings_url, notice: 'Sighting was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  #method get_sightings from calendar
  def get_sightings
    @sightings = Sighting.all
    sightings = []
    @sightings.each do |sighting|
      sightings << {:id => sighting.id, :title => sighting.animal.common_name, :start => sighting.date, url: "/sightings/" + sighting.id.to_s}
    end
    render :json => sightings.to_json
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_sighting
      @sighting = Sighting.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def sighting_params
      params.require(:sighting).permit(:date, :latitude, :longitude, :region, :animal_id)
    end
end
