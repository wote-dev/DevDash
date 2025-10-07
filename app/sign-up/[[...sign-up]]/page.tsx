import { SignUp } from '@clerk/nextjs'

export default function SignUpPage() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-56px)] py-12">
      <SignUp 
        appearance={{
          elements: {
            formButtonPrimary: 
              'bg-primary hover:bg-primary/90 text-sm normal-case',
            card: 'shadow-md',
            headerTitle: 'text-gray-900 dark:text-gray-100',
            headerSubtitle: 'text-gray-500 dark:text-gray-400',
            socialButtonsBlockButton: 'border-gray-200 dark:border-gray-800',
            formFieldLabel: 'text-gray-700 dark:text-gray-300',
            formFieldInput: 'border-gray-200 dark:border-gray-800',
            footerActionLink: 'text-primary hover:text-primary/90',
          },
        }}
      />
    </div>
  )
}
