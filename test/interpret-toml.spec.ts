import { expect } from 'chai';
import { Technician, Interpret, ConfigSource, ManualConfigSource } from 'technician';
import '../src';

const TEST_STR = `some = "toml"
contents = ["foo", "bar"]`;
const TEST_BUF = Buffer.from(TEST_STR);
const EXPECTED = {some: 'toml', contents: ['foo', 'bar']}

describe('interpret-toml', () => {

    describe('& Integration', () => {

        it('should interpret values returned by a Technician ConfigSource.', async () => {
            // Build and configure Technician
            const tech = new Technician(Interpret.buffer.asTOML(new ManualConfigSource({toml: TEST_BUF})));

            // Attempt a read through Technician
            const result = await tech.read('toml');

            // Assertions
            expect(result).to.deep.equal(EXPECTED);
        });

        it('should modify the Technician Interpret API', async () => {
            expect(Interpret.buffer.asTOML).to.not.equal(undefined);
            expect(Interpret.buffer.asStringOrTOML).to.not.equal(undefined);
            expect(Interpret.string.asTOML).to.not.equal(undefined);
            expect(Interpret.string.asStringOrTOML).to.not.equal(undefined);
        });

    });

    describe('> Unit', () => {

        describe('#buffer.asTOML', () => {

            it('should return an async interpreter that parses valid TOML.', async () => {
                // Build and configure a TOML interpreter
                const testInterpreter = Interpret.buffer.asTOML({
                    read: async () => TEST_BUF,
                    list: async () => ['toml']
                } as any as ConfigSource<Buffer>);
                const result = await testInterpreter.read('toml');

                // Assertions
                expect(result).to.deep.equal(EXPECTED);
            });

            it('should return an async interpreter that returns undefined for invalid TOML.', async () => {
                // Build and configure a TOML interpreter
                const testInterpreter = Interpret.buffer.asTOML({
                    read: async () => Buffer.from('nope'),
                    list: async () => ['toml']
                } as any as ConfigSource<Buffer>);
                const result = await testInterpreter.read('toml');

                // Assertions
                expect(result).to.deep.equal(undefined);
            });

            it('should return an async interpreter that returns undefined for undefined keys.', async () => {
                // Build and configure a TOML interpreter
                const testInterpreter = Interpret.buffer.asTOML({
                    read: async () => undefined,
                    list: async () => ['toml']
                } as any as ConfigSource<Buffer>);
                const result = await testInterpreter.read('nope');

                // Assertions
                expect(result).to.deep.equal(undefined);
            });

            it('should return a sync interpreter that parses valid TOML.', () => {
                // Build and configure a TOML interpreter
                const testInterpreter = Interpret.buffer.asTOML({
                    readSync: () => TEST_BUF,
                    listSync: () => ['toml']
                } as any as ConfigSource<Buffer>);
                const result = testInterpreter.readSync('toml');

                // Assertions
                expect(result).to.deep.equal(EXPECTED);
            });

            it('should return a sync interpreter that returns undefined for invalid TOML.', () => {
                // Build and configure a TOML interpreter
                const testInterpreter = Interpret.buffer.asTOML({
                    readSync: () => Buffer.from('nope'),
                    listSync: () => ['toml']
                } as any as ConfigSource<Buffer>);
                const result = testInterpreter.readSync('toml');

                // Assertions
                expect(result).to.deep.equal(undefined);
            });


            it('should return a sync interpreter that returns undefined for undefined keys.', () => {
                // Build and configure a TOML interpreter
                const testInterpreter = Interpret.buffer.asTOML({
                    readSync: () => undefined,
                    listSync: () => ['toml']
                } as any as ConfigSource<Buffer>);
                const result = testInterpreter.readSync('nope');

                // Assertions
                expect(result).to.deep.equal(undefined);
            });

        });

        describe('#buffer.asStringOrTOML', () => {

            it('should return an async interpreter that parses valid TOML.', async () => {
                // Build and configure a TOML interpreter
                const testInterpreter = Interpret.buffer.asStringOrTOML({
                    read: async () => TEST_BUF,
                    list: async () => ['toml']
                } as any as ConfigSource<Buffer>);
                const result = await testInterpreter.read('toml');

                // Assertions
                expect(result).to.deep.equal(EXPECTED);
            });

            it('should return an async interpreter that returns unparsed strings for invalid TOML.', async () => {
                // Build and configure a TOML interpreter
                const testInterpreter = Interpret.buffer.asStringOrTOML({
                    read: async () => Buffer.from('nope'),
                    list: async () => ['toml']
                } as any as ConfigSource<Buffer>);
                const result = await testInterpreter.read('toml');

                // Assertions
                expect(result).to.equal('nope');
            });

            it('should return an async interpreter that returns undefined for undefined keys.', async () => {
                // Build and configure a TOML interpreter
                const testInterpreter = Interpret.buffer.asStringOrTOML({
                    read: async () => undefined,
                    list: async () => ['toml']
                } as any as ConfigSource<Buffer>);
                const result = await testInterpreter.read('nope');

                // Assertions
                expect(result).to.deep.equal(undefined);
            });

            it('should return a sync interpreter that parses valid TOML.', () => {
                // Build and configure a TOML interpreter
                const testInterpreter = Interpret.buffer.asStringOrTOML({
                    readSync: () => TEST_BUF,
                    listSync: () => ['toml']
                } as any as ConfigSource<Buffer>);
                const result = testInterpreter.readSync('toml');

                // Assertions
                expect(result).to.deep.equal(EXPECTED);
            });

            it('should return a sync interpreter that returns unparsed strings for invalid TOML.', () => {
                // Build and configure a TOML interpreter
                const testInterpreter = Interpret.buffer.asStringOrTOML({
                    readSync: () => Buffer.from('nope'),
                    listSync: () => ['toml']
                } as any as ConfigSource<Buffer>);
                const result = testInterpreter.readSync('toml');

                // Assertions
                expect(result).to.equal('nope');
            });


            it('should return a sync interpreter that returns undefined for undefined keys.', () => {
                // Build and configure a TOML interpreter
                const testInterpreter = Interpret.buffer.asStringOrTOML({
                    readSync: () => undefined,
                    listSync: () => ['toml']
                } as any as ConfigSource<Buffer>);
                const result = testInterpreter.readSync('nope');

                // Assertions
                expect(result).to.deep.equal(undefined);
            });

        });

        describe('#string.asTOML', () => {

            it('should return an async interpreter that parses valid TOML.', async () => {
                // Build and configure a TOML interpreter
                const testInterpreter = Interpret.string.asTOML({
                    read: async () => TEST_STR,
                    list: async () => ['toml']
                } as any as ConfigSource<string>);
                const result = await testInterpreter.read('toml');

                // Assertions
                expect(result).to.deep.equal(EXPECTED);
            });

            it('should return an async interpreter that returns undefined for invalid TOML.', async () => {
                // Build and configure a TOML interpreter
                const testInterpreter = Interpret.string.asTOML({
                    read: async () => 'nope',
                    list: async () => ['toml']
                } as any as ConfigSource<string>);
                const result = await testInterpreter.read('toml');

                // Assertions
                expect(result).to.deep.equal(undefined);
            });

            it('should return an async interpreter that returns undefined for undefined keys.', async () => {
                // Build and configure a TOML interpreter
                const testInterpreter = Interpret.string.asTOML({
                    read: async () => undefined,
                    list: async () => ['toml']
                } as any as ConfigSource<string>);
                const result = await testInterpreter.read('nope');

                // Assertions
                expect(result).to.deep.equal(undefined);
            });

            it('should return a sync interpreter that parses valid TOML.', () => {
                // Build and configure a TOML interpreter
                const testInterpreter = Interpret.string.asTOML({
                    readSync: () => TEST_STR,
                    listSync: () => ['toml']
                } as any as ConfigSource<string>);
                const result = testInterpreter.readSync('toml');

                // Assertions
                expect(result).to.deep.equal(EXPECTED);
            });

            it('should return a sync interpreter that returns undefined for invalid TOML.', () => {
                // Build and configure a TOML interpreter
                const testInterpreter = Interpret.string.asTOML({
                    readSync: () => 'nope',
                    listSync: () => ['toml']
                } as any as ConfigSource<string>);
                const result = testInterpreter.readSync('toml');

                // Assertions
                expect(result).to.deep.equal(undefined);
            });


            it('should return a sync interpreter that returns undefined for undefined keys.', () => {
                // Build and configure a TOML interpreter
                const testInterpreter = Interpret.string.asTOML({
                    readSync: () => undefined,
                    listSync: () => ['toml']
                } as any as ConfigSource<string>);
                const result = testInterpreter.readSync('nope');

                // Assertions
                expect(result).to.deep.equal(undefined);
            });

        });

        describe('#string.asStringOrTOML', () => {

            it('should return an async interpreter that parses valid TOML.', async () => {
                // Build and configure a TOML interpreter
                const testInterpreter = Interpret.string.asStringOrTOML({
                    read: async () => TEST_STR,
                    list: async () => ['toml']
                } as any as ConfigSource<string>);
                const result = await testInterpreter.read('toml');

                // Assertions
                expect(result).to.deep.equal(EXPECTED);
            });

            it('should return an async interpreter that returns unparsed strings for invalid TOML.', async () => {
                // Build and configure a TOML interpreter
                const testInterpreter = Interpret.string.asStringOrTOML({
                    read: async () => 'nope',
                    list: async () => ['toml']
                } as any as ConfigSource<string>);
                const result = await testInterpreter.read('toml');

                // Assertions
                expect(result).to.equal('nope');
            });

            it('should return an async interpreter that returns undefined for undefined keys.', async () => {
                // Build and configure a TOML interpreter
                const testInterpreter = Interpret.string.asStringOrTOML({
                    read: async () => undefined,
                    list: async () => ['toml']
                } as any as ConfigSource<string>);
                const result = await testInterpreter.read('nope');

                // Assertions
                expect(result).to.deep.equal(undefined);
            });

            it('should return a sync interpreter that parses valid TOML.', () => {
                // Build and configure a TOML interpreter
                const testInterpreter = Interpret.string.asStringOrTOML({
                    readSync: () => TEST_STR,
                    listSync: () => ['toml']
                } as any as ConfigSource<string>);
                const result = testInterpreter.readSync('toml');

                // Assertions
                expect(result).to.deep.equal(EXPECTED);
            });

            it('should return a sync interpreter that returns unparsed strings for invalid TOML.', () => {
                // Build and configure a TOML interpreter
                const testInterpreter = Interpret.string.asStringOrTOML({
                    readSync: () => 'nope',
                    listSync: () => ['toml']
                } as any as ConfigSource<string>);
                const result = testInterpreter.readSync('toml');

                // Assertions
                expect(result).to.equal('nope');
            });


            it('should return a sync interpreter that returns undefined for undefined keys.', () => {
                // Build and configure a TOML interpreter
                const testInterpreter = Interpret.string.asStringOrTOML({
                    readSync: () => undefined,
                    listSync: () => ['toml']
                } as any as ConfigSource<string>);
                const result = testInterpreter.readSync('nope');

                // Assertions
                expect(result).to.deep.equal(undefined);
            });

        });
    });

});