import { Field } from '@base-ui/react/field'
import type { FieldApi } from '@tanstack/react-form'

interface FormFieldProps {
  field: FieldApi<any, any, any, any>
  label: string
  placeholder?: string
  type?: 'text' | 'textarea'
}

export function FormField({
  field,
  label,
  placeholder,
  type = 'text',
}: FormFieldProps) {
  const Component = type === 'textarea' ? 'textarea' : 'input'

  return (
    <Field.Root
      name={field.name}
      invalid={!field.state.meta.isValid}
      dirty={field.state.meta.isDirty}
      touched={field.state.meta.isTouched}
      className="space-y-2"
    >
      <Field.Label className="text-xs font-bold uppercase text-stone-500 dark:text-stone-400 tracking-wide">
        {label}
      </Field.Label>
      <Field.Control
        render={(props) => (
          <Component
            {...props}
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
            onBlur={field.handleBlur}
            placeholder={placeholder}
            className="w-full rounded-xl border-2 border-stone-200 dark:border-stone-600 bg-white dark:bg-stone-900 px-4 py-3 text-stone-800 dark:text-stone-100 shadow-sm focus:border-amber focus:outline-none focus:ring-4 focus:ring-amber/20 transition-all resize-none"
            rows={type === 'textarea' ? 4 : undefined}
          />
        )}
      />
      <Field.Error
        match={!field.state.meta.isValid}
        className="text-sm text-burgundy font-semibold"
      >
        {field.state.meta.errors.join(', ')}
      </Field.Error>
    </Field.Root>
  )
}
