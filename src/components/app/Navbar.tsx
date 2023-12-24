import { useLogout } from '@/features/auth/useLogout';
import { useUser } from '@/features/user/useUser';
import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Flex,
  Wrap,
  WrapItem,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Heading,
} from '@chakra-ui/react';

export default function Navbar() {
  const { user } = useUser();
  const { isLogout, userLogout } = useLogout();
  const user_metadata = user ? user.user_metadata : {};
  const { full_name = '', avatar_url = '' } = user_metadata;
  const email = user ? user.email : '';

  return (
    <Flex width="inherit" as="nav" justify="flex-end">
      <Menu>
        <MenuButton
          colorScheme="transparent"
          cursor="pointer"
          as={Button}
          rightIcon={
            <ChevronDownIcon width="2.5rem" height="2.5rem" color="blue.500" />
          }
        >
          <Wrap>
            <WrapItem>
              <Avatar size={'lg'} name={full_name} src={avatar_url} />
            </WrapItem>
          </Wrap>
        </MenuButton>
        <MenuList borderRadius={'lg'} boxShadow={'md'}>
          <MenuItem>
            <Flex alignItems="center">
              <Avatar
                width={'2.5rem'}
                height={'2.5rem'}
                name={full_name}
                src={avatar_url}
              />
              <Flex ml="1rem" flexDirection="column" justifyContent="center">
                <Heading fontWeight="bold" as="span" size="md">
                  {full_name}
                </Heading>
                <Heading
                  fontWeight="bold"
                  as="span"
                  size="sm"
                  color={'gray.500'}
                >
                  {email}
                </Heading>
              </Flex>
            </Flex>
          </MenuItem>
          <MenuItem
            mt="1rem"
            as="button"
            onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
              userLogout()
            }
            disabled={isLogout}
          >
            Logout
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
}
