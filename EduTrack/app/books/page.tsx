'use client'

import { useState, useEffect } from 'react'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { GraduationCap, BookOpen, Search, Filter, LogOut, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'

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
  'History',
  'Geography',
]

const EDUCATION_LEVELS = [
  'P1', 'P2', 'P3', 'P4', 'P5', 'P6',
  'S1', 'S2', 'S3', 'S4', 'S5', 'S6',
  'TVET',
  'University',
]

const PURPOSES = [
  { id: 'exam', label: 'Exam preparation' },
  { id: 'homework', label: 'Homework' },
  { id: 'reading', label: 'General reading' },
  { id: 'project', label: 'Project work' },
  { id: 'other', label: 'Other' },
]

// Sample books data
const sampleBooks = [
  {
    id: '1',
    title: 'Advanced Mathematics S1-S6',
    subject: 'Mathematics',
    educationLevel: 'S1-S6',
    description: 'Comprehensive mathematics textbook covering algebra, geometry, calculus, and more.',
    fileType: 'PDF',
  },
  {
    id: '2',
    title: 'Physics Fundamentals',
    subject: 'Physics',
    educationLevel: 'S3-S6',
    description: 'Introduction to physics covering mechanics, thermodynamics, and waves.',
    fileType: 'PDF',
  },
  {
    id: '3',
    title: 'Chemistry 2e',
    subject: 'Chemistry',
    educationLevel: 'S3-S6',
    description: 'General chemistry textbook with comprehensive coverage of chemical principles.',
    fileType: 'PDF',
  },
  {
    id: '4',
    title: 'Biology 2e',
    subject: 'Biology',
    educationLevel: 'S3-S6',
    description: 'Peer-reviewed biology textbook covering cells, genetics, evolution, and ecology.',
    fileType: 'PDF',
  },
  {
    id: '5',
    title: 'English Literature',
    subject: 'English',
    educationLevel: 'P4-S6',
    description: 'Comprehensive English literature for all levels.',
    fileType: 'PDF',
  },
  {
    id: '6',
    title: 'Introduction to Computer Science',
    subject: 'Computer Science',
    educationLevel: 'University',
    description: 'Programming fundamentals using Python.',
    fileType: 'PDF',
  },
]

