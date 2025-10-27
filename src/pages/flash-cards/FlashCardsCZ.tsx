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
  Badge,
} from '@chakra-ui/react';
import { Moon, Sun, ArrowLeft, ArrowRight, RotateCcw } from 'lucide-react';
import { useColorMode } from '@chakra-ui/color-mode';

// Sample flashcards - add more cards here
const flashcards = [
  {
    id: 1,
    czechName: 'Stůj, dej přednost v jízdě!',
    description: 'Complete stop required',
    image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%23dc2626" width="200" height="200"/%3E%3Ctext x="50%25" y="50%25" font-size="60" text-anchor="middle" dy=".3em" fill="white"%3ESTOP%3C/text%3E%3C/svg%3E',
  },
  {
    id: 2,
    czechName: 'Dej přednost v jízdě',
    description: 'Give way to traffic',
    image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Cpolygon points="100,20 180,180 20,180" fill="%23dc2626" stroke="white" stroke-width="8"/%3E%3C/svg%3E',
  },
  {
    id: 3,
    czechName: 'Nejvyšší dovolená rychlost 50',
    description: 'Maximum speed 50 km/h',
    image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Ccircle cx="100" cy="100" r="90" fill="white" stroke="%23dc2626" stroke-width="10"/%3E%3Ctext x="50%25" y="50%25" font-size="70" text-anchor="middle" dy=".3em" fill="%23dc2626"%3E50%3C/text%3E%3C/svg%3E',
  },
];

const FlashCardsCZ: React.FC = () => {
  const history = useHistory();
  const { colorMode, toggleColorMode } = useColorMode();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [stillLearning, setStillLearning] = useState<number[]>([]);
  const [alreadyDone, setAlreadyDone] = useState<number[]>([]);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [activeFlashcards, setActiveFlashcards] = useState(flashcards);

  const currentCard = activeFlashcards[currentIndex];
  const isComplete = currentIndex >= activeFlashcards.length;

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  const handleSwipe = (direction: 'left' | 'right') => {
    if (isComplete) return;

    const cardId = currentCard.id;

    if (direction === 'left') {
      setStillLearning([...stillLearning, cardId]);
    } else {
      setAlreadyDone([...alreadyDone, cardId]);
    }

    // Move to next card with smooth animation
    setTimeout(() => {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
      setDragOffset(0);
    }, 250);
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setStillLearning([]);
    setAlreadyDone([]);
    setIsFlipped(false);
    setDragOffset(0);
    setActiveFlashcards(flashcards);
  };

  const handleContinueSession = () => {
    // Filter flashcards to only include those in stillLearning
    const learningCards = flashcards.filter(card => stillLearning.includes(card.id));
    setActiveFlashcards(learningCards);
    setCurrentIndex(0);
    setStillLearning([]);
    setAlreadyDone([]);
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
                    Learn Signs
                  </Heading>
                  <Text fontSize="xs" color={colorMode === 'light' ? '#d4a574' : '#d4a574'}>
                    Swipe to categorize
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

      <IonContent fullscreen scrollY={false}>
        <Box
          h="calc(100vh - 73px)"
          bg={colorMode === 'light' ? '#faf8f5' : '#1a0f0a'}
          overflow="hidden"
          display="flex"
          flexDirection="column"
        >
          <Container maxW="container.md" h="100%" display="flex" flexDirection="column" py={4}>
            <VStack gap={3} align="stretch" flex="1" justify="space-between">
              {/* Progress */}
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
                      Progress: {Math.min(currentIndex, activeFlashcards.length)} / {activeFlashcards.length}
                    </Text>
                    {!isComplete && (
                      <Text fontSize="sm" color={colorMode === 'light' ? '#d4a574' : '#d4a574'} fontWeight="semibold">
                        {activeFlashcards.length - currentIndex} remaining
                      </Text>
                    )}
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

              {/* Instructions */}
              {!isComplete && (
                <HStack justify="center" gap={8} py={1} flexShrink={0}>
                  <HStack gap={2}>
                    <Box color="#dc2626">
                      <ArrowLeft size={18} />
                    </Box>
                    <Text fontSize="sm" color={colorMode === 'light' ? '#795548' : '#8d6e63'}>
                      Still Learning
                    </Text>
                  </HStack>
                  <HStack gap={2}>
                    <Box color="#16a34a">
                      <ArrowRight size={18} />
                    </Box>
                    <Text fontSize="sm" color={colorMode === 'light' ? '#795548' : '#8d6e63'}>
                      Already Done
                    </Text>
                  </HStack>
                </HStack>
              )}

              {/* Flashcard */}
              {!isComplete ? (
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
                      Still Learning
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
                      Already Done
                    </Box>
                  </Box>

                  {/* Card */}
                  <Box
                    w="100%"
                    maxW="400px"
                    maxH="calc(100vh - 300px)"
                    h="100%"
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
                              Tap to see name
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
                        Session Complete!
                      </Heading>

                      <HStack gap={6} justify="center">
                        <VStack>
                          <Text fontSize="2xl" fontWeight="bold" color="#dc2626">
                            {stillLearning.length}
                          </Text>
                          <Text fontSize="sm" color={colorMode === 'light' ? '#795548' : '#8d6e63'}>
                            Still Learning
                          </Text>
                        </VStack>
                        <VStack>
                          <Text fontSize="2xl" fontWeight="bold" color="#16a34a">
                            {alreadyDone.length}
                          </Text>
                          <Text fontSize="sm" color={colorMode === 'light' ? '#795548' : '#8d6e63'}>
                            Already Done
                          </Text>
                        </VStack>
                      </HStack>

                      <VStack gap={3} pt={2} w="100%">
                        {stillLearning.length > 0 && (
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
                            Continue Session ({stillLearning.length} cards)
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
                            onClick={handleReset}
                            _hover={{
                              opacity: 0.9,
                            }}
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            gap={2}
                          >
                            <RotateCcw size={18} />
                            Practice Again
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
                            Back to Menu
                          </Box>
                        </HStack>
                      </VStack>
                    </VStack>
                  </Box>
                </Box>
              )}

              {/* Action Buttons (mobile fallback) */}
              {!isComplete && (
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
                    Still Learning
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
                    Already Done
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