export type TFrameColor = 'Black'
    | 'Blue'
    | 'Brown'
    | 'Green'
    | 'Orange'
    | 'Pink'
    | 'Purple'
    | 'Red'
    | 'Silver, gray or bare metal'
    | 'Stickers tape or other cover-up'
    | 'Teal'
    | 'White'
    | 'Yellow or Gold';

export type TBike = {
    date_stolen: number | null;
    description: string | null;
    frame_colors: TFrameColor[] | null;
    frame_model: string | null;
    id: number;
    is_stock_img: boolean | null;
    large_img: string | null;
    location_found: string | null;
    manufacturer_name: string | null;
    external_id: string | null;
    registry_name: string | null;
    registry_url: string | null;
    serial: string | null;
    status: string | null;
    stolen: boolean | null;
    stolen_coordinates: number[] | null;
    stolen_location: string | null;
    thumb: string | null;
    title: string | null;
    url: string | null;
    year: number | null;
    propulsion_type_slug: string | null;
    cycle_type_slug: string | null;

};

export type TBikeDetails = {
    serial: string | null;
    manufacturer: string | null;
    title: string;
    frame_model: string | null;
    frame_material_slug: string | null;
    frame_colors: string[] | null;
    large_img: string | null;
    thumb: string | null;
    year: number | null;
    frame_size: string | null; //VERIFY the type
    registration_created_at: number | null;
    description: string | null;
    stolen_coordinates: number[] | null;
    stolen_record: {
      date_stolen: number | null;
      location: string | null;
      latitude: number | null;
      longitude: number | null;
      theft_description: string | null;
      locking_description: string | null;
      lock_defeat_description: string | null;
      police_report_number: string | null;
      police_report_department: string | null;
      created_at: number | null;
      create_open311: boolean | null;
      id: number | null;
    } | null;

};

export type TBikeDetailsGetResponse = {
    bike: TBikeDetails;
};

export type TBikeSearchGetResponse = {
    bikes: TBike[]
};

export type TBikeCountGetResponse = {
    non: number;
    stolen: number;
    proximity: number;
};

export enum QueryKeys {
    BikeSearch = 'bikeSearch',
    BikesCount = 'bikesCount',
    BikeDetails = 'bikeDetails',
  }
