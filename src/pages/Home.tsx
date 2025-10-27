import React from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonContent,
  IonIcon,
} from '@ionic/react';
import { settingsOutline } from 'ionicons/icons';
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
import { Moon, Sun, ArrowRight } from 'lucide-react';
import { useColorMode } from '@chakra-ui/color-mode';

const Home: React.FC = () => {
  const history = useHistory();
  const { colorMode, toggleColorMode } = useColorMode();

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
                <Box
                  bg={colorMode === 'light' ? '#d4a574' : '#d4a574'}
                  color="white"
                  w="48px"
                  h="48px"
                  borderRadius="xl"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  fontSize="2xl"
                  boxShadow="sm"
                >
                  🚦
                </Box>
                <VStack align="start" gap={0}>
                  <Heading 
                    size="lg" 
                    color={colorMode === 'light' ? '#3e2723' : '#d7ccc8'}
                    fontWeight="bold"
                    letterSpacing="tight"
                  >
                    Road Signs Master
                  </Heading>
                  <Text fontSize="sm" color={colorMode === 'light' ? '#795548' : '#a1887f'}>
                    Learn traffic signs easily
                  </Text>
                </VStack>
              </HStack>
              
              <HStack gap={2}>
                <IconButton
                  aria-label="Toggle color mode"
                  variant="ghost"
                  size="lg"
                  onClick={toggleColorMode}
                  borderRadius="full"
                  color={colorMode === 'light' ? '#5d4037' : '#bcaaa4'}
                  _hover={{
                    bg: colorMode === 'light' ? '#f5e6d3' : '#3e2723',
                    color: colorMode === 'light' ? '#d4a574' : '#d4a574',
                  }}
                >
                  {colorMode === 'light' ? <Moon size={22} /> : <Sun size={22} />}
                </IconButton>
                <IconButton
                  aria-label="Settings"
                  variant="ghost"
                  size="lg"
                  onClick={() => history.push('/settings')}
                  borderRadius="full"
                  color={colorMode === 'light' ? '#5d4037' : '#bcaaa4'}
                  _hover={{
                    bg: colorMode === 'light' ? '#f5e6d3' : '#3e2723',
                    color: colorMode === 'light' ? '#d4a574' : '#d4a574',
                  }}
                >
                  <IonIcon icon={settingsOutline} style={{ fontSize: '24px' }} />
                </IconButton>
              </HStack>
            </Flex>
          </Box>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <Box
          minH="100vh"
          bg={colorMode === 'light' ? '#faf8f5' : '#1a0f0a'}
          py={12}
        >
          <Container maxW="container.md">
            <VStack gap={10} align="stretch">
              {/* Hero Section */}
              <VStack gap={6} align="center" textAlign="center" py={8}>
                <Box
                  fontSize="6xl"
                  mb={2}
                >
                  🎓
                </Box>
                <Heading
                  size="3xl"
                  color={colorMode === 'light' ? '#3e2723' : '#d7ccc8'}
                  lineHeight="1.2"
                  maxW="700px"
                >
                  Master Road Signs with Confidence
                </Heading>
                
                <Text 
                  color={colorMode === 'light' ? '#5d4037' : '#a1887f'}
                  fontSize="lg"
                  maxW="500px"
                >
                  Learn traffic rules from European countries through interactive learning and comprehensive testing
                </Text>
              </VStack>

              {/* Main Action Cards */}
              <VStack gap={4} align="stretch">
                <Box
                  p={6}
                  borderRadius="xl"
                  bg={colorMode === 'light' ? 'white' : '#2c1810'}
                  borderWidth="1px"
                  borderColor={colorMode === 'light' ? '#e8dcc8' : '#5d4037'}
                  _hover={{
                    transform: 'translateY(-4px)',
                    shadow: 'xl',
                    borderColor: colorMode === 'light' ? '#d4a574' : '#d4a574',
                  }}
                  cursor="pointer"
                  onClick={() => history.push('/select-country')}
                  transition="all 0.3s ease"
                >
                  <HStack gap={5} align="center">
                    <Box
                      bg={colorMode === 'light' ? '#d4a574' : '#d4a574'}
                      color="white"
                      w="60px"
                      h="60px"
                      borderRadius="xl"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      fontSize="3xl"
                      flexShrink={0}
                    >
                      🌍
                    </Box>
                    <VStack align="start" flex={1} gap={1}>
                      <Heading size="lg" color={colorMode === 'light' ? '#3e2723' : '#d7ccc8'}>
                        Start Learning
                      </Heading>
                      <Text color={colorMode === 'light' ? '#795548' : '#8d6e63'} fontSize="md">
                        Choose a country and begin your journey to road sign mastery
                      </Text>
                    </VStack>
                    <Box color={colorMode === 'light' ? '#d4a574' : '#d4a574'}>
                      <ArrowRight size={24} />
                    </Box>
                  </HStack>
                </Box>

                <Box
                  p={6}
                  borderRadius="xl"
                  bg={colorMode === 'light' ? 'white' : '#2c1810'}
                  borderWidth="1px"
                  borderColor={colorMode === 'light' ? '#e8dcc8' : '#5d4037'}
                  _hover={{
                    transform: 'translateY(-4px)',
                    shadow: 'xl',
                    borderColor: colorMode === 'light' ? '#d4a574' : '#d4a574',
                  }}
                  cursor="pointer"
                  onClick={() => history.push('/about')}
                  transition="all 0.3s ease"
                >
                  <HStack gap={5} align="center">
                    <Box
                      bg={colorMode === 'light' ? '#f5e6d3' : '#3e2723'}
                      color={colorMode === 'light' ? '#d4a574' : '#d4a574'}
                      w="60px"
                      h="60px"
                      borderRadius="xl"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      fontSize="3xl"
                      flexShrink={0}
                      borderWidth="1px"
                      borderColor={colorMode === 'light' ? '#e8dcc8' : '#5d4037'}
                    >
                      ℹ️
                    </Box>
                    <VStack align="start" flex={1} gap={1}>
                      <Heading size="lg" color={colorMode === 'light' ? '#3e2723' : '#d7ccc8'}>
                        About
                      </Heading>
                      <Text color={colorMode === 'light' ? '#795548' : '#8d6e63'} fontSize="md">
                        Learn more about the app, features, and how it works
                      </Text>
                    </VStack>
                    <Box color={colorMode === 'light' ? '#d4a574' : '#d4a574'}>
                      <ArrowRight size={24} />
                    </Box>
                  </HStack>
                </Box>
              </VStack>

              {/* Features */}
              <Box
                p={6}
                borderRadius="xl"
                bg={colorMode === 'light' ? '#f5e6d3' : '#3e2723'}
                borderWidth="1px"
                borderColor={colorMode === 'light' ? '#e8dcc8' : '#5d4037'}
              >
                <VStack gap={4} align="stretch">
                  <Heading size="md" color={colorMode === 'light' ? '#3e2723' : '#d7ccc8'} textAlign="center">
                    Why Choose Road Signs Master?
                  </Heading>
                  
                  <VStack gap={3} align="stretch">
                    <HStack gap={3} align="start">
                      <Text fontSize="xl">📚</Text>
                      <VStack align="start" gap={0} flex={1}>
                        <Text fontWeight="semibold" fontSize="sm" color={colorMode === 'light' ? '#3e2723' : '#d7ccc8'}>
                          Interactive Learning
                        </Text>
                        <Text fontSize="xs" color={colorMode === 'light' ? '#5d4037' : '#a1887f'}>
                          Multiple modes including flashcards, quizzes, and exams
                        </Text>
                      </VStack>
                    </HStack>

                    <HStack gap={3} align="start">
                      <Text fontSize="xl">📊</Text>
                      <VStack align="start" gap={0} flex={1}>
                        <Text fontWeight="semibold" fontSize="sm" color={colorMode === 'light' ? '#3e2723' : '#d7ccc8'}>
                          Track Progress
                        </Text>
                        <Text fontSize="xs" color={colorMode === 'light' ? '#5d4037' : '#a1887f'}>
                          Monitor your learning with detailed statistics
                        </Text>
                      </VStack>
                    </HStack>

                    <HStack gap={3} align="start">
                      <Text fontSize="xl">🎯</Text>
                      <VStack align="start" gap={0} flex={1}>
                        <Text fontWeight="semibold" fontSize="sm" color={colorMode === 'light' ? '#3e2723' : '#d7ccc8'}>
                          Master Certification
                        </Text>
                        <Text fontSize="xs" color={colorMode === 'light' ? '#5d4037' : '#a1887f'}>
                          Unlock the master exam after learning 100 signs
                        </Text>
                      </VStack>
                    </HStack>
                  </VStack>
                </VStack>
              </Box>
            </VStack>
          </Container>
        </Box>
      </IonContent>
    </IonPage>
  );
};

export default Home;