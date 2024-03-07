import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { SetterOrUpdater } from "recoil";

export const useGetAuth0Token = (setToken: SetterOrUpdater<string>) => {
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const getToken = async () => {
      try {
        const token = await getAccessTokenSilently({});
        setToken(token);
      } catch (e: any) {
        console.log(e.message);
      }
    };
    getToken();
  }, []);
};
