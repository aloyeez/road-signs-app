import React from 'react';
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
  Badge,
  Grid,
} from '@chakra-ui/react';
import { Moon, Sun, Heart, Shield, Zap, Globe, Target } from 'lucide-react';
import { useColorMode } from '@chakra-ui/color-mode';

const About: React.FC = () => {
  const history = useHistory();
  const { colorMode, toggleColorMode } = useColorMode();

  const features = [
    {
      icon: <Globe size={24} />,
      title: 'Multi-Country Support',
      description: 'Learn road signs from multiple European countries including Czech Republic, Poland, Germany, and more.',
    },
    {
      icon: <Target size={24} />,
      title: 'Interactive Learning',
      description: 'Engage with flashcards, quizzes, and interactive exercises designed for effective learning.',
    },
    {
      icon: <Zap size={24} />,
      title: 'Progress Tracking',
      description: 'Monitor your learning journey with detailed statistics and achievement tracking.',
    },
    {
      icon: <Shield size={24} />,
      title: 'Master Exam',
      description: 'Test your comprehensive knowledge with our challenging master exam to prove your expertise.',
    },
  ];

  const learningModes = [
    {
      title: 'Sign List',
      description: 'Browse comprehensive catalog of road signs',
      emoji: '📋',
    },
    {
      title: 'Learn Mode',
      description: 'Interactive flashcards with detailed explanations',
      emoji: '📚',
    },
    {
      title: 'Quiz',
      description: 'Multiple choice questions to test knowledge',
      emoji: '🧠',
    },
    {
      title: 'True or False',
      description: 'Quick-fire challenges for rapid learning',
      emoji: '✓',
    },
    {
      title: 'Master Exam',
      description: 'Comprehensive test to become a certified master',
      emoji: '🎓',
    },
  ];

  const howItWorks = [
    {
      step: '1',
      title: 'Choose Your Country',
      description: 'Select from available countries to start learning their specific road signs',
    },
    {
      step: '2',
      title: 'Learn at Your Pace',
      description: 'Use flashcards, browse the sign list, or jump into quizzes based on your preference',
    },
    {
      step: '3',
      title: 'Track Your Progress',
      description: 'Monitor your learning with progress indicators and statistics',
    },
    {
      step: '4',
      title: 'Master the Exam',
      description: 'Once confident, take the master exam to certify your knowledge',
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
                    About
                  </Heading>
                  <Text fontSize="xs" color={colorMode === 'light' ? '#d4a574' : '#d4a574'}>
                    Learn more about the app
                  </Text>
                </VStack>
              </HStack>
              
              <IconButton
                aria-label="Toggle color mode"
                variant="ghost"
                size="md"
                onClick={toggleColorMode}
                borderRadius="full"
                color={colorMode === 'light' ? '#5d4037' : '#bcaaa4'}
                _hover={{
                  bg: colorMode === 'light' ? '#f5e6d3' : '#3e2723',
                  color: colorMode === 'light' ? '#d4a574' : '#d4a574',
                }}
              >
                {colorMode === 'light' ? <Moon size={20} /> : <Sun size={20} />}
              </IconButton>
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
            <VStack gap={8} align="stretch">
              {/* Hero Section */}
              <Box
                p={8}
                borderRadius="2xl"
                bg={colorMode === 'light' ? 'white' : '#2c1810'}
                borderWidth="1px"
                borderColor={colorMode === 'light' ? '#e8dcc8' : '#5d4037'}
                textAlign="center"
              >
                <VStack gap={4}>
                  <Box fontSize="6xl">🚦</Box>
                  <Heading
                    size="2xl"
                    color={colorMode === 'light' ? '#3e2723' : '#d7ccc8'}
                  >
                    Road Signs Master
                  </Heading>
                  <Text 
                    color={colorMode === 'light' ? '#5d4037' : '#a1887f'}
                    fontSize="lg"
                    maxW="600px"
                  >
                    Your comprehensive platform for learning and mastering road signs from countries across Europe. Built for drivers, students, and road safety enthusiasts.
                  </Text>
                  <HStack gap={2} pt={2}>
                    <Badge 
                      bg={colorMode === 'light' ? '#f5e6d3' : '#3e2723'}
                      color={colorMode === 'light' ? '#d4a574' : '#d4a574'}
                      fontSize="sm" 
                      px={3} 
                      py={1}
                      borderWidth="1px"
                      borderColor={colorMode === 'light' ? '#e8dcc8' : '#5d4037'}
                    >
                      Version 1.0
                    </Badge>
                    <Badge 
                      bg={colorMode === 'light' ? '#f5e6d3' : '#3e2723'}
                      color={colorMode === 'light' ? '#d4a574' : '#d4a574'}
                      fontSize="sm" 
                      px={3} 
                      py={1}
                      borderWidth="1px"
                      borderColor={colorMode === 'light' ? '#e8dcc8' : '#5d4037'}
                    >
                      Free to Use
                    </Badge>
                  </HStack>
                </VStack>
              </Box>

              {/* Features Grid */}
              <VStack align="stretch" gap={4}>
                <HStack gap={2} px={2}>
                  <Heading size="md" color={colorMode === 'light' ? '#3e2723' : '#d7ccc8'}>
                    Key Features
                  </Heading>
                </HStack>
                
                <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4}>
                  {features.map((feature, index) => (
                    <Box
                      key={index}
                      p={6}
                      borderRadius="xl"
                      bg={colorMode === 'light' ? 'white' : '#2c1810'}
                      borderWidth="1px"
                      borderColor={colorMode === 'light' ? '#e8dcc8' : '#5d4037'}
                      _hover={{
                        transform: 'translateY(-2px)',
                        shadow: 'lg',
                      }}
                      transition="all 0.3s"
                    >
                      <VStack align="start" gap={3}>
                        <Box
                          bg={colorMode === 'light' ? '#d4a574' : '#d4a574'}
                          color="white"
                          p={3}
                          borderRadius="lg"
                        >
                          {feature.icon}
                        </Box>
                        <Heading size="sm" color={colorMode === 'light' ? '#3e2723' : '#d7ccc8'}>
                          {feature.title}
                        </Heading>
                        <Text fontSize="sm" color={colorMode === 'light' ? '#795548' : '#8d6e63'}>
                          {feature.description}
                        </Text>
                      </VStack>
                    </Box>
                  ))}
                </Grid>
              </VStack>

              {/* Learning Modes */}
              <Box
                p={6}
                borderRadius="xl"
                bg={colorMode === 'light' ? 'white' : '#2c1810'}
                borderWidth="1px"
                borderColor={colorMode === 'light' ? '#e8dcc8' : '#5d4037'}
              >
                <VStack align="stretch" gap={4}>
                  <Heading size="md" color={colorMode === 'light' ? '#3e2723' : '#d7ccc8'}>
                    Learning Modes
                  </Heading>
                  <Text color={colorMode === 'light' ? '#795548' : '#8d6e63'} fontSize="sm">
                    We offer 5 different learning modes to suit your study style and pace:
                  </Text>
                  
                  <VStack align="stretch" gap={3} pt={2}>
                    {learningModes.map((mode, index) => (
                      <HStack
                        key={index}
                        p={4}
                        borderRadius="lg"
                        bg={colorMode === 'light' ? '#faf8f5' : '#1a0f0a'}
                        gap={3}
                      >
                        <Text fontSize="2xl">{mode.emoji}</Text>
                        <VStack align="start" gap={0} flex={1}>
                          <Text fontWeight="semibold" fontSize="sm" color={colorMode === 'light' ? '#3e2723' : '#d7ccc8'}>
                            {mode.title}
                          </Text>
                          <Text fontSize="xs" color={colorMode === 'light' ? '#795548' : '#8d6e63'}>
                            {mode.description}
                          </Text>
                        </VStack>
                      </HStack>
                    ))}
                  </VStack>
                </VStack>
              </Box>

              {/* How It Works */}
              <Box
                p={6}
                borderRadius="xl"
                bg={colorMode === 'light' ? '#f5e6d3' : '#3e2723'}
                borderWidth="1px"
                borderColor={colorMode === 'light' ? '#e8dcc8' : '#5d4037'}
              >
                <VStack align="stretch" gap={4}>
                  <Heading size="md" color={colorMode === 'light' ? '#3e2723' : '#d7ccc8'}>
                    How It Works
                  </Heading>
                  
                  <VStack align="stretch" gap={3}>
                    {howItWorks.map((item) => (
                      <HStack key={item.step} align="start" gap={3}>
                        <Box
                          bg={colorMode === 'light' ? '#d4a574' : '#d4a574'}
                          color="white"
                          minW="32px"
                          h="32px"
                          borderRadius="full"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          fontWeight="bold"
                          fontSize="sm"
                          flexShrink={0}
                        >
                          {item.step}
                        </Box>
                        <VStack align="start" gap={0} flex={1}>
                          <Text fontWeight="semibold" fontSize="sm" color={colorMode === 'light' ? '#3e2723' : '#d7ccc8'}>
                            {item.title}
                          </Text>
                          <Text fontSize="sm" color={colorMode === 'light' ? '#5d4037' : '#a1887f'}>
                            {item.description}
                          </Text>
                        </VStack>
                      </HStack>
                    ))}
                  </VStack>
                </VStack>
              </Box>

              {/* Footer */}
              <Box
                p={6}
                borderRadius="xl"
                bg={colorMode === 'light' ? 'white' : '#2c1810'}
                borderWidth="1px"
                borderColor={colorMode === 'light' ? '#e8dcc8' : '#5d4037'}
                textAlign="center"
              >
                <VStack gap={2}>
                  <HStack justify="center">
                    <Text fontSize="xl" color={colorMode === 'light' ? '#3e2723' : '#d7ccc8'}>
                      Made with
                    </Text>
                    <Heart size={20} fill={colorMode === 'light' ? '#d4a574' : '#d4a574'} color={colorMode === 'light' ? '#d4a574' : '#d4a574'} />
                    <Text fontSize="xl" color={colorMode === 'light' ? '#3e2723' : '#d7ccc8'}>
                      for road safety
                    </Text>
                  </HStack>
                  <Text fontSize="sm" color={colorMode === 'light' ? '#5d4037' : '#a1887f'}>
                    Helping drivers learn and remember road signs for safer journeys
                  </Text>
                </VStack>
              </Box>
            </VStack>
          </Container>
        </Box>
      </IonContent>
    </IonPage>
  );
};

export default About;