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

// Mock data for Czech road signs
// IMPORTANT: Replace image URLs with your actual local images
// Example: image: '/assets/signs/stop.png'
const roadSigns = [
  {
    id: 1,
    name: 'Zatáčka vpravo',
    czechName: 'Zatáčka vpravo',
    category: 'Výstražné',
    description: 'Upozorňuje na směrový oblouk.',
    image: '/assets/signs/cz/zatacka_vpravo.png',
    color: 'yellow',
  },
  {
    id: 2,
    name: 'Zatáčka vlevo',
    czechName: 'Zatáčka vlevo',
    category: 'Výstražné',
    description: 'Upozorňuje na směrový oblouk.',
    image: '/assets/signs/cz/zatacka_vlevo.png',
    color: 'yellow',
  },
  {
    id: 3,
    name: 'Dvojitá zatáčka, první vpravo',
    czechName: 'Dvojitá zatáčka, první vpravo',
    category: 'Výstražné',
    description: 'Upozorňuje na dva po sobě následující protisměrné směrové oblouky.',
    image: '/assets/signs/cz/dvojita_zatacka_prvni_vpravo.png',
    color: 'yellow',
  },
  {
    id: 4,
    name: 'Dvojitá zatáčka, první vlevo',
    czechName: 'Upozorňuje na dva po sobě následující protisměrné směrové oblouky.',
    category: 'Výstražné',
    description: 'Upozorňuje na směrový oblouk.',
    image: '/assets/signs/cz/dvojita_zatacka_prvni_vlevo.png',
    color: 'yellow',
  },
  {
    id: 5,
    name: 'Křižovatka',
    czechName: 'Křižovatka',
    category: 'Výstražné',
    description: 'Upozorňuje na křižovatku, kde není přednost v jízdě upravena svislými dopravními značkami.',
    image: '/assets/signs/cz/krizovatka.png',
    color: 'yellow',
  },
  {
    id: 6,
    name: 'Křižovatka s kruhovým objezdem',
    czechName: 'Křižovatka s kruhovým objezdem',
    category: 'Výstražné',
    description: 'Upozorňuje na křižovatku s kruhovým objezdem.',
    image: '/assets/signs/cz/krizovatka_s_kruhovym_objezdem.png',
    color: 'yellow',
  },
  {
    id: 7,
    name: 'Dangerous descent',
    czechName: 'Nebezpečné klesání',
    category: 'Výstražné',
    description: 'Draws attention to the section where the descent of the road exceeds 10% or where local conditions make the descent dangerous; The actual slope of the road is marked.',
    image: '/assets/signs/cz/nebezpecne_klesani.png',
    color: 'yellow',
  },
  {
    id: 8,
    name: 'Dangerous climb',
    czechName: 'Nebezpečné stoupání',
    category: 'Výstražné',
    description: 'Draws attention to the section where the gradient of the road exceeds 10% or where local conditions make the gradient dangerous; The actual slope of the road is marked.',
    image: '/assets/signs/cz/nebezpecne_stoupani.png',
    color: 'yellow',
  },
  {
    id: 9,
    name: 'Narrowed carriageway (on both sides)',
    czechName: 'Zúžená vozovka (z obou stran)',
    category: 'Výstražné',
    description: 'It draws attention to the place where the road narrows compared to the previous section, or, for example, where the tram track approaches the pavement.',
    image: '/assets/signs/cz/zuzena_vozovka_z_obou_stran.png',
    color: 'yellow',
  },
  {
    id: 10,
    name: 'Narrowed carriageway (on one side)',
    czechName: 'Zúžená vozovka (z jedné strany)',
    category: 'Výstražné',
    description: 'It draws attention to the place where the road narrows compared to the previous section, or, for example, where the tram track approaches the pavement. The symbol can be reversed, the actual side of the taper is marked on the mark.',
    image: '/assets/signs/cz/zuzena_vozovka_z_jedne_strany1.png',
    color: 'yellow',
  },
  {
    id: 11,
    name: 'Road unevenness',
    czechName: 'Nerovnost vozovky',
    category: 'Výstražné',
    description: 'Draws attention to individual bumps, potholes, ditches or a section with an uneven road surface.',
    image: '/assets/signs/cz/nerovnost_vozovky.png',
    color: 'yellow',
  },
  {
    id: 12,
    name: 'Speed Bump',
    czechName: 'Zpomalovací práh',
    category: 'Výstražné',
    description: 'It draws attention to artificial unevenness on the road.',
    image: '/assets/signs/cz/zpomalovaci_prah.png',
    color: 'yellow',
  },
  {
    id: 13,
    name: 'Skid Risk',
    czechName: 'Nebezpečí smyku',
    category: 'Výstražné',
    description: 'Alerts you to a place or section of road where a vehicle may skid.',
    image: '/assets/signs/cz/nebezpeci_smyku.png',
    color: 'yellow',
  },
  {
    id: 14,
    name: 'Traffic in both directions',
    czechName: 'Provoz v obou směrech',
    category: 'Výstražné',
    description: 'It draws attention to a section of the road where, unlike the previous section, there is temporary or permanent traffic in both directions; The sign is also used at the end of a directionally divided road.',
    image: '/assets/signs/cz/provoz_v_obou_smerech.png',
    color: 'yellow',
  },
  {
    id: 15,
    name: 'Light Signals',
    czechName: 'Světelné signály',
    category: 'Výstražné',
    description: 'It alerts the driver to a place where traffic on the road is controlled by light signals that he would not otherwise expect, or where they are not visible from a sufficient distance.',
    image: '/assets/signs/cz/svetelne_signaly.png',
    color: 'yellow',
  },
  {
    id: 16,
    name: 'Pedestrian crossing',
    czechName: 'Přechod pro chodce',
    category: 'Výstražné',
    description: 'It warns in advance in the municipality in justified cases, for example in an unclear section of the road, and always outside the municipality of a pedestrian crossing.',
    image: '/assets/signs/cz/prechod_pro_chodce.png',
    color: 'yellow',
  },
  {
    id: 17,
    name: 'Pedestrians',
    czechName: 'Chodci',
    category: 'Výstražné',
    description: 'It draws attention to a place or section of the road with the possibility of an increased occurrence of pedestrians or frequent crossing of pedestrians in a place where there is no pedestrian crossing, e.g. in a place where there is no crossing.',
    image: '/assets/signs/cz/chodci.png',
    color: 'yellow',
  },
  {
    id: 18,
    name: 'Children',
    czechName: 'Děti',
    category: 'Výstražné',
    description: 'It draws attention to a place or section of the road where children often move or gather in its vicinity, cross the road or where there is an increased risk of them suddenly running into the road.',
    image: '/assets/signs/cz/deti.png',
    color: 'yellow',
  },  
  {
    id: 19,
    name: 'Animals',
    czechName: 'Zvířata',
    category: 'Výstražné',
    description: 'It draws attention to a place or section of the road where there may be frequent occurrence of pets on the road.',
    image: '/assets/signs/cz/zvirata.png',
    color: 'yellow',
  },
  {
    id: 20,
    name: 'Animal',
    czechName: 'Zvěř',
    category: 'Výstražné',
    description: 'It draws attention to a place or section of the road where there may be frequent occurrence of animal on the road.',
    image: '/assets/signs/cz/zver.png',
    color: 'yellow',
  },
  {
    id: 21,
    name: 'Roadworks',
    czechName: 'Práce na silnici',
    category: 'Výstražné',
    description: 'It draws attention to work on the road, or its components or accessories, which could endanger the safety of road traffic or during which the road traffic could endanger the workers performing this activity.',
    image: '/assets/signs/cz/prace_na_silnici.png',
    color: 'yellow',
  },
  {
    id: 22,
    name: 'Crosswind',
    czechName: 'Boční vítr',
    category: 'Výstražné',
    description: 'It draws attention to a section of the road where a sudden strong crosswind can endanger traffic safety on the roads.',
    image: '/assets/signs/cz/bocni_vitr.png',
    color: 'yellow',
  },
  {
    id: 23,
    name: 'Flying gravel',
    czechName: 'Odlétávající štěrk',
    category: 'Výstražné',
    description: 'It draws attention to a place or section of the road where there is more loose gravel on the road, which could endanger the safety of road users.',
    image: '/assets/signs/cz/odletavajici_sterk.png',
    color: 'yellow',
  },
  {
    id: 24,
    name: 'Stones on the road',
    czechName: 'Kamení na vozovce',
    category: 'Výstražné',
    description: 'Draws attention to a place or section of road where landslides or stones may fall on the road; symbol can be reversed.',
    image: '/assets/signs/cz/kameni_na_vozovce.png',
    color: 'yellow',
  },
  {
    id: 25,
    name: 'Cyclists',
    czechName: 'Cyklisté',
    category: 'Výstražné',
    description: 'It draws attention to the place where cyclists enter or cross the road, or to the section where cyclists are often present.',
    image: '/assets/signs/cz/cykliste.png',
    color: 'yellow',
  },
  {
    id: 26,
    name: 'Aircraft',
    czechName: 'Letadla',
    category: 'Výstražné',
    description: 'It draws attention to a place where planes fly over the road at a low altitude.',
    image: '/assets/signs/cz/letadla.png',
    color: 'yellow',
  },
  {
    id: 27,
    name: 'Tunnel',
    czechName: 'Tunel',
    category: 'Výstražné',
    description: 'It draws attention to the tunnel, where the rules of road traffic for behavior in the tunnel apply.',
    image: '/assets/signs/cz/tunel.png',
    color: 'yellow',
  },
  {
    id: 28,
    name: 'Other risks',
    czechName: 'Jiné nebezpečí',
    category: 'Výstražné',
    description: 'It warns of risks other than those that can be indicated by the appropriate warning sign; The type of risk is indicated on the additional table by a suitable symbol or inscription.',
    image: '/assets/signs/cz/letadla.png',
    color: 'yellow',
  },
  {
    id: 29,
    name: 'Traffic Jam',
    czechName: 'Kolona',
    category: 'Výstražné',
    description: 'It warns of the danger of a queue of standing or slow-moving vehicles.',
    image: '/assets/signs/cz/kolona.png',
    color: 'yellow',
  },
  {
    id: 30,
    name: 'Ice',
    czechName: 'Náledí',
    category: 'Výstražné',
    description: 'It warns of a section with an increased risk of frequent occurrence of ice on the road.',
    image: '/assets/signs/cz/naledi.png',
    color: 'yellow',
  },
  {
    id: 31,
    name: 'Tram',
    czechName: 'Tramvaj',
    category: 'Výstražné',
    description: 'It draws attention, if necessary in the interest of road traffic safety, especially to the place where the tram crosses the direction of travel of other vehicles.',
    image: '/assets/signs/cz/tramvaj.png',
    color: 'yellow',
  },
  {
    id: 32,
    name: 'Fog',
    czechName: 'Mlha',
    category: 'Výstražné',
    description: 'It warns of the occurrence of fog or smoke, reducing visibility on roads.',
    image: '/assets/signs/cz/mlha.png',
    color: 'yellow',
  },
  {
    id: 33,
    name: 'Accident',
    czechName: 'Nehoda',
    category: 'Výstražné',
    description: 'It draws attention to the location of the traffic accident.',
    image: '/assets/signs/cz/nehoda.png',
    color: 'yellow',
  },
  {
    id: 34,
    name: 'Dangerous Roadside',
    czechName: 'Nebezpečná krajnice',
    category: 'Výstražné',
    description: 't draws attention to a section of the road where it is dangerous to drive onto the roadside.',
    image: '/assets/signs/cz/nebezpecna_krajnice.png',
    color: 'yellow',
  },
  {
    id: 35,
    name: 'Railway crossing with barriers',
    czechName: 'Železniční přejezd se závorami',
    category: 'Výstražné',
    description: 'It draws attention to a level crossing equipped with full or half barriers.',
    image: '/assets/signs/cz/zeleznicni_prejezd_se_zavorami.png',
    color: 'yellow',
  },
  {
    id: 36,
    name: 'Railway crossing without barriers',
    czechName: 'Železniční přejezd bez závor',
    category: 'Výstražné',
    description: 'It draws attention to a railway crossing not equipped with barriers.',
    image: '/assets/signs/cz/zeleznicni_prejezd_bez_zavor.png',
    color: 'yellow',
  },
  {
    id: 37,
    name: 'Signal board (240 m)',
    czechName: 'Návěstní deska (240 m)',
    category: 'Výstražné',
    description: 'It warns in advance of the railway crossing. The diagonal lanes on the sign point towards the center of the road.',
    image: '/assets/signs/cz/navestni_deska_240.png',
    color: 'yellow',
  },
  {
    id: 38,
    name: 'Signal board (160 m)',
    czechName: 'Návěstní deska (160 m)',
    category: 'Výstražné',
    description: 'It warns in advance of the railway crossing.',
    image: '/assets/signs/cz/navestni_deska_160.png',
    color: 'yellow',
  },
  {
    id: 39,
    name: 'Signal board (80 m)',
    czechName: 'Návěstní deska (80 m)',
    category: 'Výstražné',
    description: 'It warns in advance of the railway crossing. If the distance from the previous level crossing is less than 160 metres, a road sign indicating the type of level crossing shall be placed above this sign.',
    image: '/assets/signs/cz/navestni_deska_80.png',
    color: 'yellow',
  },
  {
    id: 40,
    name: 'Warning cross for a single-track railway crossing',
    czechName: 'Výstražný kříž pro železniční přejezd jednokolejný',
    category: 'Výstražné',
    description: 'It marks a railway crossing. It is placed immediately in front of the level crossing.',
    image: '/assets/signs/cz/Czech_Republic_road_sign_A_32a.png',
    color: 'yellow',
  },
  {
    id: 41,
    name: 'Warning cross for multi-track level crossing',
    czechName: 'Výstražný kříž pro železniční přejezd vícekolejný',
    category: 'Výstražné',
    description: 'It marks a railway crossing. It is placed immediately in front of the level crossing.',
    image: '/assets/signs/cz/A32b.png',
    color: 'yellow',
  },
  {
    id: 42,
    name: 'Zákaz vjezdu',
    czechName: 'Zákaz vjezdu všech vozidel',
    category: 'Zákazové',
    description: 'Entry prohibited for all vehicles',
    image: '/assets/signs/cz/zakaz_vjezdu_vsech_vozidel.png',
    color: 'red',
  },
];

const SignsList: React.FC = () => {
  const history = useHistory();
  const { colorMode, toggleColorMode } = useColorMode();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Vše');

  const categories = ['Vše', 'Příkazové', 'Výstražné', 'Zákazové', 'Informativní'];

  const filteredSigns = roadSigns.filter((sign) => {
    const matchesSearch = sign.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         sign.czechName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         sign.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Vše' || sign.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Příkazové': return 'red';
      case 'Výstražné': return 'yellow';
      case 'Zákazové': return 'red';
      case 'Informativní': return 'green';
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