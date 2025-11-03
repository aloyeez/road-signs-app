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
import { Moon, Sun, ArrowRight } from 'lucide-react';
import { useColorMode } from '@chakra-ui/color-mode';
import { useTranslation } from '../hooks/useTranslation';

const SelectCountry: React.FC = () => {
  const history = useHistory();
  const { colorMode, toggleColorMode } = useColorMode();
  const { t } = useTranslation();

  const countries = [
    {
      code: 'CZ',
      nameKey: 'selectCountry.czechia',
      flag: '🇨🇿',
      signsCount: 180,
      learningModes: 5,
    },
  ];

  const comingSoon = [
    { code: 'PL', name: 'Poland', flag: '🇵🇱' },
    { code: 'DE', name: 'Germany', flag: '🇩🇪' },
    { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
    { code: 'UA', name: 'Ukraine', flag: '🇺🇦' },
  ];

  const handleCountrySelect = (countryCode: string) => {
    history.push(`/country/${countryCode}/menu`);
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
                    {t('selectCountry.title')}
                  </Heading>
                  <Text fontSize="xs" color={colorMode === 'light' ? '#d4a574' : '#d4a574'}>
                    {t('selectCountry.subtitle')}
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
            <VStack gap={6} align="stretch">
              {/* Info Banner */}
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
                    🌍
                  </Box>
                  <VStack align="start" gap={1}>
                    <Text fontWeight="bold" fontSize="md" color={colorMode === 'light' ? '#3e2723' : '#d7ccc8'}>
                      {t('home.startLearning')}
                    </Text>
                    <Text fontSize="sm" color={colorMode === 'light' ? '#5d4037' : '#a1887f'}>
                      {t('selectCountry.subtitle')}
                    </Text>
                  </VStack>
                </HStack>
              </Box>

              {/* Available Countries */}
              <VStack gap={4} align="stretch">
                <HStack gap={2} px={2}>
                  <Heading size="md" color={colorMode === 'light' ? '#3e2723' : '#d7ccc8'}>
                    Available Now
                  </Heading>
                </HStack>

                {countries.map((country) => (
                  <Box
                    key={country.code}
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
                    onClick={() => handleCountrySelect(country.code)}
                    transition="all 0.3s ease"
                  >
                    <HStack gap={5} align="center">
                      <Box
                        bg={colorMode === 'light' ? '#f5e6d3' : '#3e2723'}
                        color={colorMode === 'light' ? '#d4a574' : '#d4a574'}
                        w="80px"
                        h="80px"
                        borderRadius="xl"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        fontSize="4xl"
                        flexShrink={0}
                        borderWidth="1px"
                        borderColor={colorMode === 'light' ? '#e8dcc8' : '#5d4037'}
                      >
                        {country.flag}
                      </Box>

                      <VStack align="start" flex={1} gap={2}>
                        <Heading size="lg" color={colorMode === 'light' ? '#3e2723' : '#d7ccc8'}>
                          {t(country.nameKey)}
                        </Heading>

                        <HStack gap={4}>
                          <HStack gap={1}>
                            <Text fontSize="sm" color={colorMode === 'light' ? '#795548' : '#8d6e63'}>
                              🚦
                            </Text>
                            <Text fontSize="sm" color={colorMode === 'light' ? '#795548' : '#8d6e63'} fontWeight="medium">
                              {country.signsCount}+ {t('selectCountry.totalSigns')}
                            </Text>
                          </HStack>
                          <HStack gap={1}>
                            <Text fontSize="sm" color={colorMode === 'light' ? '#795548' : '#8d6e63'}>
                              📚
                            </Text>
                            <Text fontSize="sm" color={colorMode === 'light' ? '#795548' : '#8d6e63'} fontWeight="medium">
                              {country.learningModes} {t('selectCountry.categories')}
                            </Text>
                          </HStack>
                        </HStack>

                        <Text fontSize="xs" color={colorMode === 'light' ? '#795548' : '#8d6e63'}>
                          {t('home.description')}
                        </Text>
                      </VStack>

                      <Box color={colorMode === 'light' ? '#d4a574' : '#d4a574'}>
                        <ArrowRight size={24} />
                      </Box>
                    </HStack>
                  </Box>
                ))}
              </VStack>

              {/* Coming Soon */}
              <VStack gap={4} align="stretch">
                <HStack gap={2} px={2}>
                  <Heading size="md" color={colorMode === 'light' ? '#3e2723' : '#d7ccc8'}>
                    {t('selectCountry.coming')}
                  </Heading>
                </HStack>

                <Box
                  p={5}
                  borderRadius="xl"
                  bg={colorMode === 'light' ? 'white' : '#2c1810'}
                  borderWidth="1px"
                  borderColor={colorMode === 'light' ? '#e8dcc8' : '#5d4037'}
                >
                  <VStack gap={3} align="start">
                    <HStack gap={2}>
                      <Text fontSize="xl">🚀</Text>
                      <Text fontWeight="semibold" fontSize="sm" color={colorMode === 'light' ? '#3e2723' : '#d7ccc8'}>
                        {t('selectCountry.coming')}
                      </Text>
                    </HStack>
                    <Text fontSize="sm" color={colorMode === 'light' ? '#5d4037' : '#a1887f'}>
                      {t('home.subtitle')}
                    </Text>
                    <Grid templateColumns="repeat(2, 1fr)" gap={2} w="100%" pt={2}>
                      {comingSoon.map((country) => (
                        <HStack
                          key={country.code}
                          p={3}
                          borderRadius="lg"
                          bg={colorMode === 'light' ? '#faf8f5' : '#1a0f0a'}
                          gap={2}
                        >
                          <Text fontSize="xl">{country.flag}</Text>
                          <Text fontSize="sm" color={colorMode === 'light' ? '#5d4037' : '#bcaaa4'} fontWeight="medium">
                            {country.name}
                          </Text>
                        </HStack>
                      ))}
                    </Grid>
                  </VStack>
                </Box>
              </VStack>
            </VStack>
          </Container>
        </Box>
      </IonContent>
    </IonPage>
  );
};

export default SelectCountry;