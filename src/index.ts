/**
 *  Copyright 2021 Carrie J Vrtis
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

import { ConfigSource, Interpret, Interpreter, SupportedEncoding } from 'technician';
import * as TOML from '@iarna/toml';

declare module 'technician' {
    export interface InterpretBuffer {
        /** 
         * Returns a JSON object representing the TOML contents of the buffer, or undefined if it does not contain valid TOML.
         * @param encoding The text encoding to use. Default `utf8`.
         */
        asTOML: (configSource: ConfigSource<Buffer>, encoding?: SupportedEncoding) => Interpreter<Buffer, TOML.JsonMap>;

        /** 
         * Returns a JSON object representing the TOML contents of the buffer, or a plaintext string if it does not contain valid TOML.
         * @param encoding The text encoding to use. Default `utf8`.
         */
        asStringOrTOML: (configSource: ConfigSource<Buffer>, encoding?: SupportedEncoding) => Interpreter<Buffer, TOML.JsonMap | string>;
    }

    export interface InterpretString {
        /** 
         * Returns a JSON object representing the TOML contents of the string, or undefined if it does not contain valid TOML.
         * @param encoding The text encoding to use. Default `utf8`.
         */
        asTOML: (configSource: ConfigSource<string>, encoding?: SupportedEncoding) => Interpreter<string, TOML.JsonMap>;

        /** 
         * Returns a JSON object representing the TOML contents of the string, or the plaintext string if it does not contain valid TOML.
         * @param encoding The text encoding to use. Default `utf8`.
         */
        asStringOrTOML: (configSource: ConfigSource<string>, encoding?: SupportedEncoding) => Interpreter<string, TOML.JsonMap | string>;
    }
}

Interpret.buffer.asTOML = (configSource, encoding = 'utf8') => {
    return new Interpreter(configSource, {
        async: async entity =>{
            const text = entity.value?.toString(encoding);
            try {
                return text ? await TOML.parse.async(text) : undefined;
            }
            catch(err) {
                return undefined;
            }
        },
        sync: entity =>{
            const text = entity.value?.toString(encoding);
            try {
                return text ? TOML.parse(text) : undefined;
            }
            catch(err) {
                return undefined;
            }
        }
    });
};

Interpret.buffer.asStringOrTOML = (configSource, encoding = 'utf8') => {
    return new Interpreter(configSource, {
        async: async entity =>{
            const text = entity.value?.toString(encoding);
            try {
                return text ? await TOML.parse.async(text) : undefined;
            }
            catch(err) {
                return text;
            }
        },
        sync: entity =>{
            const text = entity.value?.toString(encoding);
            try {
                return text ? TOML.parse(text) : undefined;
            }
            catch(err) {
                return text;
            }
        }
    });
}; 

Interpret.string.asTOML = configSource => {
    return new Interpreter(configSource, {
        async: async entity =>{
            try {
                return entity.value ? await TOML.parse.async(entity.value) : undefined;
            }
            catch(err) {
                return undefined;
            }
        },
        sync: entity =>{
            try {
                return entity.value ? TOML.parse(entity.value) : undefined;
            }
            catch(err) {
                return undefined;
            }
        }
    });
};

Interpret.string.asStringOrTOML = configSource => {
    return new Interpreter(configSource, {
        async: async entity =>{
            try {
                return entity.value ? await TOML.parse.async(entity.value) : undefined;
            }
            catch(err) {
                return entity.value;
            }
        },
        sync: entity =>{
            try {
                return entity.value ? TOML.parse(entity.value) : undefined;
            }
            catch(err) {
                return entity.value;
            }
        }
    });
}; 
