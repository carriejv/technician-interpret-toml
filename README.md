# @technician/interpret-toml

[![npm version](https://img.shields.io/npm/v/@technician/interpret-toml.svg)](https://www.npmjs.com/package/@technician/interpret-toml) [![npm downloads](https://img.shields.io/npm/dt/@technician/interpret-toml)](https://www.npmjs.com/package/@technician/interpret-toml) [![npm license](https://img.shields.io/npm/l/@technician/interpret-toml.svg)](https://www.npmjs.com/package/@technician/interpret-toml)

[![dependencies](https://img.shields.io/david/carriejv/technician-interpret-toml.svg)](https://david-dm.org/carriejv/technician-interpret-toml) [![Build Status](https://github.com/carriejv/technician-interpret-toml/workflows/ci-build/badge.svg?branch=master)](https://github.com/carriejv/technician-interpret-toml/actions?query=workflow%3Aci-build) [![GitKraken](https://img.shields.io/badge/<3-GitKraken-green.svg)](https://www.gitkraken.com/invite/om4Du5zG)

This package provides extensions to the `Interpret` API of the [Technician](https://www.npmjs.com/package/technician) config manager aimed at supporting TOML files.

[![Technician](https://img.shields.io/npm/v/technician?label=technician)](https://www.npmjs.com/package/technician)

This package uses [@iarna/toml](https://www.npmjs.com/package/@iarna/toml) for TOML deserialization. Both async and sync operation is supported.

[![@iarna/toml](https://img.shields.io/npm/v/technician?label=@iarna/toml)](https://www.npmjs.com/package/@iarna/toml) 

## Installation

`npm i @technician/interpret-toml`

This package is compatible with Node 10 LTS and up.

## Usage Example

### Baisc usage
```ts
import { Technician, Interpret } from 'technician';
// Technician will automatically load the extensions in any file with the interpret-toml package imported.
import '@technician/interpret-toml';

const technician = new Technician(
    Interpret.string.asTOML(
        new ManualConfigSource({
            toml: 'key = value'
        })
    )
);

await technician.read('toml'); // {key: 'value'}
```

### Loading key/value pairs from a TOML file
```ts
import { Technician, Interpret, Uplevel } from 'technician';
import { FSConfigSource } from '@technician/source-fs';
import '@technician/interpret-toml';

const technician = new Technician(
    Uplevel.only('config.toml').on(
        Interpret.buffer.asTOML(
            new FSConfigSource('/opt/myapp/config') // key = value
        )
    )
);

await technician.read('key'); // value
```

An encoding type may be optionally specified as follows: `Interpret.buffer.asTOML(myConfigSource, 'ascii')`. Default is `utf-8`.

`asStringOrTOML` is also supported, which optionally parses only valid TOML but still returns invalid TOML as an unparsed string (similar to the behavior of Technician's `asStringOrJSON`).

## Contributions

Contributions and pull requests are always welcome. Please be sure your code passes all existing tests and linting.

Pull requests with full code coverage are strongly encouraged.

## License

[Apache-2.0](https://github.com/carriejv/technician/blob/master/LICENSE)