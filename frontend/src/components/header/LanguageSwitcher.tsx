import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useApi, useChatInteract } from '@chainlit/react-client';

import { SwitchContainer, SwitchItem } from '@/components/ui/animated-switch';

interface Props {
  className?: string;
}

// Two languages for now
const AVAILABLE_LANGUAGES = [
  { code: 'de-DE', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'en-US', label: 'English', flag: '🇬🇧' }
];

export function LanguageSwitcher({ className }: Props) {
  const { i18n } = useTranslation();
  const { updateChatSettings } = useChatInteract();
  const [currentLanguage, setCurrentLanguage] = useState(
    i18n.language || 'en-US'
  );

  // Fetch translations for the selected language
  const { data: translations } = useApi<any>(
    `/project/translations?language=${currentLanguage}`
  );

  useEffect(() => {
    if (!translations) return;
    i18n.addResourceBundle(
      currentLanguage,
      'translation',
      translations.translation
    );
    i18n.changeLanguage(currentLanguage);
    // Store in localStorage for persistence
    localStorage.setItem('chainlit-language', currentLanguage);
  }, [translations, currentLanguage, i18n]);

  useEffect(() => {
    // Initialize from localStorage or browser language
    const storedLanguage = localStorage.getItem('chainlit-language');
    const browserLanguage = navigator.language || 'en-US';
    const initialLanguage = storedLanguage || browserLanguage;

    // Find closest match from available languages
    const matchedLanguage =
      AVAILABLE_LANGUAGES.find((lang) => lang.code === initialLanguage)?.code ||
      AVAILABLE_LANGUAGES.find((lang) =>
        initialLanguage.startsWith(lang.code.split('-')[0])
      )?.code ||
      'en-US';

    if (matchedLanguage !== currentLanguage) {
      setCurrentLanguage(matchedLanguage);
    }
  }, []);

  const handleLanguageChange = (languageCode: string) => {
    setCurrentLanguage(languageCode);
    // Send language selection to backend
    updateChatSettings({ language: languageCode });
  };

  return (
    <SwitchContainer
      value={currentLanguage}
      onValueChange={handleLanguageChange}
      className={cn('h-10 w-fit', className)}
    >
      {AVAILABLE_LANGUAGES.map((lang) => (
        <SwitchItem key={lang.code} value={lang.code} className="w-full h-9">
          <span className="flex items-center gap-2">
            <span className="text-base">{lang.flag}</span>
            <span>{lang.label}</span>
          </span>
        </SwitchItem>
      ))}
    </SwitchContainer>
  );
}
