# setup-react

GitHub Action to set up your workflow with a specific version of React.

## Usage

See [action.yml](action.yml)

```yaml
- uses: kirkeaton/setup-react@v2
  with:
    # The version of `react` to install.
    react-version: ''

    # The version of `react-dom` to install.
    react-dom-version: ''

    # (Optional) The version of `@types/react` to install.
    react-types-version: ''

    # (Optional) The version of `@types/react-dom` to install.
    react-dom-types-version: ''
```
