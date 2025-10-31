import React, { useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonContent,
  IonIcon,
} from '@ionic/react';
import { arrowBackOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import {
  Box,
  VStack,
  HStack,
  Heading,
  Text,
  IconButton,
  Container,
  Flex,
} from '@chakra-ui/react';
import { Moon, Sun, Globe, Bell, Volume2, Eye, Smartphone, Check, X } from 'lucide-react';
import { useColorMode } from '@chakra-ui/color-mode';

const Settings: React.FC = () => {
  const history = useHistory();
  const { colorMode, toggleColorMode } = useColorMode();
  
  // Settings state
  const [settings, setSettings] = useState({
    notifications: true,
    sound: true,
    autoPlayQuiz: false,
    showHints: true,
    offlineMode: false,
  });

  const handleToggle = (key: string) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev]
    }));
  };

  const settingsGroups = [
    {
      title: 'Appearance',
      icon: <Eye size={20} />,
      items: [
        {
          key: 'darkMode',
          label: 'Dark Mode',
          description: 'Use dark theme for comfortable viewing',
          value: colorMode === 'dark',
          onChange: toggleColorMode,
          icon: colorMode === 'light' ? <Moon size={18} /> : <Sun size={18} />,
        },
      ],
    },
    {
      title: 'Learning',
      icon: <Globe size={20} />,
      items: [
        {
          key: 'showHints',
          label: 'Show Hints',
          description: 'Display helpful hints during quizzes',
          value: settings.showHints,
          onChange: () => handleToggle('showHints'),
        },
        {
          key: 'autoPlayQuiz',
          label: 'Auto-advance Quiz',
          description: 'Automatically move to next question',
          value: settings.autoPlayQuiz,
          onChange: () => handleToggle('autoPlayQuiz'),
        },
      ],
    },
    {
      title: 'Notifications',
      icon: <Bell size={20} />,
      items: [
        {
          key: 'notifications',
          label: 'Push Notifications',
          description: 'Get reminders to practice',
          value: settings.notifications,
          onChange: () => handleToggle('notifications'),
        },
        {
          key: 'sound',
          label: 'Sound Effects',
          description: 'Play sounds for correct/incorrect answers',
          value: settings.sound,
          onChange: () => handleToggle('sound'),
          icon: <Volume2 size={18} />,
        },
      ],
    },
    {
      title: 'Advanced',
      icon: <Smartphone size={20} />,
      items: [
        {
          key: 'offlineMode',
          label: 'Offline Mode',
          description: 'Download content for offline use',
          value: settings.offlineMode,
          onChange: () => handleToggle('offlineMode'),
        },
      ],
    },
  ];

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar 
          style={{
            '--background': colorMode === 'light' ? '#ffffff' : '#2c1810',
            '--border-width': '0',
            '--padding-top': '12px',
            '--padding-bottom': '12px',
          }}
        >
          <Box 
            px={4} 
            py={3}
            bg={colorMode === 'light' ? 'white' : '#2c1810'}
            borderBottomWidth="1px"
            borderBottomColor={colorMode === 'light' ? '#d4a574' : '#8b6f47'}
          >
            <Flex justify="space-between" align="center">
              <HStack gap={3}>
                <IconButton
                  aria-label="Go back"
                  variant="ghost"
                  size="md"
                  onClick={() => history.goBack()}
                  borderRadius="full"
                  color={colorMode === 'light' ? '#5d4037' : '#bcaaa4'}
                  _hover={{
                    bg: colorMode === 'light' ? '#f5e6d3' : '#3e2723',
                    color: colorMode === 'light' ? '#d4a574' : '#d4a574',
                  }}
                >
                  <IonIcon icon={arrowBackOutline} style={{ fontSize: '22px' }} />
                </IconButton>
                <VStack align="start" gap={0}>
                  <Heading size="md" color={colorMode === 'light' ? '#3e2723' : '#d7ccc8'} fontWeight="bold" letterSpacing="tight">
                    Settings
                  </Heading>
                  <Text fontSize="xs" color={colorMode === 'light' ? '#d4a574' : '#d4a574'}>
                    Customize your experience
                  </Text>
                </VStack>
              </HStack>
            </Flex>
          </Box>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <Box
          minH="100vh"
          bg={colorMode === 'light' ? '#faf8f5' : '#1a0f0a'}
          py={8}
        >
          <Container maxW="container.md">
            <VStack gap={6} align="stretch">
              {settingsGroups.map((group) => (
                <Box key={group.title}>
                  <HStack gap={2} mb={3} px={2}>
                    <Box color={colorMode === 'light' ? '#d4a574' : '#d4a574'}>
                      {group.icon}
                    </Box>
                    <Heading size="sm" color={colorMode === 'light' ? '#3e2723' : '#d7ccc8'}>
                      {group.title}
                    </Heading>
                  </HStack>

                  <VStack gap={2} align="stretch">
                    {group.items.map((item) => (
                      <Box
                        key={item.key}
                        p={4}
                        borderRadius="xl"
                        bg={colorMode === 'light' ? 'white' : '#2c1810'}
                        borderWidth="1px"
                        borderColor={colorMode === 'light' ? '#e8dcc8' : '#5d4037'}
                      >
                        <HStack justify="space-between" align="start">
                          <HStack gap={3} flex={1}>
                            {item.icon && (
                              <Box color={colorMode === 'light' ? '#d4a574' : '#d4a574'}>
                                {item.icon}
                              </Box>
                            )}
                            <VStack align="start" gap={0} flex={1}>
                              <Text fontWeight="semibold" fontSize="sm" color={colorMode === 'light' ? '#3e2723' : '#d7ccc8'}>
                                {item.label}
                              </Text>
                              <Text fontSize="xs" color={colorMode === 'light' ? '#795548' : '#8d6e63'}>
                                {item.description}
                              </Text>
                            </VStack>
                          </HStack>
                          <Box
                            as="button"
                            w="52px"
                            h="28px"
                            borderRadius="full"
                            bg={item.value ? '#d4a574' : colorMode === 'light' ? '#e8dcc8' : '#5d4037'}
                            position="relative"
                            transition="all 0.3s"
                            onClick={item.onChange}
                            cursor="pointer"
                            _hover={{
                              opacity: 0.8,
                            }}
                          >
                            <Box
                              position="absolute"
                              top="2px"
                              left={item.value ? '26px' : '2px'}
                              w="24px"
                              h="24px"
                              borderRadius="full"
                              bg="white"
                              transition="all 0.3s"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                            >
                              {item.value ? (
                                <Check size={14} color="#d4a574" />
                              ) : (
                                <X size={14} color="#795548" />
                              )}
                            </Box>
                          </Box>
                        </HStack>
                      </Box>
                    ))}
                  </VStack>
                </Box>
              ))}

              {/* App Info */}
              <Box
                p={6}
                borderRadius="xl"
                bg={colorMode === 'light' ? '#f5e6d3' : '#3e2723'}
                borderWidth="1px"
                borderColor={colorMode === 'light' ? '#e8dcc8' : '#5d4037'}
                textAlign="center"
              >
                <VStack gap={2}>
                  <Text fontSize="sm" fontWeight="semibold" color={colorMode === 'light' ? '#5d4037' : '#d7ccc8'}>
                    Road Signs Master
                  </Text>
                  <Text fontSize="xs" color={colorMode === 'light' ? '#795548' : '#a1887f'}>
                    Version 1.0.0
                  </Text>
                  <Text fontSize="xs" color={colorMode === 'light' ? '#795548' : '#a1887f'}>
                    © 2024 Road Signs Master. All rights reserved.
                  </Text>
                </VStack>
              </Box>

              {/* Reset Button */}
              <Box
                p={4}
                borderRadius="xl"
                bg={colorMode === 'light' ? 'white' : '#2c1810'}
                borderWidth="1px"
                borderColor={colorMode === 'light' ? '#e8dcc8' : '#5d4037'}
                textAlign="center"
                cursor="pointer"
                _hover={{
                  bg: colorMode === 'light' ? '#fef5e7' : '#3e2723',
                }}
                transition="all 0.2s"
              >
                <Text fontSize="sm" color="red.500" fontWeight="semibold">
                  Reset All Progress
                </Text>
                <Text fontSize="xs" color={colorMode === 'light' ? '#795548' : '#8d6e63'} mt={1}>
                  This will delete all your learning data
                </Text>
              </Box>
            </VStack>
          </Container>
        </Box>
      </IonContent>
    </IonPage>
  );
};

export default Settings;