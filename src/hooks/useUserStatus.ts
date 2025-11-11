import { API_URL } from "../config/apiConfig";
import type { ResponseProps } from "../types/ResponseProps";

export function useUserStatus(
  token: string | null,
  fetchUsuarios: () => Promise<void>
) {
  const handleUserStatus = async (idUsuario: number, state: boolean) => {
    if (!confirm("¿Estás seguro que querés modificar al usuario?")) return;

    try {
      const res = await fetch(
        `${API_URL}/admin_recepcionista/usuario/${idUsuario}?state=${state}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const fetchResponse: ResponseProps<unknown> = await res.json();

      if (!fetchResponse.success) {
        alert(fetchResponse.message ?? "Error al modificar al usuario");
        return;
      }

      alert(fetchResponse.message);
      await fetchUsuarios();
    } catch (error) {
      console.error(error);
      alert("Hubo un error al procesar la acción.");
    }
  };

  return { handleUserStatus };
}
