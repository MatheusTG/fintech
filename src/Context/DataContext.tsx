import React from "react";
import useFetch from "../Hooks/useFetch";

type IVenda = {
  id: string;
  nome: string;
  preco: number;
  status: "pago" | "processando" | "falha";
  pagamento: "boleto" | "pix" | "cartao";
  data: string;
  parcelas: number | null;
};

type IDataContext = {
  data: IVenda[] | null;
  loading: boolean;
  error: string | null;
};

const DataContext = React.createContext<IDataContext | null>(null);

export const useData = () => {
  const context = React.useContext(DataContext);
  if (!context) throw new Error("useData precisa estar em DataContextProvider");
  return context;
};

export const DataContextProvider = ({ children }: React.PropsWithChildren) => {
  const { data, loading, error } = useFetch<IVenda[] | null>(
    "https://data.origamid.dev/vendas/"
  );

  return (
    <DataContext.Provider
      value={{ data, loading, error }}
    ></DataContext.Provider>
  );
};
