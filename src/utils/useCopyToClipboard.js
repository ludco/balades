import copy from 'copy-to-clipboard';
import { useEffect, useState } from 'react';

export default function useCopyToClipboard(resetInterval = null) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = (topo) => {
    if (typeof topo == 'string' || typeof topo == 'number') {
      copy(topo.toString());
      setIsCopied(true);
    } else {
      setIsCopied(false);
      console.error(`Cannot copy typeof ${typeof text} to clipboard, must be a string or number.`);
    }
  };

  useEffect(() => {
    if (isCopied && resetInterval) {
      setTimeout(() => setIsCopied(false), resetInterval);
    }
    return clearTimeout();
  }, [isCopied, resetInterval]);

  return [isCopied, handleCopy];
}
