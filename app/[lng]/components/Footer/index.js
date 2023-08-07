"use client"

import { usePathname } from 'next/navigation'
import { useTranslation } from "../../../i18n";
import { FooterBase } from "./FooterBase";

export const Footer = async ({ lng }) => {
  const pathname = usePathname()
  const { t } = await useTranslation(lng, "footer");
  return <FooterBase t={t} lng={lng} pathname={pathname} />;
};
