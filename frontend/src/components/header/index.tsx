import { memo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  useAudio,
  useAuth,
  useChatInteract,
  useConfig
} from '@chainlit/react-client';

import AudioPresence from '@/components/AudioPresence';
import ButtonLink from '@/components/ButtonLink';
import { useSidebar } from '@/components/ui/sidebar';

import { Button } from '../ui/button';
import ApiKeys from './ApiKeys';
import ChatProfiles from './ChatProfiles';
import { CustomDropdown } from './CustomDropdown';
import { FontSizeToggle } from './FontSizeToggle';
import { LanguageSwitcher } from './LanguageSwitcher';
import NewChatButton from './NewChat';
import ReadmeButton from './Readme';
import ShareButton from './Share';
import SidebarTrigger from './SidebarTrigger';
import { ThemeToggle } from './ThemeToggle';
import UserNav from './UserNav';

const Header = memo(() => {
  const { audioConnection } = useAudio();
  const navigate = useNavigate();
  const { data } = useAuth();
  const { config } = useConfig();
  const { open, openMobile, isMobile } = useSidebar();
  const { updateChatSettings } = useChatInteract();
  const [isSpeakerActive, setIsSpeakerActive] = useState(true);

  const sidebarOpen = isMobile ? openMobile : open;

  const historyEnabled = data?.requireLogin && config?.dataPersistence;

  const links = config?.ui?.header_links || [];

  return (
    <div
      className="p-3 flex h-[60px] items-center justify-between gap-2 relative"
      id="header"
    >
      <div className="flex items-center gap-3">
        {historyEnabled ? !sidebarOpen ? <SidebarTrigger /> : null : null}
        {historyEnabled ? (
          !sidebarOpen ? (
            <NewChatButton navigate={navigate} />
          ) : null
        ) : (
          <NewChatButton navigate={navigate} />
        )}
        <ChatProfiles navigate={navigate} />
        <img src="/logo.svg" alt="Chainlit Logo" className="h-5 w-auto" />
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {audioConnection === 'on' ? (
          <AudioPresence
            type="server"
            height={35}
            width={70}
            barCount={4}
            barSpacing={2}
          />
        ) : null}
      </div>

      <div />
      <div className="flex items-center gap-1">
        <ShareButton />
        <ReadmeButton />
        <ApiKeys />
        {links &&
          links.map((link, index) => (
            <ButtonLink
              key={`${link.name}-${link.url}-${index}`}
              name={link.name}
              displayName={link.display_name}
              iconUrl={link.icon_url}
              url={link.url}
              target={link.target}
            />
          ))}
        <FontSizeToggle />
        <LanguageSwitcher />
        <CustomDropdown
          options={[
            { label: 'Option 1', value: 'option1' },
            { label: 'Option 2', value: 'option2' },
            { label: 'Option 3', value: 'option3' }
          ]}
          defaultValue="option1"
          onValueChange={() => {
            // in case you need to pass this to the backend you can here.
          }}
        />
        <ThemeToggle />
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:text-muted-foreground relative"
          onClick={() => {
            const newState = !isSpeakerActive;
            setIsSpeakerActive(newState);
            updateChatSettings({ speaker_active: newState });
          }}
        >
          <div className="relative">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={isSpeakerActive ? '' : 'opacity-50'}
            >
              <path
                d="M18.3654 4.22258C18.7559 3.83206 19.3891 3.83206 19.7796 4.22258C21.7691 6.21209 23.0014 8.96347 23.0014 12.0008C23.0014 15.038 21.7691 17.7894 19.7796 19.7789C19.3891 20.1695 18.7559 20.1695 18.3654 19.7789C17.9749 19.3884 17.9749 18.7552 18.3654 18.3647C19.9952 16.7349 21.0014 14.4863 21.0014 12.0008C21.0014 9.5152 19.9952 7.26657 18.3654 5.63679C17.9749 5.24627 17.9749 4.61311 18.3654 4.22258Z"
                fill="currentColor"
              />
              <path
                d="M16.5977 7.40422C16.2072 7.0137 15.574 7.0137 15.1835 7.40422C14.793 7.79475 14.793 8.42791 15.1835 8.81843C15.999 9.63387 16.5015 10.7575 16.5015 12.0004C16.5015 13.2433 15.999 14.367 15.1835 15.1824C14.793 15.5729 14.793 16.2061 15.1835 16.5966C15.574 16.9871 16.2072 16.9871 16.5977 16.5966C17.7729 15.4214 18.5015 13.7951 18.5015 12.0004C18.5015 10.2058 17.7729 8.5794 16.5977 7.40422Z"
                fill="currentColor"
              />
              <path
                d="M13 4.50004C13 3.26397 11.5889 2.5584 10.6 3.30004L5.93333 6.80004C5.76024 6.92986 5.5497 7.00004 5.33333 7.00004H4C2.34315 7.00004 1 8.34318 1 10V14C1 15.6569 2.34315 17 4 17H5.33333C5.5497 17 5.76024 17.0702 5.93333 17.2L10.6 20.7C11.5889 21.4416 13 20.7361 13 19.5V4.50004Z"
                fill="currentColor"
              />
              <path
                d="M19.7782 4.22258C19.3876 3.83206 18.7545 3.83206 18.3639 4.22258C17.9734 4.6131 17.9734 5.24627 18.3639 5.63679C19.9937 7.26657 21 9.5152 21 12.0008C21 14.4863 19.9937 16.735 18.3639 18.3647C17.9734 18.7552 17.9734 19.3884 18.3639 19.7789C18.7545 20.1695 19.3876 20.1695 19.7782 19.7789C21.7677 17.7894 23 15.0381 23 12.0008C23 8.96347 21.7677 6.2121 19.7782 4.22258Z"
                fill="currentColor"
              />
              <path
                d="M16.5962 7.40423C16.2057 7.0137 15.5725 7.0137 15.182 7.40423C14.7915 7.79475 14.7915 8.42792 15.182 8.81844C15.9974 9.63388 16.5 10.7575 16.5 12.0004C16.5 13.2433 15.9974 14.367 15.182 15.1824C14.7915 15.5729 14.7915 16.2061 15.182 16.5966C15.5725 16.9871 16.2057 16.9871 16.5962 16.5966C17.7714 15.4214 18.5 13.7951 18.5 12.0004C18.5 10.2058 17.7714 8.5794 16.5962 7.40423Z"
                fill="currentColor"
              />
            </svg>
            {!isSpeakerActive && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[28px] h-[2px] bg-muted-foreground rotate-45" />
            )}
          </div>

          <span className="sr-only">
            {isSpeakerActive ? 'Speaker Active' : 'Speaker Muted'}
          </span>
        </Button>
        <UserNav />
      </div>
    </div>
  );
});

export { Header };
