export interface Vacancy {
  id: string
  name: string
  description?: string | TrustedHTML

  salary?: {
    from?: number | null
    to?: number | null
    currency?: string | null
    gross?: boolean
  } | null

  area?: {
    id?: string
    name: string
  }

  experience?: {
    id?: string
    name: string
  }

  schedule?: {
    id?: string
    name: string
  }

  employer?: {
    id?: string
    name: string
    logo_urls?: {
      '90'?: string
      '240'?: string
      original?: string
    }
  }

  alternate_url: string
}
