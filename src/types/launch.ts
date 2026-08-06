export interface LaunchLinks {
  mission_patch?: string | null;
  mission_patch_small?: string | null;
}

export interface LaunchRocket {
  rocket_name?: string | null;
}

export interface Launch {
  flight_number: number;
  mission_name?: string | null;
  launch_year?: string | null;
  details?: string | null;
  links?: LaunchLinks | null;
  rocket?: LaunchRocket | null;
}

export interface LaunchesResponse {
  launches: Launch[];
}