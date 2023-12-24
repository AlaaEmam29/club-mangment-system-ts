import { Button, ButtonGroup, VisuallyHidden } from '@chakra-ui/react';
import {
  GitHubIcon,
  GoogleIcon,
  SpinnerIcon,
  TwitterIcon,
} from './ProviderIcons';
import useGoogleAuth from '@/features/auth/useGoogleAuth';
type PropsIcons = {
  width: string;
  height: string;
};
const iconsStyle = {
  width: '1.4rem',
  height: '1.4rem',
} as PropsIcons;
const providers = [
  { name: 'Google', icon: <GoogleIcon {...iconsStyle} /> },
  { name: 'Twitter', icon: <TwitterIcon {...iconsStyle} /> },
  { name: 'GitHub', icon: <GitHubIcon {...iconsStyle} /> },
];

export const OAuthButtonGroup = () => {
  const { isAuthLoading, authGoogle } = useGoogleAuth();
  const handleAuth = (name: string) => {
    if (name === 'Google') authGoogle();
  };

  const isDisabled = isAuthLoading;
  const isLoading = isAuthLoading;
  const renderIcon = (icon: JSX.Element) => {
    if (isLoading) return <SpinnerIcon {...iconsStyle} />;
    return icon;
  };

  return (
    <ButtonGroup variant="secondary" spacing="4" width="100%">
      {providers.map(({ name, icon }) => (
        <Button
          key={name}
          flexGrow={1}
          size="lg"
          width="3rem"
          bg="transparent"
          border="1px solid "
          borderRadius="lg"
          borderColor="gray.300"
          _hover={{
            bg: 'gray.50',
          }}
          onClick={() => handleAuth(name)}
          disabled={isDisabled}
        >
          <VisuallyHidden>Sign in with {name}</VisuallyHidden>
          {renderIcon(icon)}
        </Button>
      ))}
    </ButtonGroup>
  );
};
