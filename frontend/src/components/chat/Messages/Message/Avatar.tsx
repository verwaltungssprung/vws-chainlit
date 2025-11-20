import { cn } from '@/lib/utils';
import { AlertCircle } from 'lucide-react';
import { useContext, useMemo } from 'react';

import {
  ChainlitContext,
  useChatSession,
  useConfig
} from '@chainlit/react-client';

import { useTheme } from '@/components/ThemeProvider';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';

interface Props {
  author?: string;
  hide?: boolean;
  isError?: boolean;
}

const MessageAvatar = ({ author, hide, isError }: Props) => {
  const apiClient = useContext(ChainlitContext);
  const { chatProfile } = useChatSession();
  const { config } = useConfig();
  const { variant } = useTheme();

  const selectedChatProfile = useMemo(() => {
    return config?.chatProfiles.find((profile) => profile.name === chatProfile);
  }, [config, chatProfile]);

  const avatarUrl = useMemo(() => {
    if (config?.ui?.default_avatar_file_url)
      return config?.ui?.default_avatar_file_url;
    const isAssistant = !author || author === config?.ui.name;
    if (isAssistant && selectedChatProfile?.icon) {
      return selectedChatProfile.icon;
    }
    if (isAssistant) {
      // Use theme-aware logo: verlogo_light.png for light theme, verlogo_dark.png for dark theme
      return `/public/ver_chat_head_${variant}.png`;
    }
    return apiClient?.buildEndpoint(`/avatars/${author || 'default'}`);
  }, [apiClient, selectedChatProfile, config, author, variant]);

  if (isError) {
    return (
      <AlertCircle className="h-5 w-5 fill-destructive mt-[5px] text-destructive-foreground" />
    );
  }

  return (
    <span className={cn('inline-block', hide && 'invisible')}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Avatar className="h-8 w-8 mt-[3px]">
              <AvatarImage
                src={avatarUrl}
                alt={`Avatar for ${author || 'default'}`}
                className="bg-transparent"
              />
              <AvatarFallback className="bg-transparent">
                <Skeleton className="h-full w-full rounded-full" />
              </AvatarFallback>
            </Avatar>
          </TooltipTrigger>
          <TooltipContent>
            <p>{author}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </span>
  );
};

export { MessageAvatar };
