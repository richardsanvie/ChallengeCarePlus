import { BrindesSection } from "../../components/BrindesSection/BrindesSection.js";
import { CategoriaSection } from "../../components/CategoriaSection/CategoriaSection.js";
import { CuponsSection } from "../../components/CuponsSection/CuponsSection.js";
import { Nav } from "../../components/Nav/Nav.js";
import { RoupasSection } from "../../components/RoupasSection/Roupas.js";

export async function Recompensas() {
  const nav = await Nav();
  const roupasSection = await RoupasSection();
  const brindesSection = await BrindesSection();
  const categoriasSection = await CategoriaSection();
  const cuponsSection = await CuponsSection();

  // Monta o layout da página com os componentes
  return `
  ${nav}
    <div class=".container-fluid ps-5">
      ${cuponsSection}  
      ${categoriasSection}
      ${roupasSection}
      ${brindesSection}
    </div>
  `;
}
