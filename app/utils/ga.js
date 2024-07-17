import ReactGA from 'react-ga4';

export const initGA = () => {
  ReactGA.initialize('G-BM4GNPKD63'); // Reemplaza con tu ID de medición
};

export const logPageView = () => {
  ReactGA.send({ hitType: 'pageview', page: window.location.pathname });
};

export const logEvent = (category = '', action = '') => {
  if (category && action) {
    ReactGA.event({ category, action });
  }
};

export const logException = (description = '', fatal = false) => {
  if (description) {
    ReactGA.exception({ description, fatal });
  }
};
