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
import { Moon, Sun, CheckCircle, XCircle, RotateCcw, ArrowRight } from 'lucide-react';
import { useColorMode } from '@chakra-ui/color-mode';
import { czechRoadSigns, type RoadSign } from '../../data/czechSigns';

// Use imported Czech road signs data
const roadSigns = czechRoadSigns;

interface QuizQuestion {
  sign: RoadSign;
  options: string[];
  correctAnswer: string;
}

const QuizCZ: React.FC = () => {
  const history = useHistory();
  const { colorMode, toggleColorMode } = useColorMode();

  // Category selection
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [quizStarted, setQuizStarted] = useState(false);

  // Quiz state
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState<number[]>([]);
  const [wrongAnswers, setWrongAnswers] = useState<number[]>([]);
  const [quizFinished, setQuizFinished] = useState(false);

  const categories = ['Random', 'Warning', 'Prohibition'];

  // Generate quiz questions
  const generateQuiz = (category: string) => {
    let selectedSigns = [...roadSigns];

    if (category !== 'Random') {
      selectedSigns = roadSigns.filter(sign => sign.category === category);
    }

    // Shuffle and select 20 signs (or all if less than 20)
    const shuffled = selectedSigns.sort(() => 0.5 - Math.random());
    const quizSigns = shuffled.slice(0, Math.min(20, selectedSigns.length));

    // Generate questions with 4 options each
    const generatedQuestions: QuizQuestion[] = quizSigns.map(sign => {
      const correctAnswer = sign.czechName;

      // Get 3 random wrong answers from other signs
      const otherSigns = roadSigns.filter(s => s.id !== sign.id);
      const wrongOptions = otherSigns
        .sort(() => 0.5 - Math.random())
        .slice(0, 3)
        .map(s => s.czechName);

      // Combine and shuffle options
      const options = [correctAnswer, ...wrongOptions].sort(() => 0.5 - Math.random());

      return {
        sign,
        options,
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

  const handleAnswerSelect = (answer: string) => {
    if (selectedAnswer || showResult) return;

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
                    🧠
                  </Box>
                  <VStack align="start" gap={0}>
                    <Heading size="md" color={colorMode === 'light' ? '#3e2723' : '#d7ccc8'} fontWeight="bold" letterSpacing="tight">
                      Quiz
                    </Heading>
                    <Text fontSize="xs" color={colorMode === 'light' ? '#d4a574' : '#d4a574'}>
                      Česká republika
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
                        Vyberte kategorii
                      </Heading>
                      <Text color={colorMode === 'light' ? '#795548' : '#8d6e63'} fontSize="sm">
                        Zvolte kategorii značek nebo náhodný mix 20 značek
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
                                {Math.min(20, signsInCategory)} značek v kvízu
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
                              {signsInCategory} dostupných
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
                          Otázka {currentQuestionIndex + 1} / {questions.length}
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
                          alt="Dopravní značka"
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

                      <Heading size="md" color={colorMode === 'light' ? '#3e2723' : '#d7ccc8'} textAlign="center">
                        Jak se tato značka jmenuje?
                      </Heading>
                    </VStack>
                  </Box>

                  {/* Answer Options */}
                  <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4}>
                    {currentQuestion.options.map((option, index) => {
                      const isSelected = selectedAnswer === option;
                      const isCorrect = option === currentQuestion.correctAnswer;
                      const showCorrect = showResult && isCorrect;
                      const showWrong = showResult && isSelected && !isCorrect;

                      return (
                        <Box
                          key={index}
                          p={4}
                          borderRadius="xl"
                          bg={
                            showCorrect ? '#16a34a' :
                            showWrong ? '#dc2626' :
                            colorMode === 'light' ? 'white' : '#2c1810'
                          }
                          borderWidth="2px"
                          borderColor={
                            showCorrect ? '#16a34a' :
                            showWrong ? '#dc2626' :
                            isSelected ? colorMode === 'light' ? '#d4a574' : '#d4a574' :
                            colorMode === 'light' ? '#e8dcc8' : '#5d4037'
                          }
                          cursor={showResult ? 'default' : 'pointer'}
                          onClick={() => handleAnswerSelect(option)}
                          _hover={
                            showResult ? {} : {
                              borderColor: colorMode === 'light' ? '#d4a574' : '#d4a574',
                              transform: 'translateY(-2px)',
                            }
                          }
                          transition="all 0.2s ease"
                        >
                          <HStack justify="space-between">
                            <Text
                              fontSize="md"
                              fontWeight="medium"
                              color={
                                showCorrect || showWrong ? 'white' :
                                colorMode === 'light' ? '#3e2723' : '#d7ccc8'
                              }
                            >
                              {option}
                            </Text>
                            {showCorrect && <CheckCircle size={24} color="white" />}
                            {showWrong && <XCircle size={24} color="white" />}
                          </HStack>
                        </Box>
                      );
                    })}
                  </Grid>

                  {/* Next Button */}
                  {showResult && (
                    <Button
                      size="lg"
                      bg={colorMode === 'light' ? '#d4a574' : '#d4a574'}
                      color="white"
                      onClick={handleNextQuestion}
                      _hover={{ opacity: 0.9 }}
                    >
                      <HStack gap={2}>
                        <Text>{currentQuestionIndex < questions.length - 1 ? 'Další otázka' : 'Zobrazit výsledky'}</Text>
                        <ArrowRight size={20} />
                      </HStack>
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
                        Kvíz dokončen!
                      </Heading>
                      <Text color={colorMode === 'light' ? '#795548' : '#8d6e63'}>
                        {correctAnswers.length >= questions.length * 0.8
                          ? 'Výborná práce!'
                          : correctAnswers.length >= questions.length * 0.6
                          ? 'Dobrá práce! Pokračujte v procvičování.'
                          : 'Pokračujte ve studiu a zkuste to znovu!'}
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
                        Vaše skóre
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
                            Správně
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
                            Špatně
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
                        <Text>Nový kvíz</Text>
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
                      Zpět do menu
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
                        Jak to funguje
                      </Text>
                      <Text fontSize="sm" color={colorMode === 'light' ? '#5d4037' : '#a1887f'}>
                        Každý kvíz obsahuje až 20 značek. Uvidíte fotku značky a 4 možnosti. Vyberte správný název a získejte body. Hodně štěstí!
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

export default QuizCZ;
