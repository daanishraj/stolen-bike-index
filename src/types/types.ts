export type FrameColor = 'Black'
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

export type Bike = {
    date_stolen: number | null;
    description: string | null;
    frame_colors: FrameColor[] | null;
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

export type BikeSearchGetResponse = {
    bikes: Bike[]
};

export type BikeCountGetResponse = {
    non: number;
    stolen: number;
    proximity: number;
};

export enum QueryKeys {
    Bikes = 'bikes',
    BikesCount = 'bikesCount'
  }
