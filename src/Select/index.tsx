import { useState } from "react";

import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import clsx from "clsx";
import CheckIcon from "./CheckIcon";

type TSelectMaxWidth = "sm" | "md" | "lg" | "full";

export interface IDropdownMultipleOption {
  id: string;
  label: string;
  value: string;

  disabled?: boolean;
}

interface IDropdownMultipleProps {
  options: IDropdownMultipleOption[];

  label?: string;
  disabled?: boolean;
  hasErrors?: boolean;
  helperText?: string;
  width?: TSelectMaxWidth;

  onChange?: (value: string[]) => void;
}

const SELECT_WIDTH_CLASSES: Record<TSelectMaxWidth, string> = {
  sm: "min-w-52 max-w-60",
  md: "min-w-60 max-w-72",
  lg: "min-w-72 max-w-80",
  full: "min-w-52 max-w-full",
};

export default function DropdownMultiple({
  label,
  options,
  disabled,
  hasErrors,
  helperText,
  width = "md",
  onChange,
}: IDropdownMultipleProps): JSX.Element {
  const [selectedOptions, setSelectedOptions] =
    useState<IDropdownMultipleOption[]>();

  const hasSelectedOptions = selectedOptions && selectedOptions.length > 0;

  const mappedOptions = selectedOptions?.map((option) => option.label);

  const joinedOptions = mappedOptions?.join(", ");

  const placeholder = hasSelectedOptions
    ? joinedOptions
    : "Selecione uma opção";

  const widthClasses = SELECT_WIDTH_CLASSES[width];

  function handleChangeSelectedOptions(
    newSelectedOptions: IDropdownMultipleOption[]
  ): void {
    setSelectedOptions(newSelectedOptions);

    if (!onChange) return;

    const selectedOptionValues = newSelectedOptions.map(({ value }) => value);

    onChange(selectedOptionValues);
  }

  function handleCheckIfOptionIsSelected(
    option: IDropdownMultipleOption
  ): boolean {
    if (!selectedOptions || selectedOptions.length < 1) return false;

    return selectedOptions.includes(option);
  }

  return (
    <div className={clsx("text-purple-950 text-sm w-full", widthClasses)}>
      {label && (
        <p className="mb-2">
          <strong>{label}</strong>
        </p>
      )}

      <Listbox
        multiple={true}
        disabled={disabled}
        defaultValue={selectedOptions}
        onChange={handleChangeSelectedOptions}
      >
        <ListboxButton
          className={clsx("select", {
            error: hasErrors,
          })}
        >
          <span className={clsx("line-clamp-1 w-full")}>{placeholder}</span>
        </ListboxButton>

        <ListboxOptions className="rounded-md w-full max-h-40 overflow-y-scroll custom-scrollbar">
          {options.map((option) => (
            <ListboxOption
              value={option}
              id={option.id}
              key={option.id}
              disabled={option.disabled}
              className={clsx("select-option", {
                "disabled-option": option.disabled,
              })}
            >
              {option.label}

              {handleCheckIfOptionIsSelected(option) && <CheckIcon />}
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>

      {helperText && (
        <p
          className={clsx("mt-2", {
            "text-red-700": hasErrors,
          })}
        >
          {helperText}
        </p>
      )}
    </div>
  );
}
