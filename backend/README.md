<h1 align="center">Welcome to Chainlit 👋</h1>

## Build the wheel file

Update the [version file](backend/chainlit/version.py), if not with a chainlit version, then with a postfix version.
Updating this leads to the wheel file being installed over another wheel file with the same name in the verwaltungssprung repo.

Then build the wheel file with

```
cd backend
pnpm install --frozen-lockfile
pnpm run buildUi
uv build --wheel
```

The last command gives you something like

> Successfully built dist/vwschainlit-2.9.2.post1-py3-none-any.whl

Move this file to the verwaltungssprung repo and test.
