import { Button, Card, Text } from '@mantine/core';
import type { Launch } from '../types/launch';

interface LaunchCardProps {
  launch: Launch;
  onSeeMore: () => void;
}

export function LaunchCard({ launch, onSeeMore }: LaunchCardProps) {
  return (
    <Card shadow="sm" padding="md" radius="md" withBorder>
      <img
        src={launch.links?.mission_patch_small ?? undefined}
        alt={launch.mission_name ?? 'Mission patch'}
        height={90}
        style={{ display: 'block', margin: '0 auto' }}
      />
      <Text size="sm" ta="center" truncate="end" mt="md">
        {launch.mission_name ?? '—'}
      </Text>
      <Text size="xs" c="dimmed" ta="center" mt="xs">
        {launch.rocket?.rocket_name ?? '—'}
      </Text>
      <Button fullWidth mt="md" onClick={onSeeMore}>
        See more
      </Button>
    </Card>
  );
}