export interface ContactRequest {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export interface ContactResponse {
  message: string;
}
export interface ContactInfoItem {
  icon: string;
  titleKey: string;
  valueKey: string;
  hrefPrefix?: string;
  forceLtr?: boolean;
}
