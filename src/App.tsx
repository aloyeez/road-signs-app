import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { ColorModeProvider } from '@chakra-ui/color-mode';
import Home from './pages/Home';
import About from './pages/About';
import Settings from './pages/Settings';
import SelectCountry from './pages/SelectCountry';
import Czechia from './pages/countries/Czechia';
import SignsListCZ from './pages/sign-list/SignsListCZ';
import FlashCardsCZ from './pages/flash-cards/FlashCardsCZ';
import QuizCZ from './pages/quizes/QuizCZ';
import TrueFalseCZ from './pages/quizes/TrueFalseCZ';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => (
  <ChakraProvider value={defaultSystem}>
    <ColorModeProvider>
      <IonApp>
        <IonReactRouter>
          <IonRouterOutlet>
            <Route exact path="/home">
              <Home />
            </Route>
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
            <Route path="/settings" component={Settings} />
            <Route path="/select-country" component={SelectCountry} />
            <Route path="/country/CZ/menu" component={Czechia} />
            <Route path="/about" component={About} />
            <Route path="/country/CZ/signs-list" component={SignsListCZ} />
            <Route path="/country/CZ/learn" component={FlashCardsCZ} />
            <Route path="/country/CZ/quiz" component={QuizCZ} />
            <Route path="/country/CZ/true-false" component={TrueFalseCZ} />
          </IonRouterOutlet>
        </IonReactRouter>
      </IonApp>
    </ColorModeProvider>
  </ChakraProvider>
);

export default App;