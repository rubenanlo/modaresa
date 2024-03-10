import { GA_TRACKING_ID } from "root/config";

interface EventParams {
  action: string;
  category: string;
  label: string;
  value?: number;
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string): void => {
  window.gtag("config", GA_TRACKING_ID, {
    page_path: url,
  });
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({
  action,
  category,
  label,
  value,
}: EventParams): void => {
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

//TODO: uncomment the code below if we are adding any downloads section

// export const trackDownload = (url: string): void => {
//   event({
//     action: "download",
//     category: "downloads",
//     label: url,
//   });
// };
