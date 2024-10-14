import { getInput, setOutput } from '@actions/core';
import { resolveCommand } from 'package-manager-detector/commands';
import { detect } from 'package-manager-detector/detect';
import { exec } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { promisify } from 'node:util';

const execAsync = promisify(exec);

/**
 * Sets up the requested version of React and React DOM
 * @returns
 */
export const setupReact = async (): Promise<boolean> => {
  // Inputs
  const reactVersion = getInput('react-version');
  const reactDomVersion = getInput('react-dom-version');
  const reactTypesVersion = getInput('react-types-version');
  const reactDomTypesVersion = getInput('react-dom-types-version');
  const packageManager = await detect();
  if (!packageManager) {
    throw new Error('Could not detect package manager');
  }

  const args = [`react@${reactVersion}`, `react-dom@${reactDomVersion}`];
  if (reactTypesVersion) {
    args.push(`@types/react@${reactTypesVersion}`);
  }
  if (reactDomTypesVersion) {
    args.push(`@types/react-dom@${reactDomTypesVersion}`);
  }

  const addCommand = resolveCommand(packageManager.agent, 'add', args);
  if (!addCommand) {
    throw new Error('Could not resolve install command');
  }

  const command = `${addCommand.command} ${addCommand.args.join(' ')}`;
  await execAsync(command);

  const pkgPath = resolve('package.json');
  const pkgContent = await readFile(pkgPath, 'utf-8');
  const pkgJson = JSON.parse(pkgContent);

  const deps = pkgJson.dependencies || {};
  const devDeps = pkgJson.devDependencies || {};

  // Outputs
  setOutput('react-version', deps['react'] || devDeps['react']);
  setOutput('react-dom-version', deps['react-dom'] || devDeps['react-dom']);
  setOutput(
    'react-types-version',
    deps['@types/react'] || devDeps['@types/react']
  );
  setOutput(
    'react-dom-types-version',
    deps['@types/react-dom'] || devDeps['@types/react-dom']
  );

  return true;
};
