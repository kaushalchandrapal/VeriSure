export interface IToolTips {
  regex?: any;
  title: string;
  noValidate?: boolean | null;
  showFailed?: boolean;
}
export interface IToolTipBoxProps {
  toolTipHeading: string;
  value: any;
  toolTips: IToolTips[];
  children?: any;
}
