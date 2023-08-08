"use client"

import { usePathname } from 'next/navigation'
import { FooterBase } from './FooterBase'
import { useTranslation } from '../../../i18n/client'

export const Footer = ({ lng }) => {
  const pathname = usePathname()
  const { t } = useTranslation(lng, 'footer')
  return <FooterBase t={t} lng={lng} pathname={pathname} />
}