export default function BooksPage() {
  const [session, setSession] = useState<any>(null)
  const [books, setBooks] = useState(sampleBooks)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSubject, setSelectedSubject] = useState('')
  const [selectedLevel, setSelectedLevel] = useState('')
  const [showAccessModal, setShowAccessModal] = useState(false)
  const [selectedBook, setSelectedBook] = useState<any>(null)
  const [accessRequests, setAccessRequests] = useState<any[]>([])
  const { toast } = useToast()

  // Access Request Form
  const [accessForm, setAccessForm] = useState({
    bookTitle: '',
    subject: '',
    educationLevel: '',
    purpose: [] as string[],
    purposeOther: '',
  })

  useEffect(() => {
    // Check auth (in real app, call API)
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/auth/me')
        if (res.ok) {
          const data = await res.json()
          setSession(data.user)
          // Load user's access requests
          const requestsRes = await fetch('/api/books/access-requests')
          if (requestsRes.ok) {
            const requestsData = await requestsRes.json()
            setAccessRequests(requestsData.requests)
          }
        } else {
          redirect('/login')
        }
      } catch (error) {
        redirect('/login')
      }
    }
    checkAuth()
  }, [])

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.subject.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesSubject = !selectedSubject || book.subject === selectedSubject
    const matchesLevel =
      !selectedLevel || book.educationLevel.includes(selectedLevel)
    return matchesSearch && matchesSubject && matchesLevel
  })

  const handleRequestAccess = (book: any) => {
    setSelectedBook(book)
    setAccessForm({
      bookTitle: book.title,
      subject: book.subject,
      educationLevel: book.educationLevel,
      purpose: [],
      purposeOther: '',
    })
    setShowAccessModal(true)
  }

  const handlePurposeChange = (purposeId: string) => {
    setAccessForm((prev) => ({
      ...prev,
      purpose: prev.purpose.includes(purposeId)
        ? prev.purpose.filter((p) => p !== purposeId)
        : [...prev.purpose, purposeId],
    }))
  }

  const submitAccessRequest = async () => {
    if (accessForm.purpose.length === 0) {
      toast({
        title: 'Error',
        description: 'Please select at least one purpose',
        variant: 'destructive',
      })
      return
    }

    try {
      const response = await fetch('/api/books/request-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(accessForm),
      })

      if (!response.ok) {
        throw new Error('Failed to submit request')
      }

      toast({
        title: 'Success',
        description: 'Access request submitted! You can now read this book.',
      })

      // Add to access requests
      setAccessRequests((prev) => [
        ...prev,
        { ...accessForm, id: Date.now(), createdAt: new Date() },
      ])

      setShowAccessModal(false)
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to submit access request',
        variant: 'destructive',
      })
    }
  }

  const hasAccess = (bookId: string) => {
    const book = books.find((b) => b.id === bookId)
    return accessRequests.some(
      (r) => r.bookTitle === book?.title && r.status !== 'REJECTED'
    )
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center space-x-2">
            <GraduationCap className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">EduTrack</span>
          </Link>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">
              {session.firstName} {session.lastName}
            </span>
            <Link href="/dashboard">
              <Button variant="ghost" size="sm">
                Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Book Library</h1>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search books by title or subject..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              className="px-4 py-2 border rounded-md"
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
            >
              <option value="">All Subjects</option>
              {SUBJECTS.map((subject) => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
            <select
              className="px-4 py-2 border rounded-md"
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
            >
              <option value="">All Levels</option>
              {EDUCATION_LEVELS.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Books Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map((book) => (
            <div
              key={book.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <BookOpen className="h-6 w-6 text-blue-600" />
                  </div>
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                    {book.fileType}
                  </span>
                </div>
                <h3 className="font-semibold text-lg mb-2">{book.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{book.description}</p>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
                    {book.subject}
                  </span>
                  <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded">
                    {book.educationLevel}
                  </span>
                </div>
                {hasAccess(book.id) ? (
                  <div className="flex gap-2">
                    <Button className="flex-1" size="sm">
                      Read Online
                    </Button>
                    <Button variant="outline" size="sm">
                      Download
                    </Button>
                  </div>
                ) : (
                  <Button
                    className="w-full"
                    size="sm"
                    onClick={() => handleRequestAccess(book)}
                  >
                    Request Access
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredBooks.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No books found matching your criteria</p>
          </div>
        )}
      </main>

      {/* Access Request Modal */}
      {showAccessModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Request Book Access</h2>
              <button
                onClick={() => setShowAccessModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <Label>Book Title</Label>
                <Input
                  value={accessForm.bookTitle}
                  onChange={(e) =>
                    setAccessForm({ ...accessForm, bookTitle: e.target.value })
                  }
                  disabled
                />
              </div>

              <div>
                <Label>Subject</Label>
                <select
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={accessForm.subject}
                  onChange={(e) =>
                    setAccessForm({ ...accessForm, subject: e.target.value })
                  }
                >
                  <option value="">Select subject</option>
                  {SUBJECTS.map((subject) => (
                    <option key={subject} value={subject}>
                      {subject}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Label>Education Level</Label>
                <select
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={accessForm.educationLevel}
                  onChange={(e) =>
                    setAccessForm({
                      ...accessForm,
                      educationLevel: e.target.value,
                    })
                  }
                >
                  <option value="">Select level</option>
                  {EDUCATION_LEVELS.map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Label>Purpose *</Label>
                <div className="space-y-2 mt-2">
                  {PURPOSES.map((purpose) => (
                    <label
                      key={purpose.id}
                      className="flex items-center space-x-2"
                    >
                      <input
                        type="checkbox"
                        checked={accessForm.purpose.includes(purpose.id)}
                        onChange={() => handlePurposeChange(purpose.id)}
                        className="rounded"
                      />
                      <span className="text-sm">{purpose.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {accessForm.purpose.includes('other') && (
                <div>
                  <Label>Please specify</Label>
                  <Input
                    value={accessForm.purposeOther}
                    onChange={(e) =>
                      setAccessForm({
                        ...accessForm,
                        purposeOther: e.target.value,
                      })
                    }
                    placeholder="Describe your purpose"
                  />
                </div>
              )}

              <Button className="w-full" onClick={submitAccessRequest}>
                Submit Request
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
