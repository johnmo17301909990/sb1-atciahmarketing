import { useCallback } from 'react';
import { useSyncStore } from '../stores/syncStore';
import { usePlatformSync } from './usePlatformSync';

export function useSync(platformId: string) {
  const { syncStatus } = useSyncStore();
  const { setSyncStatus, setLastSync, setSyncError, setSyncProgress } = useSyncStore();
  const { syncPlatform, cancelPlatformSync } = usePlatformSync();

  const status = syncStatus[platformId] || {
    status: 'idle',
    lastSync: null,
    error: null,
    progress: 0,
  };

  const startSync = useCallback(async () => {
    try {
      setSyncStatus(platformId, 'syncing');
      setSyncError(platformId, null);
      setSyncProgress(platformId, 0);

      const result = await syncPlatform(platformId);

      if (result.success) {
        setSyncStatus(platformId, 'success');
        setLastSync(platformId, new Date().toISOString());
      } else {
        setSyncStatus(platformId, 'error');
        setSyncError(platformId, result.message);
      }
    } catch (error) {
      setSyncStatus(platformId, 'error');
      setSyncError(platformId, error.message);
    }
  }, [platformId]);

  const cancelSync = useCallback(async () => {
    try {
      await cancelPlatformSync(platformId);
      setSyncStatus(platformId, 'idle');
    } catch (error) {
      setSyncError(platformId, error.message);
    }
  }, [platformId]);

  return {
    status: status.status,
    lastSync: status.lastSync,
    error: status.error,
    progress: status.progress,
    startSync,
    cancelSync,
  };
}