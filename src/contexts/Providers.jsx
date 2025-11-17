import { AlertContext, TvShowContext, ViewContext } from './Contexts.js';

export function MyProviders({ children, alertProps, dataProps, viewProps }) {
  return (
    <AlertContext value={alertProps}>
      <TvShowContext value={dataProps}>
        <ViewContext value={viewProps}>
          {children}
        </ViewContext>
      </TvShowContext>
    </AlertContext>
  );
}
