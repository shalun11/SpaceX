import '@mantine/core/styles.css';

import { Container, Loader, MantineProvider, SimpleGrid, Text, Title } from '@mantine/core';
import { LaunchCard } from './components/LaunchCard';
import { LaunchModal } from './components/LaunchModal';
import { useLaunches } from './hooks/useLaunches';

function LaunchesPage() {
  const { state, dispatch } = useLaunches();

  return (
    <Container size="sm" py="xl">
      <Title order={2} ta="center" mb="lg">
        SpaceX Launches 2020
      </Title>

      {state.status === 'loading' || state.status === 'idle' ? (
        <Loader display="block" style={{ margin: '0 auto' }} />
      ) : state.status === 'error' ? (
        <Text c="red" ta="center">
          Error: {state.error}
        </Text>
      ) : (
        <SimpleGrid cols={3}>
          {state.launches.map((launch) => (
            <LaunchCard
              key={launch.flight_number}
              launch={launch}
              onSeeMore={() => dispatch({ type: 'modal/open', payload: launch })}
            />
          ))}
        </SimpleGrid>
      )}

      {state.selectedLaunch && (
        <LaunchModal
          launch={state.selectedLaunch}
          onClose={() => dispatch({ type: 'modal/close' })}
        />
      )}
    </Container>
  );
}

export default function App() {
  return (
    <MantineProvider>
      <LaunchesPage />
    </MantineProvider>
  );
}