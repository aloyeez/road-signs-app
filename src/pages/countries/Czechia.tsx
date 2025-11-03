import React, { useState, useEffect } from 'react';
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
} from '@chakra-ui/react';
import { Moon, Sun, ArrowRight, Trophy, Brain, CheckCircle, ListChecks, BookOpen } from 'lucide-react';
import { useColorMode } from '@chakra-ui/color-mode';
import { czechRoadSigns } from '../../data/czechSigns';
import { useTranslation } from '../../hooks/useTranslation';

const Czechia: React.FC = () => {
  const history = useHistory();
  const { colorMode, toggleColorMode } = useColorMode();
  const { t } = useTranslation();

  // Real user progress data from localStorage
  const [signsLearned, setSignsLearned] = useState(0);
  const totalSigns = czechRoadSigns.length;

  useEffect(() => {
    // Load learned signs count from localStorage
    const saved = localStorage.getItem('cz-learned-signs');
    if (saved) {
      try {
        const learnedIds = JSON.parse(saved) as number[];
        setSignsLearned(learnedIds.length);
      } catch (e) {
        console.error('Failed to load learned signs:', e);
        setSignsLearned(0);
      }
    }
  }, []);

  // Calculate mastery level based on progress
  const getMasteryLevel = () => {
    const percentage = (signsLearned / totalSigns) * 100;
    if (percentage === 0) return 'Beginner';
    if (percentage < 25) return 'Novice';
    if (percentage < 50) return 'Learning';
    if (percentage < 75) return 'Intermediate';
    if (percentage < 100) return 'Advanced';
    return 'Master';
  };

  const userProgress = {
    signsLearned,
    totalSigns,
    quizzesTaken: 0, // TODO: implement quiz tracking
    averageScore: 0, // TODO: implement score tracking
    masteryLevel: getMasteryLevel(),
  };

  const menuOptions = [
    {
      id: 'list',
      titleKey: 'dashboard.browseAll',
      descriptionKey: 'dashboard.browseAllDesc',
      emoji: '📋',
      route: '/country/CZ/signs-list',
      badge: `${userProgress.totalSigns} ${t('selectCountry.totalSigns')}`,
    },
    {
      id: 'learn',
      titleKey: 'dashboard.flashcards',
      descriptionKey: 'dashboard.flashcardsDesc',
      emoji: '📚',
      route: '/country/CZ/learn',
      badge: `${userProgress.signsLearned}/${userProgress.totalSigns} ${t('dashboard.learned')}`,
    },
    {
      id: 'quiz',
      titleKey: 'dashboard.quiz',
      descriptionKey: 'dashboard.quizDesc',
      emoji: '🧠',
      route: '/country/CZ/quiz',
      badge: t('dashboard.quizDesc'),
    },
    {
      id: 'true-false',
      titleKey: 'dashboard.trueFalse',
      descriptionKey: 'dashboard.trueFalseDesc',
      emoji: '✓',
      route: '/country/CZ/true-false',
      badge: t('dashboard.trueFalseDesc'),
    },
    {
      id: 'master-exam',
      titleKey: 'quiz.title',
      descriptionKey: 'dashboard.quizDesc',
      emoji: '🎓',
      route: '/country/CZ/master-exam',
      badge: t('dashboard.quizDesc'),
      isLocked: userProgress.signsLearned < 100,
    },
  ];

  const handleOptionClick = (route: string, isLocked?: boolean) => {
    if (isLocked) {
      return; // Could show a toast/alert here
    }
    history.push(route);
  };

  const progressPercentage = (userProgress.signsLearned / userProgress.totalSigns) * 100;

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
                <HStack gap={2}>
                  <Box
                    fontSize="2xl"
                    bg={colorMode === 'light' ? '#f5e6d3' : '#3e2723'}
                    px={2}
                    py={1}
                    borderRadius="lg"
                    borderWidth="1px"
                    borderColor={colorMode === 'light' ? '#e8dcc8' : '#5d4037'}
                  >
                    🇨🇿
                  </Box>
                  <VStack align="start" gap={0}>
                    <Heading size="md" color={colorMode === 'light' ? '#3e2723' : '#d7ccc8'} fontWeight="bold" letterSpacing="tight">
                      {t('dashboard.title')}
                    </Heading>
                    <Text fontSize="xs" color={colorMode === 'light' ? '#d4a574' : '#d4a574'}>
                      {t('dashboard.subtitle')}
                    </Text>
                  </VStack>
                </HStack>
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
            <VStack gap={6} align="stretch">
              {/* Progress Card */}
              <Box
                p={6}
                borderRadius="xl"
                bg={colorMode === 'light' ? 'white' : '#2c1810'}
                borderWidth="1px"
                borderColor={colorMode === 'light' ? '#e8dcc8' : '#5d4037'}
              >
                <VStack align="stretch" gap={4}>
                  <HStack justify="space-between">
                    <VStack align="start" gap={0}>
                      <Text fontSize="sm" color={colorMode === 'light' ? '#795548' : '#8d6e63'}>
                        {t('dashboard.progress')}
                      </Text>
                      <Heading size="lg" color={colorMode === 'light' ? '#3e2723' : '#d7ccc8'}>
                        {userProgress.signsLearned} / {userProgress.totalSigns}
                      </Heading>
                    </VStack>
                    <Badge 
                      bg={colorMode === 'light' ? '#f5e6d3' : '#3e2723'}
                      color={colorMode === 'light' ? '#d4a574' : '#d4a574'}
                      fontSize="md" 
                      px={3} 
                      py={1}
                      borderRadius="full"
                      borderWidth="1px"
                      borderColor={colorMode === 'light' ? '#e8dcc8' : '#5d4037'}
                    >
                      {userProgress.masteryLevel}
                    </Badge>
                  </HStack>
                  
                  <Box>
                    {/* Custom Progress Bar */}
                    <Box
                      w="100%"
                      h="8px"
                      bg={colorMode === 'light' ? '#e8dcc8' : '#5d4037'}
                      borderRadius="full"
                      overflow="hidden"
                    >
                      <Box
                        h="100%"
                        w={`${progressPercentage}%`}
                        bg={colorMode === 'light' ? '#d4a574' : '#d4a574'}
                        borderRadius="full"
                        transition="width 0.5s ease"
                      />
                    </Box>
                    <Text fontSize="xs" color={colorMode === 'light' ? '#795548' : '#8d6e63'} mt={2}>
                      {Math.round(progressPercentage)}% complete
                    </Text>
                  </Box>

                  <HStack gap={4} pt={2}>
                    <Box flex={1}>
                      <Text fontSize="xs" color={colorMode === 'light' ? '#795548' : '#8d6e63'}>Categories</Text>
                      <Text fontSize="lg" fontWeight="bold" color={colorMode === 'light' ? '#3e2723' : '#d7ccc8'}>
                        {Array.from(new Set(czechRoadSigns.map(s => s.category))).length}
                      </Text>
                    </Box>
                    <Box flex={1}>
                      <Text fontSize="xs" color={colorMode === 'light' ? '#795548' : '#8d6e63'}>Mastery</Text>
                      <Text fontSize="lg" fontWeight="bold" color={colorMode === 'light' ? '#3e2723' : '#d7ccc8'}>
                        {userProgress.masteryLevel}
                      </Text>
                    </Box>
                  </HStack>
                </VStack>
              </Box>

              {/* Learning Modes */}
              <VStack gap={4} align="stretch">
                <HStack gap={2} px={2}>
                  <Heading size="md" color={colorMode === 'light' ? '#3e2723' : '#d7ccc8'}>
                    {t('dashboard.learningSessions')}
                  </Heading>
                </HStack>

                {menuOptions.map((option) => (
                  <Box
                    key={option.id}
                    p={6}
                    borderRadius="xl"
                    bg={colorMode === 'light' ? 'white' : '#2c1810'}
                    borderWidth="1px"
                    borderColor={
                      option.isLocked
                        ? colorMode === 'light' ? '#e8dcc8' : '#5d4037'
                        : colorMode === 'light' ? '#e8dcc8' : '#5d4037'
                    }
                    opacity={option.isLocked ? 0.6 : 1}
                    _hover={
                      option.isLocked
                        ? {}
                        : {
                            transform: 'translateY(-4px)',
                            shadow: 'xl',
                            borderColor: colorMode === 'light' ? '#d4a574' : '#d4a574',
                          }
                    }
                    cursor={option.isLocked ? 'not-allowed' : 'pointer'}
                    onClick={() => handleOptionClick(option.route, option.isLocked)}
                    transition="all 0.3s ease"
                  >
                    <HStack gap={5} align="center">
                      <Box
                        bg={option.isLocked ? '#9e9e9e' : colorMode === 'light' ? '#d4a574' : '#d4a574'}
                        color="white"
                        w="60px"
                        h="60px"
                        borderRadius="xl"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        fontSize="2xl"
                        flexShrink={0}
                      >
                        {option.emoji}
                      </Box>
                      
                      <VStack align="start" flex={1} gap={1}>
                        <HStack>
                          <Heading size="md" color={colorMode === 'light' ? '#3e2723' : '#d7ccc8'}>
                            {t(option.titleKey)}
                          </Heading>
                          {option.isLocked && (
                            <Text fontSize="xl">🔒</Text>
                          )}
                        </HStack>
                        <Text color={colorMode === 'light' ? '#795548' : '#8d6e63'} fontSize="sm">
                          {t(option.descriptionKey)}
                        </Text>
                        <Badge
                          bg={option.isLocked ? '#efebe9' : colorMode === 'light' ? '#f5e6d3' : '#3e2723'}
                          color={option.isLocked ? '#5d4037' : colorMode === 'light' ? '#d4a574' : '#d4a574'}
                          fontSize="xs"
                          mt={1}
                          borderWidth="1px"
                          borderColor={option.isLocked ? '#e8dcc8' : colorMode === 'light' ? '#e8dcc8' : '#5d4037'}
                        >
                          {option.isLocked ? `${t('dashboard.learned')} 100 ${t('selectCountry.totalSigns')}` : option.badge}
                        </Badge>
                      </VStack>

                      {!option.isLocked && (
                        <Box color={colorMode === 'light' ? '#d4a574' : '#d4a574'}>
                          <ArrowRight size={24} />
                        </Box>
                      )}
                    </HStack>
                  </Box>
                ))}
              </VStack>

              {/* Motivational Card */}
              <Box
                p={6}
                borderRadius="xl"
                bg={colorMode === 'light' ? '#f5e6d3' : '#3e2723'}
                borderWidth="1px"
                borderColor={colorMode === 'light' ? '#e8dcc8' : '#5d4037'}
              >
                <HStack gap={3} align="start">
                  <Box
                    bg={colorMode === 'light' ? '#d4a574' : '#d4a574'}
                    color="white"
                    minW="40px"
                    h="40px"
                    borderRadius="full"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    fontSize="xl"
                    flexShrink={0}
                  >
                    🎯
                  </Box>
                  <VStack align="start" gap={1}>
                    <Text fontWeight="bold" fontSize="md" color={colorMode === 'light' ? '#3e2723' : '#d7ccc8'}>
                      {userProgress.signsLearned === 0 ? 'Start Your Journey!' : 'Keep Going!'}
                    </Text>
                    <Text fontSize="sm" color={colorMode === 'light' ? '#5d4037' : '#a1887f'}>
                      {userProgress.signsLearned === 0
                        ? `Start learning flashcards to track your progress. There are ${userProgress.totalSigns} signs waiting for you!`
                        : userProgress.signsLearned >= 100
                        ? `Amazing! You've learned ${userProgress.signsLearned} signs. Ready for the Master Exam!`
                        : `You've learned ${userProgress.signsLearned} signs. Just ${100 - userProgress.signsLearned} more to unlock the Master Exam!`
                      }
                    </Text>
                  </VStack>
                </HStack>
              </Box>
            </VStack>
          </Container>
        </Box>
      </IonContent>
    </IonPage>
  );
};

export default Czechia;