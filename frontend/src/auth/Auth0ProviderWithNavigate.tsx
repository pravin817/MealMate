// import { useCreateMyUser } from "@/api/MyUserApi";
import { Auth0Provider, AppState, User } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

type Props = {
  children: React.ReactNode;
};

const Auth0ProviderWithNavigate = ({ children }: Props) => {
  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientId = import.meta.env.VITE_AUTH0_CLIENTID;
  const redirectUri = import.meta.env.VITE_AUTH0_CALLBACK_URL;

  const navigate = useNavigate();

  if (!domain || !clientId || !redirectUri) {
    throw new Error(
      "Unable to initialize Auth0ProviderWithNavigate. Missing configuration."
    );
  }

  const onRedirectCallback = (appState?: AppState, user?: User) => {
    navigate("/auth-callback");
  };
  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUri,
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithNavigate;
