import React, { useEffect, useState } from 'react';
import { IonModal, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, IonIcon } from '@ionic/react';
import { closeOutline, openOutline } from 'ionicons/icons';
import { Box, VStack, HStack, Text, Image, Spinner, Badge } from '@chakra-ui/react';
import { useColorMode } from '@chakra-ui/color-mode';
import { BookOpen, ExternalLink } from 'lucide-react';
import { getCachedRoadSignInfo, WikipediaPage } from '../services/wikipediaService';
import { useTranslation } from '../hooks/useTranslation';

interface WikipediaModalProps {
  isOpen: boolean;
  onClose: () => void;
  signName: string;
  signCategory?: string;
}

export const WikipediaModal: React.FC<WikipediaModalProps> = ({ isOpen, onClose, signName, signCategory }) => {
  const { colorMode } = useColorMode();
  const { t } = useTranslation();
  const [wikiData, setWikiData] = useState<WikipediaPage | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && signName) {
      loadWikipediaData();
    }
  }, [isOpen, signName]);

  const loadWikipediaData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await getCachedRoadSignInfo(signName);

      if (data) {
        setWikiData(data);
      } else {
        setError('No Wikipedia information found for this sign.');
      }
    } catch (err) {
      setError('Failed to load Wikipedia data. Please try again.');
      console.error('Error loading Wikipedia data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const openInBrowser = () => {
    if (wikiData?.url) {
      window.open(wikiData.url, '_blank');
    }
  };

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose}>
      <IonHeader>
        <IonToolbar style={{ '--background': colorMode === 'light' ? '#ffffff' : '#2c1810' }}>
          <IonTitle>
            <HStack gap={2}>
              <BookOpen size={20} />
              <Text>Wikipedia Info</Text>
            </HStack>
          </IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={onClose}>
              <IonIcon icon={closeOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <Box
          minH="100%"
          bg={colorMode === 'light' ? '#faf8f5' : '#1a0f0a'}
          p={4}
        >
          <VStack gap={4} align="stretch">
            {/* Sign Name Header */}
            <Box
              p={4}
              borderRadius="xl"
              bg={colorMode === 'light' ? 'white' : '#2c1810'}
              borderWidth="1px"
              borderColor={colorMode === 'light' ? '#e8dcc8' : '#5d4037'}
            >
              <VStack gap={2} align="start">
                <Text fontSize="xl" fontWeight="bold" color={colorMode === 'light' ? '#3e2723' : '#d7ccc8'}>
                  {signName}
                </Text>
                {signCategory && (
                  <Badge
                    bg={colorMode === 'light' ? '#f5e6d3' : '#3e2723'}
                    color={colorMode === 'light' ? '#d4a574' : '#d4a574'}
                    fontSize="sm"
                  >
                    {signCategory}
                  </Badge>
                )}
              </VStack>
            </Box>

            {/* Loading State */}
            {isLoading && (
              <Box textAlign="center" py={8}>
                <VStack gap={3}>
                  <Spinner size="xl" color="blue.500" />
                  <Text color={colorMode === 'light' ? '#795548' : '#8d6e63'}>
                    Loading Wikipedia data...
                  </Text>
                </VStack>
              </Box>
            )}

            {/* Error State */}
            {error && !isLoading && (
              <Box
                p={6}
                borderRadius="xl"
                bg={colorMode === 'light' ? '#fff3e0' : '#3e2723'}
                borderWidth="1px"
                borderColor={colorMode === 'light' ? '#ffb74d' : '#ff9800'}
                textAlign="center"
              >
                <VStack gap={2}>
                  <Text fontSize="2xl">📚</Text>
                  <Text fontSize="md" fontWeight="bold" color={colorMode === 'light' ? '#e65100' : '#ffb74d'}>
                    {error}
                  </Text>
                  <Text fontSize="sm" color={colorMode === 'light' ? '#795548' : '#8d6e63'}>
                    Try searching for "{signName}" on Wikipedia manually.
                  </Text>
                </VStack>
              </Box>
            )}

            {/* Wikipedia Content */}
            {wikiData && !isLoading && (
              <VStack gap={4} align="stretch">
                {/* Thumbnail */}
                {wikiData.thumbnail && (
                  <Box
                    borderRadius="xl"
                    overflow="hidden"
                    borderWidth="1px"
                    borderColor={colorMode === 'light' ? '#e8dcc8' : '#5d4037'}
                  >
                    <Image
                      src={wikiData.thumbnail.source}
                      alt={wikiData.title}
                      w="100%"
                      maxH="200px"
                      objectFit="cover"
                    />
                  </Box>
                )}

                {/* Article Title */}
                <Box
                  p={4}
                  borderRadius="xl"
                  bg={colorMode === 'light' ? '#e3f2fd' : '#1e3a5f'}
                  borderWidth="1px"
                  borderColor={colorMode === 'light' ? '#90caf9' : '#1976d2'}
                >
                  <HStack gap={2}>
                    <BookOpen size={20} color={colorMode === 'light' ? '#1976d2' : '#90caf9'} />
                    <Text
                      fontSize="lg"
                      fontWeight="bold"
                      color={colorMode === 'light' ? '#1565c0' : '#90caf9'}
                    >
                      {wikiData.title}
                    </Text>
                  </HStack>
                </Box>

                {/* Article Extract */}
                <Box
                  p={5}
                  borderRadius="xl"
                  bg={colorMode === 'light' ? 'white' : '#2c1810'}
                  borderWidth="1px"
                  borderColor={colorMode === 'light' ? '#e8dcc8' : '#5d4037'}
                >
                  <Text
                    fontSize="md"
                    lineHeight="1.8"
                    color={colorMode === 'light' ? '#3e2723' : '#d7ccc8'}
                    whiteSpace="pre-wrap"
                  >
                    {wikiData.extract}
                  </Text>
                </Box>

                {/* Open in Browser Button */}
                <Box
                  as="button"
                  p={4}
                  borderRadius="xl"
                  bg={colorMode === 'light' ? '#2196f3' : '#1976d2'}
                  color="white"
                  _hover={{
                    bg: colorMode === 'light' ? '#1976d2' : '#1565c0',
                  }}
                  onClick={openInBrowser}
                  transition="all 0.2s"
                >
                  <HStack justify="center" gap={2}>
                    <ExternalLink size={20} />
                    <Text fontWeight="bold">Read Full Article on Wikipedia</Text>
                  </HStack>
                </Box>

                {/* Source Attribution */}
                <Box textAlign="center" py={2}>
                  <Text fontSize="xs" color={colorMode === 'light' ? '#9e9e9e' : '#757575'}>
                    Content from Wikipedia - The Free Encyclopedia
                  </Text>
                  <Text fontSize="xs" color={colorMode === 'light' ? '#9e9e9e' : '#757575'}>
                    Licensed under CC BY-SA 3.0
                  </Text>
                </Box>
              </VStack>
            )}
          </VStack>
        </Box>
      </IonContent>
    </IonModal>
  );
};
