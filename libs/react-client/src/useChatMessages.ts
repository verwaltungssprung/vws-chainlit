import { useRecoilValue } from 'recoil';

import {
  currentThreadIdState,
  firstUserInteraction,
  messagesState,
  vwsFormProgress
} from './state';

const useChatMessages = () => {
  const messages = useRecoilValue(messagesState);
  const firstInteraction = useRecoilValue(firstUserInteraction);
  const threadId = useRecoilValue(currentThreadIdState);
  const vwsprogress = useRecoilValue(vwsFormProgress);

  return {
    threadId,
    messages,
    firstInteraction,
    vwsprogress
  };
};

export { useChatMessages };
