import { AlertContext, TvShowContext, TvShowDispatchContext, ViewContext } from './Contexts.js';

export function MyProviders({ children, alertProps, dataProps, showsDispatch, viewProps }) {
  return (
    <AlertContext value={alertProps}>
      <TvShowContext value={dataProps}>
        <TvShowDispatchContext value={showsDispatch}>
          <ViewContext value={viewProps}>
            {children}
          </ViewContext>
        </TvShowDispatchContext>
      </TvShowContext>
    </AlertContext>
  );
}
