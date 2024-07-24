import Select, { IDropdownMultipleOption } from "@/Select";

import { Inter } from "next/font/google";
import { faker } from "@faker-js/faker";

const inter = Inter({ subsets: ["latin"] });

const selectData: IDropdownMultipleOption[] = Array(10)
  .fill(0)
  .map((_, i) => ({
    id: faker.string.uuid(),
    value: faker.string.uuid(),
    label: faker.person.fullName(),
    disabled: i === 2 || i === 5,
  }));

export default function Home() {
  function handleChangeSelection(newValues: string[]): void {
    console.log(newValues);
  }

  return (
    <main
      className={`flex min-h-screen bg-white flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <Select
        options={selectData}
        onChange={handleChangeSelection}
        label="Pessoas"
        helperText="Selecione uma das pessoas da lista"
      />
    </main>
  );
}
