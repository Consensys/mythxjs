interface IDescription {
  head: string;
  tail: string;
}

interface ILocation {
  sourceMap: string;
}

export interface IIssue {
  description: IDescription;
  extra: {};
  locations: ILocation[];
  severity: string;
  swcID: string;
  swcTitle: string;
}
