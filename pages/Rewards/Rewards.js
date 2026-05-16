import { BrindesSection } from "../../components/BrindesSection/BrindesSection.js";
import { CategoriaSection } from "../../components/CategoriaSection/CategoriaSection.js";
import { CuponsSection } from "../../components/CuponsSection/CuponsSection.js";
import { Header } from "../../components/Header/Header.js";
import { Nav } from "../../components/Nav/Nav.js";
import { RoupasSection } from "../../components/RoupasSection/RoupasSection.js";
import { ServicosSection } from "../../components/ServicosSection/ServicosSection.js";

export async function Rewards() {
  const nav = await Nav();
  const roupasSection = await RoupasSection();
  const brindesSection = await BrindesSection();
  const categoriasSection = await CategoriaSection();
  const cuponsSection = await CuponsSection();
  const servicosSection = await ServicosSection();
  const headers = await Header();

  // Monta o layout da página com os componentes
  return `
  ${nav}
    <div class=".container-fluid ps-5">
      ${headers}  
      ${cuponsSection}  
      ${categoriasSection}
      ${roupasSection}
      ${brindesSection}
      ${servicosSection}
    </div>
  `;
}
