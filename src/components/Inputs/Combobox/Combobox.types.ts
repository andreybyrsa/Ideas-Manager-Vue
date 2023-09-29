interface ComboboxProps<OptionType> {
  name: string

  options: OptionType[]
  displayBy?: (keyof OptionType)[]

  noFormControlled?: boolean

  label?: string
  placeholder?: string
  multiselectPlaceholder?: string
}

interface SearchedOptionType<OptionType> {
  label: string
  option: OptionType
}

interface ComboboxEmits {
  (event: 'addNewOption', optionName: string): void
}
export { ComboboxProps, SearchedOptionType, ComboboxEmits }
