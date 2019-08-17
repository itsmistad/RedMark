# RedMark
The RedMark theme.

# Shopify Theme Kit

This branch runs on the [Shopify Theme Kit](https://shopify.github.io/themekit/).
This branch also requires [bash](https://git-scm.com/downloads), [node](https://nodejs.org/en/download/), and [choco](https://chocolatey.org/install) to function, so make sure to have those installed.

It is highly recommended you use this in conjunction with a [Shopify Partners](https://www.shopify.com/partners) store so that you can develop on an environment that is isolated from your live store.

To take full advantage of this theme, use the same plugins as found on [this spreadsheet](https://docs.google.com/spreadsheets/d/1uH1LK3mLPdQDSeOetnEQVv41eN-27GgdUSVzP5lXges/edit?usp=sharing).

## Configuration
In order to connect the kit to your shopify store(s), you need to modify your `config.yml`. An example file (`example.config.yml`) has been provided to show you the structure.

Use your real store for your `prod` credentials and your partner store for your `dev` credentials.

### Retrieving the Theme ID
> theme get --list -p=(your-password) -s=(your-store.myshopify.com)

This ID is required for your configuration.

## Installation
#### Installing Shopify Theme Kit
> choco install themekit

## Usage

**Be aware that deploying or using live preview will include your `settings_data.json` across environments!**

Before running any bash command, ensure that you are in the root of the repo.
Valid options for `environment`:
- `prod`
- `dev`

### Start Live Preview
> ./start.sh `environment`

This will watch and actively deploy any changes to your local source files. The deployment target is the store attached to the specified environment.

### Deploy to Environment
> ./deploy.sh `environment`

This will build and deploy your local source files to the appropriate environment. This is *not* necessary when in live preview.

### Pull from Environment
> ./get.sh `environment`

This will download your theme from the Shopify cloud and overwrite your local source files.
