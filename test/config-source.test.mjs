import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import assert from 'node:assert/strict';

const proxySource = readFileSync(new URL('../proxy.mjs', import.meta.url), 'utf-8');

test('运行时配置只依赖环境变量和默认值，不读取 config.json', () => {
  assert.equal(proxySource.includes('config.json'), false);
  assert.equal(proxySource.includes('readFileSync'), false);
  assert.equal(proxySource.includes('existsSync'), false);
});

test('容器运行配置通过 docker-compose 环境变量声明', () => {
  const composeSource = readFileSync(new URL('../docker-compose.yml', import.meta.url), 'utf-8');

  for (const key of ['PORT', 'HOST', 'CC_API_BASE', 'PROJECT_SLUG', 'LOG_LEVEL', 'CC_USE_PROVIDER_MODELS']) {
    assert.match(composeSource, new RegExp(`${key}:`));
  }
});
