import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import type { Launch } from '../types/launch';

interface LaunchModalProps {
  launch: Launch;
  onClose: () => void;
}

const overlayStyle: React.CSSProperties = {
  position: 'fixed',
  inset: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
  padding: 16,
};

const panelStyle: React.CSSProperties = {
  backgroundColor: '#fff',
  borderRadius: 8,
  maxWidth: 480,
  width: '100%',
  maxHeight: '85vh',
  overflowY: 'auto',
  padding: 24,
  position: 'relative',
};

const closeButtonStyle: React.CSSProperties = {
  position: 'absolute',
  top: 12,
  right: 12,
  border: 'none',
  background: 'transparent',
  fontSize: 20,
  cursor: 'pointer',
  lineHeight: 1,
};

export function LaunchModal({ launch, onClose }: LaunchModalProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return createPortal(
    <div style={overlayStyle} onClick={onClose}>
      <div style={panelStyle} onClick={(event) => event.stopPropagation()}>
        <button type="button" style={closeButtonStyle} onClick={onClose} aria-label="Close">
          ×
        </button>

        <h3 style={{ marginTop: 0, marginBottom: 16 }}>{launch.mission_name ?? '—'}</h3>

        <img
          src={launch.links?.mission_patch ?? undefined}
          alt={launch.mission_name ?? 'Mission patch'}
          height={140}
          style={{ display: 'block', margin: '0 auto 16px' }}
        />

        <p style={{ margin: '8px 0' }}>
          <strong>Mission name:</strong>
          <br />
          <span style={{ color: '#666' }}>{launch.mission_name ?? '—'}</span>
        </p>

        <p style={{ margin: '8px 0' }}>
          <strong>Rocket name:</strong>
          <br />
          <span style={{ color: '#666' }}>{launch.rocket?.rocket_name ?? '—'}</span>
        </p>

        <p style={{ margin: '8px 0' }}>
          <strong>Details:</strong>
          <br />
          <span style={{ color: '#666' }}>{launch.details ?? '—'}</span>
        </p>
      </div>
    </div>,
    document.body,
  );
}