import GraficoVendas from "../Components/GraficoVendas";
import { useData } from "../Context/DataContext";

const Resumo = () => {
  const { data } = useData();

  if (data === null) return null;
  return (
    <section>
      <div className="resumo flex mb">
        <div className="box">
          <h2>Vendas</h2>
          {data
            .filter((venda) => venda.status !== "falha")
            .reduce((acc, venda) => acc + venda.preco, 0)
            .toLocaleString("pr-br", { style: "currency", currency: "BRL" })}
        </div>
        <div className="box">
          <h2>Recebido</h2>
          {data
            .filter((venda) => venda.status === "pago")
            .reduce((acc, venda) => acc + venda.preco, 0)
            .toLocaleString("pr-br", { style: "currency", currency: "BRL" })}
        </div>
        <div className="box">
          <h2>Processando</h2>
          {data
            .filter((venda) => venda.status === "processando")
            .reduce((acc, venda) => acc + venda.preco, 0)
            .toLocaleString("pr-br", { style: "currency", currency: "BRL" })}
        </div>
      </div>
      <div className="box mb">
        <GraficoVendas data={data} />
      </div>
    </section>
  );
};

export default Resumo;
