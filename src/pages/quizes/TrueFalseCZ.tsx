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
  Button,
  Grid,
} from '@chakra-ui/react';
import { Moon, Sun, CheckCircle, XCircle, RotateCcw, ThumbsUp, ThumbsDown } from 'lucide-react';
import { useColorMode } from '@chakra-ui/color-mode';
import { czechRoadSigns, type RoadSign } from '../../data/czechSigns';

// Use imported Czech road signs data
const roadSigns = czechRoadSigns;

interface TrueFalseQuestion {
  sign: RoadSign;
  displayedName: string;
  correctAnswer: boolean;
}

const TrueFalseCZ: React.FC = () => {
  const history = useHistory();
  const { colorMode, toggleColorMode } = useColorMode();

  // Category selection
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [quizStarted, setQuizStarted] = useState(false);

  // Quiz state
  const [questions, setQuestions] = useState<TrueFalseQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState<number[]>([]);
  const [wrongAnswers, setWrongAnswers] = useState<number[]>([]);
  const [quizFinished, setQuizFinished] = useState(false);

  const categories = ['Random', 'Warning', 'Prohibition'];

  // Generate true/false questions
  const generateQuiz = (category: string) => {
    let selectedSigns = [...roadSigns];

    if (category !== 'Random') {
      selectedSigns = roadSigns.filter(sign => sign.category === category);
    }

    // Shuffle and select 20 signs (or all if less than 20)
    const shuffled = selectedSigns.sort(() => 0.5 - Math.random());
    const quizSigns = shuffled.slice(0, Math.min(20, selectedSigns.length));

    // Generate true/false questions
    const generatedQuestions: TrueFalseQuestion[] = quizSigns.map(sign => {
      // 50% chance to show correct name, 50% chance to show wrong name
      const showCorrectName = Math.random() > 0.5;

      let displayedName: string;
      let correctAnswer: boolean;

      if (showCorrectName) {
        displayedName = sign.name;
        correctAnswer = true;
      } else {
        // Get a random wrong name from other signs
        const otherSigns = roadSigns.filter(s => s.id !== sign.id);
        const randomWrongSign = otherSigns[Math.floor(Math.random() * otherSigns.length)];
        displayedName = randomWrongSign.name;
        correctAnswer = false;
      }

      return {
        sign,
        displayedName,
        correctAnswer,
      };
    });

    setQuestions(generatedQuestions);
    setQuizStarted(true);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    generateQuiz(category);
  };

  const handleAnswerSelect = (answer: boolean) => {
    if (selectedAnswer !== null || showResult) return;

    setSelectedAnswer(answer);
    setShowResult(true);

    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = answer === currentQuestion.correctAnswer;

    if (isCorrect) {
      setCorrectAnswers([...correctAnswers, currentQuestionIndex]);
    } else {
      setWrongAnswers([...wrongAnswers, currentQuestionIndex]);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestartQuiz = () => {
    setSelectedCategory(null);
    setQuizStarted(false);
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setCorrectAnswers([]);
    setWrongAnswers([]);
    setQuizFinished(false);
  };

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

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
                    ✓
                  </Box>
                  <VStack align="start" gap={0}>
                    <Heading size="md" color={colorMode === 'light' ? '#3e2723' : '#d7ccc8'} fontWeight="bold" letterSpacing="tight">
                      True or False
                    </Heading>
                    <Text fontSize="xs" color={colorMode === 'light' ? '#d4a574' : '#d4a574'}>
                      Czech Republic
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
              {/* Category Selection */}
              {!quizStarted && !quizFinished && (
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
                      <Box fontSize="4xl">🎯</Box>
                      <Heading size="lg" color={colorMode === 'light' ? '#3e2723' : '#d7ccc8'}>
                        Choose a Category
                      </Heading>
                      <Text color={colorMode === 'light' ? '#795548' : '#8d6e63'} fontSize="sm">
                        Select a sign category or choose random for a mix of 20 signs
                      </Text>
                    </VStack>
                  </Box>

                  <VStack gap={4} align="stretch">
                    {categories.map((category) => {
                      const signsInCategory = category === 'Random'
                        ? roadSigns.length
                        : roadSigns.filter(s => s.category === category).length;

                      return (
                        <Box
                          key={category}
                          p={6}
                          borderRadius="xl"
                          bg={colorMode === 'light' ? 'white' : '#2c1810'}
                          borderWidth="1px"
                          borderColor={colorMode === 'light' ? '#e8dcc8' : '#5d4037'}
                          cursor="pointer"
                          onClick={() => handleCategorySelect(category)}
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
                                {category}
                              </Heading>
                              <Text fontSize="sm" color={colorMode === 'light' ? '#795548' : '#8d6e63'}>
                                {Math.min(20, signsInCategory)} signs in quiz
                              </Text>
                            </VStack>
                            <Badge
                              bg={colorMode === 'light' ? '#f5e6d3' : '#3e2723'}
                              color={colorMode === 'light' ? '#d4a574' : '#d4a574'}
                              fontSize="md"
                              px={3}
                              py={1}
                              borderRadius="full"
                            >
                              {signsInCategory} available
                            </Badge>
                          </HStack>
                        </Box>
                      );
                    })}
                  </VStack>
                </>
              )}

              {/* Quiz Questions */}
              {quizStarted && !quizFinished && currentQuestion && (
                <>
                  {/* Progress Bar */}
                  <Box
                    p={4}
                    borderRadius="xl"
                    bg={colorMode === 'light' ? 'white' : '#2c1810'}
                    borderWidth="1px"
                    borderColor={colorMode === 'light' ? '#e8dcc8' : '#5d4037'}
                  >
                    <VStack gap={2}>
                      <HStack justify="space-between" w="100%">
                        <Text fontSize="sm" color={colorMode === 'light' ? '#795548' : '#8d6e63'}>
                          Question {currentQuestionIndex + 1} / {questions.length}
                        </Text>
                        <Badge
                          bg={colorMode === 'light' ? '#f5e6d3' : '#3e2723'}
                          color={colorMode === 'light' ? '#d4a574' : '#d4a574'}
                        >
                          {selectedCategory}
                        </Badge>
                      </HStack>
                      <Box w="100%" h="6px" bg={colorMode === 'light' ? '#e8dcc8' : '#5d4037'} borderRadius="full" overflow="hidden">
                        <Box
                          h="100%"
                          w={`${progress}%`}
                          bg={colorMode === 'light' ? '#d4a574' : '#d4a574'}
                          transition="width 0.3s ease"
                        />
                      </Box>
                    </VStack>
                  </Box>

                  {/* Question Card */}
                  <Box
                    p={6}
                    borderRadius="xl"
                    bg={colorMode === 'light' ? 'white' : '#2c1810'}
                    borderWidth="1px"
                    borderColor={colorMode === 'light' ? '#e8dcc8' : '#5d4037'}
                  >
                    <VStack gap={6}>
                      <Box
                        w="200px"
                        h="200px"
                        borderRadius="xl"
                        overflow="hidden"
                        bg={colorMode === 'light' ? '#faf8f5' : '#1a0f0a'}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        p={4}
                        borderWidth="1px"
                        borderColor={colorMode === 'light' ? '#e8dcc8' : '#5d4037'}
                      >
                        <img
                          src={currentQuestion.sign.image}
                          alt="Road sign"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%23d4a574" width="200" height="200" rx="10"/%3E%3Ctext x="50%25" y="50%25" font-size="60" text-anchor="middle" dy=".3em" fill="white"%3E?%3C/text%3E%3C/svg%3E';
                          }}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                          }}
                        />
                      </Box>

                      <VStack gap={3}>
                        <Heading size="md" color={colorMode === 'light' ? '#3e2723' : '#d7ccc8'} textAlign="center">
                          Is this sign name correct?
                        </Heading>
                        <Box
                          p={4}
                          borderRadius="lg"
                          bg={colorMode === 'light' ? '#f5e6d3' : '#3e2723'}
                          borderWidth="1px"
                          borderColor={colorMode === 'light' ? '#e8dcc8' : '#5d4037'}
                        >
                          <Text fontSize="xl" fontWeight="bold" color={colorMode === 'light' ? '#3e2723' : '#d7ccc8'} textAlign="center">
                            "{currentQuestion.displayedName}"
                          </Text>
                        </Box>
                      </VStack>
                    </VStack>
                  </Box>

                  {/* True/False Buttons */}
                  <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                    <Button
                      size="lg"
                      h="80px"
                      bg={
                        showResult
                          ? selectedAnswer === false && currentQuestion.correctAnswer === false
                            ? '#16a34a'
                            : selectedAnswer === false && currentQuestion.correctAnswer === true
                            ? '#dc2626'
                            : colorMode === 'light' ? 'white' : '#2c1810'
                          : colorMode === 'light' ? 'white' : '#2c1810'
                      }
                      borderWidth="2px"
                      borderColor={
                        showResult
                          ? selectedAnswer === false && currentQuestion.correctAnswer === false
                            ? '#16a34a'
                            : selectedAnswer === false && currentQuestion.correctAnswer === true
                            ? '#dc2626'
                            : currentQuestion.correctAnswer === false
                            ? '#16a34a'
                            : colorMode === 'light' ? '#e8dcc8' : '#5d4037'
                          : colorMode === 'light' ? '#e8dcc8' : '#5d4037'
                      }
                      onClick={() => handleAnswerSelect(false)}
                      cursor={showResult ? 'default' : 'pointer'}
                      _hover={
                        showResult ? {} : {
                          borderColor: '#dc2626',
                          transform: 'translateY(-2px)',
                        }
                      }
                      transition="all 0.2s ease"
                      disabled={showResult}
                    >
                      <VStack gap={2}>
                        <ThumbsDown
                          size={32}
                          color={
                            showResult && (
                              (selectedAnswer === false && currentQuestion.correctAnswer === false) ||
                              (selectedAnswer === false && currentQuestion.correctAnswer === true)
                            )
                              ? 'white'
                              : '#dc2626'
                          }
                        />
                        <Text
                          fontSize="xl"
                          fontWeight="bold"
                          color={
                            showResult && (
                              (selectedAnswer === false && currentQuestion.correctAnswer === false) ||
                              (selectedAnswer === false && currentQuestion.correctAnswer === true)
                            )
                              ? 'white'
                              : '#dc2626'
                          }
                        >
                          False
                        </Text>
                      </VStack>
                    </Button>

                    <Button
                      size="lg"
                      h="80px"
                      bg={
                        showResult
                          ? selectedAnswer === true && currentQuestion.correctAnswer === true
                            ? '#16a34a'
                            : selectedAnswer === true && currentQuestion.correctAnswer === false
                            ? '#dc2626'
                            : colorMode === 'light' ? 'white' : '#2c1810'
                          : colorMode === 'light' ? 'white' : '#2c1810'
                      }
                      borderWidth="2px"
                      borderColor={
                        showResult
                          ? selectedAnswer === true && currentQuestion.correctAnswer === true
                            ? '#16a34a'
                            : selectedAnswer === true && currentQuestion.correctAnswer === false
                            ? '#dc2626'
                            : currentQuestion.correctAnswer === true
                            ? '#16a34a'
                            : colorMode === 'light' ? '#e8dcc8' : '#5d4037'
                          : colorMode === 'light' ? '#e8dcc8' : '#5d4037'
                      }
                      onClick={() => handleAnswerSelect(true)}
                      cursor={showResult ? 'default' : 'pointer'}
                      _hover={
                        showResult ? {} : {
                          borderColor: '#16a34a',
                          transform: 'translateY(-2px)',
                        }
                      }
                      transition="all 0.2s ease"
                      disabled={showResult}
                    >
                      <VStack gap={2}>
                        <ThumbsUp
                          size={32}
                          color={
                            showResult && (
                              (selectedAnswer === true && currentQuestion.correctAnswer === true) ||
                              (selectedAnswer === true && currentQuestion.correctAnswer === false)
                            )
                              ? 'white'
                              : '#16a34a'
                          }
                        />
                        <Text
                          fontSize="xl"
                          fontWeight="bold"
                          color={
                            showResult && (
                              (selectedAnswer === true && currentQuestion.correctAnswer === true) ||
                              (selectedAnswer === true && currentQuestion.correctAnswer === false)
                            )
                              ? 'white'
                              : '#16a34a'
                          }
                        >
                          True
                        </Text>
                      </VStack>
                    </Button>
                  </Grid>

                  {/* Result Message */}
                  {showResult && (
                    <Box
                      p={4}
                      borderRadius="xl"
                      bg={
                        selectedAnswer === currentQuestion.correctAnswer
                          ? '#16a34a'
                          : '#dc2626'
                      }
                      textAlign="center"
                    >
                      <VStack gap={2}>
                        <Text fontSize="lg" fontWeight="bold" color="white">
                          {selectedAnswer === currentQuestion.correctAnswer ? 'Correct!' : 'Wrong!'}
                        </Text>
                        <Text fontSize="sm" color="white">
                          {currentQuestion.correctAnswer
                            ? `The correct answer is TRUE. This is "${currentQuestion.sign.name}"`
                            : `The correct answer is FALSE. This is "${currentQuestion.sign.name}"`
                          }
                        </Text>
                      </VStack>
                    </Box>
                  )}

                  {/* Next Button */}
                  {showResult && (
                    <Button
                      size="lg"
                      bg={colorMode === 'light' ? '#d4a574' : '#d4a574'}
                      color="white"
                      onClick={handleNextQuestion}
                      _hover={{ opacity: 0.9 }}
                    >
                      {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'View Results'}
                    </Button>
                  )}
                </>
              )}

              {/* Quiz Results */}
              {quizFinished && (
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
                      <Box fontSize="5xl">
                        {correctAnswers.length >= questions.length * 0.8 ? '🎉' :
                         correctAnswers.length >= questions.length * 0.6 ? '👍' : '📚'}
                      </Box>
                      <Heading size="lg" color={colorMode === 'light' ? '#3e2723' : '#d7ccc8'}>
                        Quiz Complete!
                      </Heading>
                      <Text color={colorMode === 'light' ? '#795548' : '#8d6e63'}>
                        {correctAnswers.length >= questions.length * 0.8
                          ? 'Excellent work!'
                          : correctAnswers.length >= questions.length * 0.6
                          ? 'Good job! Keep practicing.'
                          : 'Keep studying and try again!'}
                      </Text>
                    </VStack>
                  </Box>

                  <Box
                    p={6}
                    borderRadius="xl"
                    bg={colorMode === 'light' ? 'white' : '#2c1810'}
                    borderWidth="1px"
                    borderColor={colorMode === 'light' ? '#e8dcc8' : '#5d4037'}
                  >
                    <VStack gap={4}>
                      <Heading size="md" color={colorMode === 'light' ? '#3e2723' : '#d7ccc8'}>
                        Your Score
                      </Heading>

                      <HStack gap={8} justify="center">
                        <VStack>
                          <Box color="#16a34a">
                            <CheckCircle size={48} />
                          </Box>
                          <Text fontSize="3xl" fontWeight="bold" color="#16a34a">
                            {correctAnswers.length}
                          </Text>
                          <Text fontSize="sm" color={colorMode === 'light' ? '#795548' : '#8d6e63'}>
                            Correct
                          </Text>
                        </VStack>

                        <VStack>
                          <Box color="#dc2626">
                            <XCircle size={48} />
                          </Box>
                          <Text fontSize="3xl" fontWeight="bold" color="#dc2626">
                            {wrongAnswers.length}
                          </Text>
                          <Text fontSize="sm" color={colorMode === 'light' ? '#795548' : '#8d6e63'}>
                            Wrong
                          </Text>
                        </VStack>
                      </HStack>

                      <Box
                        w="100%"
                        p={4}
                        borderRadius="lg"
                        bg={colorMode === 'light' ? '#f5e6d3' : '#3e2723'}
                      >
                        <Text fontSize="2xl" fontWeight="bold" color={colorMode === 'light' ? '#d4a574' : '#d4a574'}>
                          {Math.round((correctAnswers.length / questions.length) * 100)}%
                        </Text>
                      </Box>
                    </VStack>
                  </Box>

                  <HStack gap={3}>
                    <Button
                      flex={1}
                      size="lg"
                      bg={colorMode === 'light' ? '#d4a574' : '#d4a574'}
                      color="white"
                      onClick={handleRestartQuiz}
                      _hover={{ opacity: 0.9 }}
                    >
                      <HStack gap={2}>
                        <RotateCcw size={20} />
                        <Text>New Quiz</Text>
                      </HStack>
                    </Button>
                    <Button
                      flex={1}
                      size="lg"
                      variant="outline"
                      borderColor={colorMode === 'light' ? '#d4a574' : '#d4a574'}
                      color={colorMode === 'light' ? '#d4a574' : '#d4a574'}
                      onClick={() => history.goBack()}
                      _hover={{ opacity: 0.9 }}
                    >
                      Back to Menu
                    </Button>
                  </HStack>
                </>
              )}

              {/* Info Card */}
              {!quizStarted && !quizFinished && (
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
                      💡
                    </Box>
                    <VStack align="start" gap={1}>
                      <Text fontWeight="bold" fontSize="md" color={colorMode === 'light' ? '#3e2723' : '#d7ccc8'}>
                        How it works
                      </Text>
                      <Text fontSize="sm" color={colorMode === 'light' ? '#5d4037' : '#a1887f'}>
                        Each quiz contains up to 20 signs. You'll see a sign image with a name. Decide if the name is correct (TRUE) or incorrect (FALSE). Good luck!
                      </Text>
                    </VStack>
                  </HStack>
                </Box>
              )}
            </VStack>
          </Container>
        </Box>
      </IonContent>
    </IonPage>
  );
};

export default TrueFalseCZ;
