export interface WikipediaSearchResult {
  title: string;
  pageid: number;
  snippet: string;
}

export interface WikipediaPage {
  title: string;
  pageid: number;
  extract: string;
  thumbnail?: {
    source: string;
    width: number;
    height: number;
  };
  url: string;
}

const WIKIPEDIA_API_BASE = 'https://en.wikipedia.org/w/api.php';

export const searchWikipedia = async (query: string): Promise<WikipediaSearchResult[]> => {
  try {
    const params = new URLSearchParams({
      action: 'query',
      list: 'search',
      srsearch: `${query} road sign traffic`,
      format: 'json',
      origin: '*',
      srlimit: '3',
    });

    const response = await fetch(`${WIKIPEDIA_API_BASE}?${params}`);
    const data = await response.json();

    if (data.query && data.query.search) {
      return data.query.search.map((result: any) => ({
        title: result.title,
        pageid: result.pageid,
        snippet: result.snippet.replace(/<[^>]*>/g, ''), 
      }));
    }

    return [];
  } catch (error) {
    console.error('Error searching Wikipedia:', error);
    return [];
  }
};

export const getWikipediaPage = async (pageId: number): Promise<WikipediaPage | null> => {
  try {
    const params = new URLSearchParams({
      action: 'query',
      pageids: pageId.toString(),
      prop: 'extracts|pageimages|info',
      exintro: 'true',
      explaintext: 'true',
      piprop: 'thumbnail',
      pithumbsize: '300',
      inprop: 'url',
      format: 'json',
      origin: '*',
    });

    const response = await fetch(`${WIKIPEDIA_API_BASE}?${params}`);
    const data = await response.json();

    if (data.query && data.query.pages) {
      const page = data.query.pages[pageId];

      if (page && !page.missing) {
        return {
          title: page.title,
          pageid: page.pageid,
          extract: page.extract || 'No description available.',
          thumbnail: page.thumbnail,
          url: page.fullurl || `https://en.wikipedia.org/?curid=${pageId}`,
        };
      }
    }

    return null;
  } catch (error) {
    console.error('Error fetching Wikipedia page:', error);
    return null;
  }
};

export const getWikipediaByTitle = async (title: string): Promise<WikipediaPage | null> => {
  try {
    const params = new URLSearchParams({
      action: 'query',
      titles: title,
      prop: 'extracts|pageimages|info',
      exintro: 'true',
      explaintext: 'true',
      piprop: 'thumbnail',
      pithumbsize: '300',
      inprop: 'url',
      format: 'json',
      origin: '*',
    });

    const response = await fetch(`${WIKIPEDIA_API_BASE}?${params}`);
    const data = await response.json();

    if (data.query && data.query.pages) {
      const pages = Object.values(data.query.pages) as any[];
      const page = pages[0];

      if (page && !page.missing) {
        return {
          title: page.title,
          pageid: page.pageid,
          extract: page.extract || 'No description available.',
          thumbnail: page.thumbnail,
          url: page.fullurl || `https://en.wikipedia.org/?curid=${page.pageid}`,
        };
      }
    }

    return null;
  } catch (error) {
    console.error('Error fetching Wikipedia page by title:', error);
    return null;
  }
};

export const getRoadSignInfo = async (signName: string): Promise<WikipediaPage | null> => {
  try {
    const directPage = await getWikipediaByTitle(`${signName} (road sign)`);
    if (directPage) {
      return directPage;
    }

    const searchResults = await searchWikipedia(signName);

    if (searchResults.length > 0) {
      const page = await getWikipediaPage(searchResults[0].pageid);
      return page;
    }

    return null;
  } catch (error) {
    console.error('Error getting road sign info:', error);
    return null;
  }
};

const wikiCache = new Map<string, WikipediaPage>();

export const getCachedRoadSignInfo = async (signName: string): Promise<WikipediaPage | null> => {
  const cacheKey = signName.toLowerCase();

  if (wikiCache.has(cacheKey)) {
    return wikiCache.get(cacheKey)!;
  }

  const result = await getRoadSignInfo(signName);

  if (result) {
    wikiCache.set(cacheKey, result);
  }

  return result;
};
