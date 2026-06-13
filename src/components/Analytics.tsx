export default function Analytics() {
  const gtagId = process.env.GTAG_ID;
  const matomoEndpoint = process.env.MATOMO_ENDPOINT;

  return (
    <>
      {gtagId && (
        <>
          {/* type="text/plain" + data-category keep the script inert until vanilla-cookieconsent enables the "analytics" category */}
          <script async data-category="analytics" src={`https://www.googletagmanager.com/gtag/js?id=${gtagId}`} type="text/plain" />
          <script
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${gtagId}');`,
            }}
            data-category="analytics"
            type="text/plain"
          />
        </>
      )}
      {matomoEndpoint && (
        <script
          dangerouslySetInnerHTML={{
            __html: `var _paq = window._paq = window._paq || [];
/* tracker methods like "setCustomDimension" should be called before "trackPageView" */
_paq.push(['trackPageView']);
_paq.push(['enableLinkTracking']);
(function () {
  var u = '${matomoEndpoint}/';
  _paq.push(['setTrackerUrl', u + 'matomo.php']);
  _paq.push(['setSiteId', '2']);
  var d = document, g = d.createElement('script'), s = d.getElementsByTagName('script')[0];
  g.async = true;
  g.src = u + 'matomo.js';
  s.parentNode.insertBefore(g, s);
})();`,
          }}
        />
      )}
    </>
  );
}
