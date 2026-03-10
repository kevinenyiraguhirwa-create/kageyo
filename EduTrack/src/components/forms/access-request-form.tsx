'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'

const SUBJECTS = [
  'Mathematics',
  'Physics',
  'Chemistry',
  'Biology',
  'English',
  'Kinyarwanda',
  'Social Studies',
  'Entrepreneurship',
  'Computer Science',
  'Accounting',
  'French',
  'History',
  'Geography',
  'ICT',
  'Other',
]

const EDUCATION_LEVELS = [
  'P1', 'P2', 'P3', 'P4', 'P5', 'P6',
  'S1', 'S2', 'S3', 'S4', 'S5', 'S6',
  'TVET Year 1', 'TVET Year 2', 'TVET Year 3', 'TVET Year 4',
  'University Year 1', 'University Year 2', 'University Year 3', 'University Year 4',
  'Other',
]

const PURPOSES = [
  { id: 'exam', label: 'Exam preparation' },
  { id: 'homework', label: 'Homework' },
  { id: 'reading', label: 'General reading' },
  { id: 'project', label: 'Project work' },
  { id: 'other', label: 'Other' },
]

const accessRequestSchema = z.object({
  bookTitle: z.string().min(1, 'Book title is required'),
  subject: z.string().min(1, 'Subject is required'),
  educationLevel: z.string().min(1, 'Education level is required'),
  purpose: z.array(z.string()).min(1, 'Select at least one purpose'),
  purposeOther: z.string().optional(),
})

type AccessRequestFormData = z.infer<typeof accessRequestSchema>

interface AccessRequestFormProps {
  book?: {
    id: string
    title: string
    subject: string
    educationLevel: string
  }
  onSuccess?: () => void
}

export function AccessRequestForm({ book, onSuccess }: AccessRequestFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<AccessRequestFormData>({
    resolver: zodResolver(accessRequestSchema),
    defaultValues: {
      bookTitle: book?.title || '',
      subject: book?.subject || '',
      educationLevel: book?.educationLevel || '',
      purpose: [],
      purposeOther: '',
    },
  })

  const selectedPurpose = watch('purpose')
  const showOtherInput = selectedPurpose.includes('other')

  const onSubmit = async (data: AccessRequestFormData) => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/access-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          bookId: book?.id || null,
          purpose: JSON.stringify(data.purpose),
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to submit request')
      }

      if (onSuccess) {
        onSuccess()
      } else {
        router.refresh()
      }
    } catch (error) {
      console.error('Error submitting access request:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Book Title */}
      <div className="space-y-2">
        <Label htmlFor="bookTitle">Book Title *</Label>
        <Input
          id="bookTitle"
          placeholder="Enter the book title you want to access"
          {...register('bookTitle')}
          disabled={!!book}
          defaultValue={book?.title}
        />
        {errors.bookTitle && (
          <p className="text-sm text-red-500">{errors.bookTitle.message}</p>
        )}
      </div>

      {/* Subject */}
      <div className="space-y-2">
        <Label htmlFor="subject">Subject *</Label>
        <Select
          value={watch('subject')}
          onValueChange={(value) => setValue('subject', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select subject" />
          </SelectTrigger>
          <SelectContent>
            {SUBJECTS.map((subject) => (
              <SelectItem key={subject} value={subject}>
                {subject}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.subject && (
          <p className="text-sm text-red-500">{errors.subject.message}</p>
        )}
      </div>

      {/* Education Level */}
      <div className="space-y-2">
        <Label htmlFor="educationLevel">Level/Year *</Label>
        <Select
          value={watch('educationLevel')}
          onValueChange={(value) => setValue('educationLevel', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select education level" />
          </SelectTrigger>
          <SelectContent>
            {EDUCATION_LEVELS.map((level) => (
              <SelectItem key={level} value={level}>
                {level}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.educationLevel && (
          <p className="text-sm text-red-500">{errors.educationLevel.message}</p>
        )}
      </div>

      {/* Purpose */}
      <div className="space-y-2">
        <Label>Purpose *</Label>
        <div className="space-y-2">
          {PURPOSES.map((purpose) => (
            <div key={purpose.id} className="flex items-center space-x-2">
              <Checkbox
                id={purpose.id}
                checked={selectedPurpose.includes(purpose.id)}
                onCheckedChange={(checked) => {
                  const purposes = checked
                    ? [...selectedPurpose, purpose.id]
                    : selectedPurpose.filter((p) => p !== purpose.id)
                  setValue('purpose', purposes)
                }}
              />
              <Label htmlFor={purpose.id} className="font-normal cursor-pointer">
                {purpose.label}
              </Label>
            </div>
          ))}
        </div>
        {errors.purpose && (
          <p className="text-sm text-red-500">{errors.purpose.message}</p>
        )}
      </div>

      {/* Other purpose text */}
      {showOtherInput && (
        <div className="space-y-2">
          <Label htmlFor="purposeOther">Please specify</Label>
          <Textarea
            id="purposeOther"
            placeholder="Describe your purpose"
            {...register('purposeOther')}
          />
        </div>
      )}

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          'Submit Access Request'
        )}
      </Button>
    </form>
  )
}
