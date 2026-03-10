# EduTrack Library - Project Structure

```
EduTrack/
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── seed.ts               # Optional seed file
├── public/
│   └── uploads/             # Uploaded book files
│       └── books/           # PDF files
│       └── covers/          # Book cover images
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── (auth)/         # Auth route group
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   └── register/
│   │   │       └── page.tsx
│   │   ├── (dashboard)/    # Protected dashboard group
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx
│   │   │   ├── books/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx  # Book reader
│   │   │   └── admin/
│   │   │       └── page.tsx
│   │   ├── api/             # API routes (if needed)
│   │   ├── layout.tsx       # Root layout
│   │   ├── page.tsx         # Landing page
│   │   └── globals.css
│   ├── components/
│   │   ├── ui/              # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── label.tsx
│   │   │   ├── textarea.tsx
│   │   │   ├── select.tsx
│   │   │   ├── checkbox.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── table.tsx    # DataTable
│   │   │   ├── toast.tsx
│   │   │   └── toaster.tsx
│   │   ├── forms/           # Form components
│   │   │   ├── login-form.tsx
│   │   │   ├── register-form.tsx
│   │   │   └── access-request-form.tsx
│   │   ├── books/           # Book components
│   │   │   ├── book-card.tsx
│   │   │   ├── book-grid.tsx
│   │   │   ├── book-reader.tsx
│   │   │   └── book-upload.tsx
│   │   └── admin/          # Admin components
│   │       ├── users-table.tsx
│   │       ├── access-requests-table.tsx
│   │       ├── books-table.tsx
│   │       └── stats-cards.tsx
│   ├── lib/
│   │   ├── prisma.ts        # Prisma client
│   │   ├── auth.ts          # Auth utilities
│   │   ├── utils.ts         # General utilities
│   │   └── validations.ts   # Zod schemas
│   ├── actions/             # Server Actions
│   │   ├── auth.ts          # Login, register, logout
│   │   ├── books.ts         # Book CRUD
│   │   └── access.ts        # Access requests & logs
│   └── types/               # TypeScript types
├── middleware.ts            # Route protection
├── tailwind.config.ts
├── next.config.js
├── tsconfig.json
├── package.json
└── .env.example
```

## Key Directories:
- `/src/app` - Next.js 14+ App Router pages
- `/src/actions` - Server Actions for form submissions
- `/src/components` - React components
- `/public/uploads` - Local file storage for PDFs
