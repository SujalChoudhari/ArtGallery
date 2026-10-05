#!/usr/bin/env bash
set -euo pipefail

if [[ $# -eq 0 ]]; then
  printf '%s\n' 'Usage: publish-artwork.sh --image <path> --title <title> [--thoughts <text>] (--featured|--not-featured) --publish' >&2
  exit 2
fi

script_dir=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)
repo_root=$(cd -- "$script_dir/../../.." && pwd)
cd "$repo_root"
exec npm run artwork:add -- "$@"
