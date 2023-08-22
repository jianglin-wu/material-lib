const BaseIframeTemplate = ({
  title,
  url,
  height,
}: {
  title: string;
  url: string;
  height: number | string;
}) => {
  return (
    <iframe
      loading="lazy"
      title={title}
      data-src={url}
      width="100%"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      src={url}
      {...(height ? { style: { height } } : '')}
    ></iframe>
  );
};
export default BaseIframeTemplate;
