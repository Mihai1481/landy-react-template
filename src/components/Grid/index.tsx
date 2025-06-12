import styled from "styled-components";
import React, { useEffect, useState } from "react";

// Tipuri pentru obiectul pacient
interface Pacient {
  nume: string;
  varsta: number;
  sex: string;
  dieta: {
    aport_caloric_zilnic: number;
    vitamina_A: number;
    omega_3: number;
    antioxidanti: string;
  };
  sanatate_oculara: {
    acuitate_vizuala: string;
    diagnostice: string[];
    ultimul_control: string;
  };
  istoric_medical: string[];
}

// Wrapper pe întreaga lățime
const FullWidthGridWrapper = styled.div`
  width: 100%;
  padding: 2rem;
  background-color: #f8f9fa;
`;

// Grid-ul principal
const GridContainer = styled.div`
  display: grid;
  grid-template-columns:
    1.5fr /* Nume */
    0.8fr /* Vârstă */
    0.6fr /* Sex */
    1fr /* Aport caloric */
    1fr /* Vitamina A */
    1fr /* Omega 3 */
    1fr /* Antioxidanți */
    1.2fr /* Acuitate Vizuală */
    1.8fr /* Diagnostice */
    1.2fr /* Ultimul control */
    2fr; /* Istoric medical */

  gap: 2px;
  background-color: #dee2e6;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
`;

// Stil pentru celule
const Cell = styled.div<{ isHeader?: boolean; isOddRow?: boolean }>`
  background-color: ${(props) =>
    props.isHeader ? "#495057" : props.isOddRow ? "#ffffff" : "#f1f3f5"};
  color: ${(props) => (props.isHeader ? "#fff" : "#212529")};
  font-weight: ${(props) => (props.isHeader ? "bold" : "normal")};
  border: 1px solid #ced4da;
  padding: 10px 8px;
  text-align: center;
  font-size: 14px;
`;

const GridTable: React.FC = () => {
  const [pacienti, setPacienti] = useState<Pacient[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/pacienti")
      .then((res) => res.json())
      .then((data) => setPacienti(data))
      .catch((err) => console.error("Eroare la fetch:", err));
  }, []);

  const headers = [
    "Nume",
    "Vârstă",
    "Sex",
    "Aport caloric",
    "Vitamina A",
    "Omega 3",
    "Antioxidanți",
    "Acuitate Vizuală",
    "Diagnostice",
    "Ultimul Control",
    "Istoric Medical",
  ];

  return (
    <FullWidthGridWrapper>
      <GridContainer>
        {headers.map((h, i) => (
          <Cell key={`header-${i}`} isHeader>
            {h}
          </Cell>
        ))}
        {pacienti.map((p, index) => (
          <React.Fragment key={index}>
            <Cell isOddRow={index % 2 === 0}>{p.nume}</Cell>
            <Cell isOddRow={index % 2 === 0}>{p.varsta}</Cell>
            <Cell isOddRow={index % 2 === 0}>{p.sex}</Cell>
            <Cell isOddRow={index % 2 === 0}>
              {p.dieta.aport_caloric_zilnic}
            </Cell>
            <Cell isOddRow={index % 2 === 0}>{p.dieta.vitamina_A}</Cell>
            <Cell isOddRow={index % 2 === 0}>{p.dieta.omega_3}</Cell>
            <Cell isOddRow={index % 2 === 0}>{p.dieta.antioxidanti}</Cell>
            <Cell isOddRow={index % 2 === 0}>
              {p.sanatate_oculara.acuitate_vizuala}
            </Cell>
            <Cell isOddRow={index % 2 === 0}>
              {p.sanatate_oculara.diagnostice.join(", ")}
            </Cell>
            <Cell isOddRow={index % 2 === 0}>
              {p.sanatate_oculara.ultimul_control}
            </Cell>

            <Cell isOddRow={index % 2 === 0}>
              {p.istoric_medical.join(", ")}
            </Cell>
          </React.Fragment>
        ))}
      </GridContainer>
    </FullWidthGridWrapper>
  );
};

export default GridTable;
