import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"

export default function CheckboxBasic({
  id,
  checked,
  onCheckedChange,
  children,
}) {
  return (
    <FieldGroup className="mx-auto w-56">
      <Field orientation="horizontal">
        <Checkbox
          id={id}
          checked={checked}
          onCheckedChange={onCheckedChange}
        />
        <FieldLabel htmlFor={id}>
          {children}
        </FieldLabel>
      </Field>
    </FieldGroup>
  )
}