import React, { useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonContent,
  IonIcon,
} from '@ionic/react';
import { arrowBackOutline, searchOutline } from 'ionicons/icons';
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
  Input,
  Grid,
} from '@chakra-ui/react';
import { Moon, Sun, Filter } from 'lucide-react';
import { useColorMode } from '@chakra-ui/color-mode';
import { czechRoadSigns } from '../../data/czechSigns';

// Use imported Czech road signs data
const roadSigns = czechRoadSigns;

const SignsList: React.FC = () => {
  const history = useHistory();
  const { colorMode, toggleColorMode } = useColorMode();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Warning', 'Prohibition'];

  const filteredSigns = roadSigns.filter((sign) => {
    const matchesSearch = sign.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         sign.czechName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         sign.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || sign.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Warning': return 'yellow';
      case 'Prohibition': return 'red';
      case 'Mandatory': return 'blue';
      case 'Informative': return 'green';
      default: return 'gray';
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
                    📋
                  </Box>
                  <VStack align="start" gap={0}>
                    <Heading size="md" color={colorMode === 'light' ? '#3e2723' : '#d7ccc8'} fontWeight="bold" letterSpacing="tight">
                      Seznam značek
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
              {/* Search Bar */}
              <Box
                p={4}
                borderRadius="xl"
                bg={colorMode === 'light' ? 'white' : '#2c1810'}
                borderWidth="1px"
                borderColor={colorMode === 'light' ? '#e8dcc8' : '#5d4037'}
              >
                <VStack gap={3} align="stretch">
                  <Box position="relative">
                    <Box
                      position="absolute"
                      left={3}
                      top="50%"
                      transform="translateY(-50%)"
                      zIndex={1}
                    >
                      <IonIcon icon={searchOutline} style={{ fontSize: '20px', color: '#d4a574' }} />
                    </Box>
                    <Input
                      placeholder="Search signs..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      pl={10}
                      borderColor={colorMode === 'light' ? '#e8dcc8' : '#5d4037'}
                      color={colorMode === 'light' ? '#3e2723' : '#d7ccc8'}
                      _focus={{
                        borderColor: colorMode === 'light' ? '#d4a574' : '#d4a574',
                        boxShadow: `0 0 0 1px ${colorMode === 'light' ? '#d4a574' : '#d4a574'}`,
                      }}
                    />
                  </Box>

                  {/* Category Filter */}
                  <HStack gap={2} flexWrap="wrap">
                    <HStack gap={1}>
                      <Filter size={16} color="#d4a574" />
                      <Text fontSize="sm" fontWeight="semibold" color={colorMode === 'light' ? '#795548' : '#8d6e63'}>
                        Category:
                      </Text>
                    </HStack>
                    {categories.map((category) => (
                      <Badge
                        key={category}
                        bg={selectedCategory === category 
                          ? colorMode === 'light' ? '#d4a574' : '#d4a574'
                          : colorMode === 'light' ? '#f5e6d3' : '#3e2723'
                        }
                        color={selectedCategory === category ? 'white' : colorMode === 'light' ? '#5d4037' : '#bcaaa4'}
                        cursor="pointer"
                        onClick={() => setSelectedCategory(category)}
                        fontSize="xs"
                        px={3}
                        py={1}
                        borderRadius="full"
                        borderWidth="1px"
                        borderColor={selectedCategory === category ? 'transparent' : colorMode === 'light' ? '#e8dcc8' : '#5d4037'}
                        _hover={{
                          transform: 'scale(1.05)',
                        }}
                        transition="all 0.2s"
                      >
                        {category}
                      </Badge>
                    ))}
                  </HStack>
                </VStack>
              </Box>

              {/* Stats */}
              <HStack gap={4}>
                <Box
                  flex={1}
                  p={4}
                  borderRadius="xl"
                  bg={colorMode === 'light' ? 'white' : '#2c1810'}
                  borderWidth="1px"
                  borderColor={colorMode === 'light' ? '#e8dcc8' : '#5d4037'}
                >
                  <VStack align="start" gap={1}>
                    <Text fontSize="xs" color={colorMode === 'light' ? '#795548' : '#8d6e63'} fontWeight="medium">
                      Total Signs
                    </Text>
                    <Heading size="lg" color={colorMode === 'light' ? '#d4a574' : '#d4a574'}>
                      {roadSigns.length}
                    </Heading>
                  </VStack>
                </Box>
                <Box
                  flex={1}
                  p={4}
                  borderRadius="xl"
                  bg={colorMode === 'light' ? 'white' : '#2c1810'}
                  borderWidth="1px"
                  borderColor={colorMode === 'light' ? '#e8dcc8' : '#5d4037'}
                >
                  <VStack align="start" gap={1}>
                    <Text fontSize="xs" color={colorMode === 'light' ? '#795548' : '#8d6e63'} fontWeight="medium">
                      Showing
                    </Text>
                    <Heading size="lg" color={colorMode === 'light' ? '#d4a574' : '#d4a574'}>
                      {filteredSigns.length}
                    </Heading>
                  </VStack>
                </Box>
              </HStack>

              {/* Signs Grid */}
              {filteredSigns.length === 0 ? (
                <Box
                  p={8}
                  borderRadius="xl"
                  bg={colorMode === 'light' ? 'white' : '#2c1810'}
                  borderWidth="1px"
                  borderColor={colorMode === 'light' ? '#e8dcc8' : '#5d4037'}
                  textAlign="center"
                >
                  <VStack gap={3}>
                    <Text fontSize="4xl">🔍</Text>
                    <Heading size="md" color={colorMode === 'light' ? '#3e2723' : '#d7ccc8'}>
                      No signs found
                    </Heading>
                    <Text color={colorMode === 'light' ? '#795548' : '#8d6e63'} fontSize="sm">
                      Try adjusting your search or filter criteria
                    </Text>
                  </VStack>
                </Box>
              ) : (
                <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4}>
                  {filteredSigns.map((sign) => (
                    <Box
                      key={sign.id}
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
                      transition="all 0.3s ease"
                    >
                      <VStack align="start" gap={4}>
                        <HStack justify="space-between" w="100%" align="start">
                          <Box
                            w="100px"
                            h="100px"
                            borderRadius="xl"
                            overflow="hidden"
                            bg={colorMode === 'light' ? '#faf8f5' : '#1a0f0a'}
                            flexShrink={0}
                            borderWidth="1px"
                            borderColor={colorMode === 'light' ? '#e8dcc8' : '#5d4037'}
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            p={2}
                          >
                            <img 
                              src={sign.image} 
                              alt={sign.czechName}
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%23d4a574" width="200" height="200" rx="10"/%3E%3Ctext x="50%25" y="50%25" font-size="60" text-anchor="middle" dy=".3em" fill="white"%3E' + encodeURIComponent(sign.czechName.substring(0, 2)) + '%3C/text%3E%3C/svg%3E';
                              }}
                              style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'contain',
                              }}
                            />
                          </Box>
                          <Badge 
                            colorScheme={getCategoryColor(sign.category)} 
                            fontSize="xs"
                          >
                            {sign.category}
                          </Badge>
                        </HStack>

                        <VStack align="start" gap={2} w="100%">
                          <VStack align="start" gap={0}>
                            <Heading size="sm" color={colorMode === 'light' ? '#3e2723' : '#d7ccc8'}>
                              {sign.czechName}
                            </Heading>
                            <Text fontSize="xs" color={colorMode === 'light' ? '#795548' : '#8d6e63'} fontWeight="medium">
                              {sign.name}
                            </Text>
                          </VStack>
                          <Text fontSize="sm" color={colorMode === 'light' ? '#795548' : '#8d6e63'}>
                            {sign.description}
                          </Text>
                        </VStack>
                      </VStack>
                    </Box>
                  ))}
                </Grid>
              )}

              {/* Info Card */}
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
                      Tip
                    </Text>
                    <Text fontSize="sm" color={colorMode === 'light' ? '#5d4037' : '#a1887f'}>
                      Click on any sign to view detailed information and examples of where it's used
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

export default SignsList;