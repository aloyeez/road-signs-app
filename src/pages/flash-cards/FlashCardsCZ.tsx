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
import { Moon, Sun, ArrowLeft, ArrowRight, RotateCcw, Filter } from 'lucide-react';
import { useColorMode } from '@chakra-ui/color-mode';
import { czechRoadSigns, type RoadSign } from '../../data/czechSigns';
import { useTranslation } from '../../hooks/useTranslation';

// Use imported Czech road signs data
const flashcards = czechRoadSigns;

const FlashCardsCZ: React.FC = () => {
  const history = useHistory();
  const { colorMode, toggleColorMode } = useColorMode();
  const { t } = useTranslation();

  // Category selection
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sessionStarted, setSessionStarted] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [sessionStillLearning, setSessionStillLearning] = useState<number[]>([]);
  const [sessionAlreadyDone, setSessionAlreadyDone] = useState<number[]>([]);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [activeFlashcards, setActiveFlashcards] = useState<RoadSign[]>([]);
  const [learnedSignIds, setLearnedSignIds] = useState<number[]>([]);

  const categories = [
    { key: 'All', label: t('flashcards.categories.all') },
    { key: 'Warning', label: t('flashcards.categories.warning') },
    { key: 'Prohibition', label: t('flashcards.categories.prohibition') }
  ];

  // Load learned signs from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('cz-learned-signs');
    if (saved) {
      try {
        const learnedIds = JSON.parse(saved) as number[];
        setLearnedSignIds(learnedIds);
      } catch (e) {
        console.error('Failed to load learned signs:', e);
        setLearnedSignIds([]);
      }
    }
  }, []);

  // Save learned signs to localStorage
  const saveLearnedSigns = (signIds: number[]) => {
    try {
      const saved = localStorage.getItem('cz-learned-signs');
      const existing = saved ? JSON.parse(saved) as number[] : [];
      const updated = Array.from(new Set([...existing, ...signIds]));
      localStorage.setItem('cz-learned-signs', JSON.stringify(updated));
      setLearnedSignIds(updated);
    } catch (e) {
      console.error('Failed to save learned signs:', e);
    }
  };

  const currentCard = activeFlashcards[currentIndex];
  const isComplete = currentIndex >= activeFlashcards.length;

  // Generate flashcards based on category, excluding already learned signs
  const startSession = (category: string, practiceAll: boolean = false) => {
    let selectedSigns = [...flashcards];

    if (category !== 'All') {
      selectedSigns = flashcards.filter(sign => sign.category === category);
    }

    // Filter out already learned signs unless user wants to practice all
    if (!practiceAll) {
      selectedSigns = selectedSigns.filter(sign => !learnedSignIds.includes(sign.id));
    }

    // Shuffle the signs
    const shuffled = selectedSigns.sort(() => 0.5 - Math.random());

    setActiveFlashcards(shuffled);
    setSelectedCategory(category);
    setSessionStarted(true);
    setSessionStillLearning([]);
    setSessionAlreadyDone([]);
  };

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  const handleSwipe = (direction: 'left' | 'right') => {
    if (isComplete) return;

    const cardId = currentCard.id;

    if (direction === 'left') {
      // Only add if not already in the array
      if (!sessionStillLearning.includes(cardId)) {
        setSessionStillLearning([...sessionStillLearning, cardId]);
      }
    } else {
      // Only add if not already in the array
      if (!sessionAlreadyDone.includes(cardId)) {
        const newAlreadyDone = [...sessionAlreadyDone, cardId];
        setSessionAlreadyDone(newAlreadyDone);
        // Save to localStorage immediately when marked as done
        saveLearnedSigns([cardId]);
      }
    }

    // Move to next card with smooth animation
    setTimeout(() => {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
      setDragOffset(0);
    }, 250);
  };

  const handleReset = () => {
    setSelectedCategory(null);
    setSessionStarted(false);
    setCurrentIndex(0);
    setSessionStillLearning([]);
    setSessionAlreadyDone([]);
    setIsFlipped(false);
    setDragOffset(0);
    setActiveFlashcards([]);
  };

  const handlePracticeAgain = () => {
    if (selectedCategory) {
      startSession(selectedCategory, true); // Practice all signs including learned ones
    }
  };

  const handleContinueSession = () => {
    // Filter flashcards to only include those in sessionStillLearning
    const learningCards = activeFlashcards.filter(card => sessionStillLearning.includes(card.id));
    setActiveFlashcards(learningCards);
    setCurrentIndex(0);
    setSessionStillLearning([]);
    setSessionAlreadyDone([]);
    setIsFlipped(false);
    setDragOffset(0);
  };

  const handleTouchStart = () => {
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const touch = e.touches[0];
    const startX = window.innerWidth / 2;
    setDragOffset(touch.clientX - startX);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    
    if (Math.abs(dragOffset) > 100) {
      handleSwipe(dragOffset > 0 ? 'right' : 'left');
    } else {
      setDragOffset(0);
    }
  };

  const getRotation = () => {
    return dragOffset / 10;
  };

  const getOpacity = (side: 'left' | 'right') => {
    if (side === 'left') {
      return dragOffset < -50 ? Math.min(1, Math.abs(dragOffset) / 150) : 0;
    } else {
      return dragOffset > 50 ? Math.min(1, dragOffset / 150) : 0;
    }
  };

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
                    {t('flashcards.title')}
                  </Heading>
                  <Text fontSize="xs" color={colorMode === 'light' ? '#d4a574' : '#d4a574'}>
                    {t('flashcards.subtitle')}
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

      <IonContent fullscreen scrollY={true}>
        <Box
          minH="calc(100vh - 73px)"
          bg={colorMode === 'light' ? '#faf8f5' : '#1a0f0a'}
          overflow={isComplete ? 'visible' : 'hidden'}
          display="flex"
          flexDirection="column"
        >
          <Container maxW="container.md" h="100%" display="flex" flexDirection="column" py={4}>
            <VStack gap={3} align="stretch" flex="1" justify="space-between">
              {/* Category Selection */}
              {!sessionStarted && (
                <>
                  <Box
                    p={6}
                    borderRadius="xl"
                    bg={colorMode === 'light' ? 'white' : '#2c1810'}
                    borderWidth="1px"
                    borderColor={colorMode === 'light' ? '#e8dcc8' : '#5d4037'}
                    textAlign="center"
                  >
                    <VStack gap={4}>
                      <Box fontSize="4xl">📚</Box>
                      <Heading size="lg" color={colorMode === 'light' ? '#3e2723' : '#d7ccc8'}>
                        {t('flashcards.chooseCategory')}
                      </Heading>
                      <Text color={colorMode === 'light' ? '#795548' : '#8d6e63'} fontSize="sm">
                        {t('flashcards.selectCategoryDesc')}
                      </Text>
                    </VStack>
                  </Box>

                  <VStack gap={4} align="stretch">
                    {categories.map((category) => {
                      const allSignsInCategory = category.key === 'All'
                        ? flashcards
                        : flashcards.filter(s => s.category === category.key);

                      const unlearnedSigns = allSignsInCategory.filter(sign => !learnedSignIds.includes(sign.id));
                      const totalInCategory = allSignsInCategory.length;
                      const unlearnedCount = unlearnedSigns.length;
                      const learnedCount = totalInCategory - unlearnedCount;

                      return (
                        <Box key={category.key}>
                          <Box
                            p={6}
                            borderRadius="xl"
                            bg={colorMode === 'light' ? 'white' : '#2c1810'}
                            borderWidth="1px"
                            borderColor={colorMode === 'light' ? '#e8dcc8' : '#5d4037'}
                            cursor="pointer"
                            onClick={() => startSession(category.key, unlearnedCount === 0)}
                            _hover={{
                              transform: 'translateY(-4px)',
                              shadow: 'xl',
                              borderColor: colorMode === 'light' ? '#d4a574' : '#d4a574',
                            }}
                            transition="all 0.3s ease"
                          >
                            <HStack justify="space-between">
                              <VStack align="start" gap={1}>
                                <Heading size="md" color={colorMode === 'light' ? '#3e2723' : '#d7ccc8'}>
                                  {category.label}
                                </Heading>
                                <Text fontSize="sm" color={colorMode === 'light' ? '#795548' : '#8d6e63'}>
                                  {unlearnedCount > 0
                                    ? `${unlearnedCount} ${t('flashcards.newSigns')} • ${learnedCount} ${t('flashcards.learnedSigns')}`
                                    : t('flashcards.allLearned', { count: totalInCategory })
                                  }
                                </Text>
                              </VStack>
                              <Badge
                                bg={unlearnedCount === 0 ? '#16a34a' : colorMode === 'light' ? '#f5e6d3' : '#3e2723'}
                                color={unlearnedCount === 0 ? 'white' : colorMode === 'light' ? '#d4a574' : '#d4a574'}
                                fontSize="md"
                                px={3}
                                py={1}
                                borderRadius="full"
                              >
                                {unlearnedCount > 0 ? unlearnedCount : '✓'}
                              </Badge>
                            </HStack>
                          </Box>
                          {unlearnedCount === 0 && (
                            <Box
                              mt={2}
                              p={3}
                              borderRadius="lg"
                              bg={colorMode === 'light' ? '#f5e6d3' : '#3e2723'}
                              borderWidth="1px"
                              borderColor={colorMode === 'light' ? '#e8dcc8' : '#5d4037'}
                            >
                              <Text fontSize="xs" color={colorMode === 'light' ? '#795548' : '#8d6e63'}>
                                💡 {t('flashcards.practiceAllHint', { count: totalInCategory })}
                              </Text>
                            </Box>
                          )}
                        </Box>
                      );
                    })}
                  </VStack>
                </>
              )}

              {/* Progress */}
              {sessionStarted && !isComplete && (
                <Box
                  p={3}
                  borderRadius="xl"
                  bg={colorMode === 'light' ? 'white' : '#2c1810'}
                  borderWidth="1px"
                  borderColor={colorMode === 'light' ? '#e8dcc8' : '#5d4037'}
                  flexShrink={0}
                >
                  <VStack gap={2}>
                    <HStack justify="space-between" w="100%">
                      <Text fontSize="sm" color={colorMode === 'light' ? '#795548' : '#8d6e63'}>
                        {t('flashcards.progress')}: {Math.min(currentIndex, activeFlashcards.length)} / {activeFlashcards.length}
                      </Text>
                      <Badge
                        bg={colorMode === 'light' ? '#f5e6d3' : '#3e2723'}
                        color={colorMode === 'light' ? '#d4a574' : '#d4a574'}
                      >
                        {categories.find(c => c.key === selectedCategory)?.label}
                      </Badge>
                    </HStack>
                    <HStack justify="space-between" w="100%">
                      <Text fontSize="sm" color={colorMode === 'light' ? '#d4a574' : '#d4a574'} fontWeight="semibold">
                        {activeFlashcards.length - currentIndex} {t('flashcards.remaining')}
                      </Text>
                    </HStack>
                    <Box w="100%" h="6px" bg={colorMode === 'light' ? '#e8dcc8' : '#5d4037'} borderRadius="full" overflow="hidden">
                      <Box
                        h="100%"
                        w={`${(currentIndex / activeFlashcards.length) * 100}%`}
                        bg={colorMode === 'light' ? '#d4a574' : '#d4a574'}
                        transition="width 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                      />
                    </Box>
                  </VStack>
                </Box>
              )}

              {/* Instructions */}
              {sessionStarted && !isComplete && (
                <HStack justify="center" gap={8} py={1} flexShrink={0}>
                  <HStack gap={2}>
                    <Box color="#dc2626">
                      <ArrowLeft size={18} />
                    </Box>
                    <Text fontSize="sm" color={colorMode === 'light' ? '#795548' : '#8d6e63'}>
                      {t('flashcards.instructions.left')}
                    </Text>
                  </HStack>
                  <HStack gap={2}>
                    <Box color="#16a34a">
                      <ArrowRight size={18} />
                    </Box>
                    <Text fontSize="sm" color={colorMode === 'light' ? '#795548' : '#8d6e63'}>
                      {t('flashcards.instructions.right')}
                    </Text>
                  </HStack>
                </HStack>
              )}

              {/* Flashcard */}
              {sessionStarted && !isComplete ? (
                <Box
                  position="relative"
                  flex="1"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  minH="0"
                >
                  {/* Swipe indicators */}
                  <Box
                    position="absolute"
                    left="20px"
                    top="50%"
                    transform="translateY(-50%)"
                    opacity={getOpacity('left')}
                    transition="opacity 0.15s ease-out"
                    zIndex={0}
                  >
                    <Box
                      bg="#dc2626"
                      color="white"
                      px={3}
                      py={2}
                      borderRadius="lg"
                      fontWeight="bold"
                      fontSize="md"
                    >
                      {t('flashcards.instructions.left')}
                    </Box>
                  </Box>

                  <Box
                    position="absolute"
                    right="20px"
                    top="50%"
                    transform="translateY(-50%)"
                    opacity={getOpacity('right')}
                    transition="opacity 0.15s ease-out"
                    zIndex={0}
                  >
                    <Box
                      bg="#16a34a"
                      color="white"
                      px={3}
                      py={2}
                      borderRadius="lg"
                      fontWeight="bold"
                      fontSize="md"
                    >
                      {t('flashcards.instructions.right')}
                    </Box>
                  </Box>

                  {/* Card */}
                  <Box
                    w="100%"
                    maxW="500px"
                    h="500px"
                    maxH="500px"
                    position="relative"
                    style={{
                      perspective: '1000px',
                    }}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                  >
                    <Box
                      w="100%"
                      h="100%"
                      position="relative"
                      style={{
                        transformStyle: 'preserve-3d',
                        transform: `rotateY(${isFlipped ? 180 : 0}deg) translateX(${dragOffset}px) rotate(${getRotation()}deg)`,
                        transition: isDragging ? 'none' : 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                      }}
                      cursor="pointer"
                      onClick={handleCardClick}
                    >
                      {/* Front */}
                      <Box
                        position="absolute"
                        w="100%"
                        h="100%"
                        style={{
                          backfaceVisibility: 'hidden',
                        }}
                      >
                        <Box
                          w="100%"
                          h="100%"
                          p={6}
                          borderRadius="2xl"
                          bg={colorMode === 'light' ? 'white' : '#2c1810'}
                          borderWidth="2px"
                          borderColor={colorMode === 'light' ? '#e8dcc8' : '#5d4037'}
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          boxShadow="xl"
                        >
                          <VStack gap={3} h="100%" justify="center">
                            <Box
                              flex="1"
                              maxW="250px"
                              maxH="250px"
                              borderRadius="xl"
                              overflow="hidden"
                              bg={colorMode === 'light' ? '#faf8f5' : '#1a0f0a'}
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              p={4}
                            >
                              <img
                                src={currentCard.image}
                                alt="Road sign"
                                style={{
                                  width: '100%',
                                  height: '100%',
                                  objectFit: 'contain',
                                }}
                              />
                            </Box>
                            <Text
                              fontSize="sm"
                              color={colorMode === 'light' ? '#d4a574' : '#d4a574'}
                              fontWeight="semibold"
                            >
                              {t('flashcards.tapToSee')}
                            </Text>
                          </VStack>
                        </Box>
                      </Box>

                      {/* Back */}
                      <Box
                        position="absolute"
                        w="100%"
                        h="100%"
                        style={{
                          backfaceVisibility: 'hidden',
                          transform: 'rotateY(180deg)',
                        }}
                      >
                        <Box
                          w="100%"
                          h="100%"
                          p={6}
                          borderRadius="2xl"
                          bg={colorMode === 'light' ? '#d4a574' : '#d4a574'}
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          boxShadow="xl"
                        >
                          <VStack gap={3} textAlign="center" px={2}>
                            <Heading
                              size="lg"
                              color="white"
                              lineHeight="1.3"
                            >
                              {currentCard.czechName}
                            </Heading>
                            <Text
                              fontSize="md"
                              color="whiteAlpha.900"
                            >
                              {currentCard.description}
                            </Text>
                          </VStack>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              ) : (
                /* Summary */
                <Box
                  flex="1"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Box
                    p={6}
                    borderRadius="2xl"
                    bg={colorMode === 'light' ? 'white' : '#2c1810'}
                    borderWidth="1px"
                    borderColor={colorMode === 'light' ? '#e8dcc8' : '#5d4037'}
                    textAlign="center"
                    w="100%"
                  >
                    <VStack gap={4}>
                      <Box fontSize="5xl">🎉</Box>
                      <Heading size="lg" color={colorMode === 'light' ? '#3e2723' : '#d7ccc8'}>
                        {t('flashcards.sessionComplete')}
                      </Heading>

                      <HStack gap={6} justify="center">
                        <VStack>
                          <Text fontSize="2xl" fontWeight="bold" color="#dc2626">
                            {sessionStillLearning.length}
                          </Text>
                          <Text fontSize="sm" color={colorMode === 'light' ? '#795548' : '#8d6e63'}>
                            {t('flashcards.instructions.left')}
                          </Text>
                        </VStack>
                        <VStack>
                          <Text fontSize="2xl" fontWeight="bold" color="#16a34a">
                            {sessionAlreadyDone.length}
                          </Text>
                          <Text fontSize="sm" color={colorMode === 'light' ? '#795548' : '#8d6e63'}>
                            {t('flashcards.instructions.right')}
                          </Text>
                        </VStack>
                      </HStack>

                      <VStack gap={3} pt={2} w="100%">
                        {sessionStillLearning.length > 0 && (
                          <Box
                            as="button"
                            w="100%"
                            px={6}
                            py={3}
                            borderRadius="xl"
                            bg="#dc2626"
                            color="white"
                            fontWeight="semibold"
                            onClick={handleContinueSession}
                            _hover={{
                              opacity: 0.9,
                            }}
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            gap={2}
                          >
                            <ArrowRight size={18} />
                            {t('flashcards.continueSession')} ({sessionStillLearning.length} {t('flashcards.cards')})
                          </Box>
                        )}
                        <HStack gap={3} w="100%">
                          <Box
                            as="button"
                            flex="1"
                            px={4}
                            py={3}
                            borderRadius="xl"
                            bg={colorMode === 'light' ? '#d4a574' : '#d4a574'}
                            color="white"
                            fontWeight="semibold"
                            onClick={handlePracticeAgain}
                            _hover={{
                              opacity: 0.9,
                            }}
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            gap={2}
                          >
                            <RotateCcw size={18} />
                            {t('flashcards.practiceAgain')}
                          </Box>
                          <Box
                            as="button"
                            flex="1"
                            px={4}
                            py={3}
                            borderRadius="xl"
                            bg={colorMode === 'light' ? 'white' : '#2c1810'}
                            color={colorMode === 'light' ? '#d4a574' : '#d4a574'}
                            borderWidth="2px"
                            borderColor={colorMode === 'light' ? '#d4a574' : '#d4a574'}
                            fontWeight="semibold"
                            onClick={() => history.goBack()}
                            _hover={{
                              opacity: 0.9,
                            }}
                          >
                            {t('flashcards.backToMenu')}
                          </Box>
                        </HStack>
                      </VStack>
                    </VStack>
                  </Box>
                </Box>
              )}

              {/* Action Buttons (mobile fallback) */}
              {sessionStarted && !isComplete && (
                <HStack gap={3} justify="center" flexShrink={0}>
                  <Box
                    as="button"
                    flex="1"
                    maxW="180px"
                    px={4}
                    py={3}
                    borderRadius="xl"
                    bg="#dc2626"
                    color="white"
                    fontWeight="semibold"
                    onClick={() => handleSwipe('left')}
                    _hover={{
                      opacity: 0.9,
                    }}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    gap={2}
                  >
                    <ArrowLeft size={18} />
                    {t('flashcards.instructions.left')}
                  </Box>
                  <Box
                    as="button"
                    flex="1"
                    maxW="180px"
                    px={4}
                    py={3}
                    borderRadius="xl"
                    bg="#16a34a"
                    color="white"
                    fontWeight="semibold"
                    onClick={() => handleSwipe('right')}
                    _hover={{
                      opacity: 0.9,
                    }}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    gap={2}
                  >
                    {t('flashcards.instructions.right')}
                    <ArrowRight size={18} />
                  </Box>
                </HStack>
              )}
            </VStack>
          </Container>
        </Box>
      </IonContent>
    </IonPage>
  );
};

export default FlashCardsCZ;