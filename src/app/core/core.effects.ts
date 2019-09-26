import { ObjectCacheEffects } from './cache/object-cache.effects';
import { IdentifierIndexEffects } from './index/index.effects';
import { RequestEffects } from './data/request.effects';
import { AuthEffects } from './auth/auth.effects';
import { JsonPatchOperationsEffects } from './json-patch/json-patch-operations.effects';
import { ServerSyncBufferEffects } from './cache/server-sync-buffer.effects';
import { ObjectUpdatesEffects } from './data/object-updates/object-updates.effects';
import { RouteEffects } from './services/route.effects';

export const coreEffects = [
  RequestEffects,
  ObjectCacheEffects,
  IdentifierIndexEffects,
  AuthEffects,
  JsonPatchOperationsEffects,
  ServerSyncBufferEffects,
  ObjectUpdatesEffects,
  RouteEffects
];
