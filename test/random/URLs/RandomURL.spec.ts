import { assert } from "chai";
import * as sinon from "sinon";

import { unwrap, randoMinMax } from "@test/helpers";

import { AnyRandom } from "@testing/random/AnyRandom";
import { Scale } from "@testing/random/numbers/Scale";
import { CharacterSet } from "@testing/random/strings/CharacterSets";
import { RandomString } from "@testing/random/strings/RandomString";
import { RandomURL } from "@testing/random/URLs/RandomURL";
import { Arrays, RandomEnum } from "@testing/random/objects";
import { RandomUInt16 } from "@testing/random/numbers";
import { TOP_LEVEL_DOMAINS, SCHEMES } from "@testing/random/URLs";
import { stub } from "sinon";

describe("RandomURL", () => {
    describe("getFragment", () => {
        let stringStub;
        const randomString: string = "foo";
        beforeEach(() => {
            stringStub = sinon.stub(RandomString, "string").returns(randomString);
        });

        afterEach(() => {
            unwrap(RandomString.string);
        });

        it("getFragment - gets a random string between 5-8 characters, from the PATH_CHARS set", () => {
            const expected = "#" + randomString;

            const result = RandomURL["getFragment"]();

            assert(stringStub.calledOnce);
            assert(stringStub.calledWith(6, 8, RandomURL["PATH_CHARS"]));
            assert.equal(result, expected);
        });
    });

    describe("getQueryData", () => {
        let stub;
        const randomKey: string = "bar";
        const randomValue: string = "bar";
        beforeEach(() => {
            stub = sinon
                .stub(RandomString, "string")
                .onFirstCall()
                .returns(randomKey)
                .onSecondCall()
                .returns(randomValue);
        });

        afterEach(() => {
            unwrap(RandomString.string);
        });

        it("getQueryData - gets a random key=value string", () => {
            const expected = `${randomKey}=${randomValue}`;

            const result = RandomURL["getQueryData"]();

            sinon.assert.calledTwice(stub);
            sinon.assert.callOrder(
                stub.withArgs(6, 8, CharacterSet.LOWERCASE),
                stub.withArgs(6, 8, RandomURL["PATH_CHARS"])
            );
            assert.equal(result, expected);
        });
    });

    describe("getQuery", () => {
        let stub;
        const data: string[] = ["foo=bar", "what=what", "quid=quid"];
        beforeEach(() => {
            stub = sinon.stub(Arrays, "arrayOf").returns(data);
        });

        afterEach(() => {
            unwrap(Arrays.arrayOf);
        });

        it("getQuery - gets a random array of key=value pairs, and concatenates them into a single string", () => {
            const expected = `?foo=bar&what=what&quid=quid`;

            const result = RandomURL["getQuery"]();

            sinon.assert.calledOnce(stub);
            sinon.assert.calledWith(stub, RandomURL["getQueryData"], 1, 3);
            assert.equal(result, expected);
        });
    });

    describe("getPathSegment", () => {
        let stub;
        const expected: string = "bar";
        beforeEach(() => {
            stub = sinon.stub(RandomString, "string").returns(expected);
        });

        afterEach(() => {
            unwrap(RandomString.string);
        });

        it("getPathSegment - gets a random 6-8 character string from the PATH_CHARS list", () => {
            const result = RandomURL["getPathSegment"]();

            sinon.assert.calledOnce(stub);
            sinon.assert.calledWith(stub, 6, 8, RandomURL["PATH_CHARS"]);

            assert.equal(result, expected);
        });
    });

    describe("getPath", () => {
        let stub;
        const segments: string[] = ["foo", "bar", "baz"];
        beforeEach(() => {
            stub = sinon.stub(Arrays, "arrayOf").returns(segments);
        });

        afterEach(() => {
            unwrap(Arrays.arrayOf);
        });

        it("getPath - gets a random array of path segments, and concatenates them into a single string", () => {
            const expected = "/" + segments.join("/");

            const result = RandomURL["getPath"]();

            sinon.assert.calledOnce(stub);
            sinon.assert.calledWith(stub, RandomURL["getPathSegment"], 1, 3);
            assert.equal(result, expected);
        });
    });

    describe("getPort", () => {
        let stub;
        const expected: number = 42;
        beforeEach(() => {
            stub = sinon.stub(RandomUInt16, "next").returns(expected);
        });

        afterEach(() => {
            unwrap(RandomUInt16.next);
        });

        it("getPort - calls the wrapped method", () => {
            const result = RandomURL["getPort"]();

            sinon.assert.calledOnce(stub);
            sinon.assert.calledWith(stub, 0, 65535);

            assert.equal(result, expected);
        });
    });

    describe("getTopLevelDomain", () => {
        let stub;
        const expected: string = TOP_LEVEL_DOMAINS.COM;
        beforeEach(() => {
            stub = (<any>sinon.stub(RandomEnum, "enum")).returns(expected);
        });

        afterEach(() => {
            unwrap(RandomEnum.enum);
        });

        it("getTopLevelDomain - calls the wrapped method", () => {
            const result = RandomURL["getTopLevelDomain"]();

            sinon.assert.calledOnce(stub);
            sinon.assert.calledWith(stub, TOP_LEVEL_DOMAINS);

            assert.equal(result, expected);
        });
    });

    describe("getHostName", () => {
        let stub;
        const firstResponse = "foo";
        const secondResponse = "bar";
        const thirdResponse = "baz";
        beforeEach(() => {
            stub = sinon
                .stub(RandomString, "string")
                .onFirstCall()
                .returns(firstResponse)
                .onSecondCall()
                .returns(secondResponse)
                .onThirdCall()
                .returns(thirdResponse);
        });

        afterEach(() => {
            unwrap(RandomString.string);
        });

        it("getHostName - gets a random hostname", () => {
            const HOSTNAME_CHARS: string = CharacterSet.LOWERCASE + CharacterSet.NUMERIC + "-._";
            const expected = firstResponse + secondResponse + thirdResponse;

            const result = RandomURL["getHostName"]();

            sinon.assert.calledThrice(stub);
            sinon.assert.callOrder(
                stub.withArgs(1, 1, CharacterSet.LOWERCASE),
                stub.withArgs(10, 15, HOSTNAME_CHARS),
                stub.withArgs(1, 1, CharacterSet.LOWERCASE)
            );

            assert.equal(result, expected);
        });
    });

    describe("getAuthority", () => {
        let getHostName, getTopLevelDomain, getPort;
        const hostName = "foo";
        const topLevelDomain = "bar";
        const port = 42;
        beforeEach(() => {
            getHostName = sinon.stub(<any>RandomURL, "getHostName").returns(hostName);
            getTopLevelDomain = sinon
                .stub(<any>RandomURL, "getTopLevelDomain")
                .returns(topLevelDomain);
            getPort = sinon.stub(<any>RandomURL, "getPort").returns(port);
        });

        afterEach(() => {
            unwrap(RandomURL["getHostName"]);
            unwrap(RandomURL["getTopLevelDomain"]);
            unwrap(RandomURL["getPort"]);
        });

        it("getAuthority - given a `true` argument, concatenates a hostname, top-level domain, and a port", () => {
            const expected = hostName + "." + topLevelDomain + ":" + port.toString();

            const result = RandomURL["getAuthority"](true);

            assert(getHostName.withArgs().calledOnce);
            assert(getTopLevelDomain.withArgs().calledOnce);
            assert(getPort.withArgs().calledOnce);

            assert.equal(result, expected);
        });

        it("getAuthority - given a `false` argument, concatenates a hostname, and a top-level domain", () => {
            const expected = hostName + "." + topLevelDomain;

            const result = RandomURL["getAuthority"](false);

            assert(getHostName.withArgs().calledOnce);
            assert(getTopLevelDomain.withArgs().calledOnce);
            assert(getPort.withArgs().calledOnce);

            assert.equal(result, expected);
        });

        it("getAuthority - given no argument, concatenates a hostname, and a top-level domain", () => {
            const expected = hostName + "." + topLevelDomain;

            const result = RandomURL["getAuthority"]();

            assert(getHostName.withArgs().calledOnce);
            assert(getTopLevelDomain.withArgs().calledOnce);
            assert(getPort.withArgs().calledOnce);

            assert.equal(result, expected);
        });
    });

    describe("getScheme", () => {
        let stub;
        const expected: string = SCHEMES.HTTPS;
        beforeEach(() => {
            stub = (<any>sinon.stub(RandomEnum, "enum")).returns(expected);
        });

        afterEach(() => {
            unwrap(RandomEnum.enum);
        });

        it("getScheme - calls the wrapped method", () => {
            const result = RandomURL["getScheme"]();

            sinon.assert.calledOnce(stub);
            sinon.assert.calledWith(stub, SCHEMES);

            assert.equal(result, expected);
        });
    });

    describe("url", () => {
        let getScheme, getAuthority, getPath, getQuery, getFragment;
        const scheme = "https";
        const authority = "my-server.myDomain.com:9953";
        const path = "/path/to/resource";
        const query = "?$filter=state eq 'draft'&$top=1";
        const fragment = "#tell-me-more";

        beforeEach(() => {
            getScheme = sinon.stub(<any>RandomURL, "getScheme").returns(scheme);
            getAuthority = sinon.stub(<any>RandomURL, "getAuthority").returns(authority);
            getPath = sinon.stub(<any>RandomURL, "getPath").returns(path);
            getQuery = sinon.stub(<any>RandomURL, "getQuery").returns(query);
            getFragment = sinon.stub(<any>RandomURL, "getFragment").returns(fragment);
        });

        afterEach(() => {
            unwrap(RandomURL["getScheme"]);
            unwrap(RandomURL["getAuthority"]);
            unwrap(RandomURL["getPath"]);
            unwrap(RandomURL["getQuery"]);
            unwrap(RandomURL["getFragment"]);
        });

        it("url - given no arguments, returns a lowercased url of the form `<scheme>://<authority>/`", () => {
            const expected = (scheme + "://" + authority + "/").toLocaleLowerCase();

            const result = RandomURL.url();

            assert(getScheme.withArgs().calledOnce);
            assert(getAuthority.withArgs().calledOnce);
            sinon.assert.notCalled(getPath);
            sinon.assert.notCalled(getQuery);
            sinon.assert.notCalled(getFragment);

            assert.equal(result, expected);
        });

        [
            { p: 0, q: 0, f: 0, value: scheme + "://" + authority + "/" },
            { p: 0, q: 0, f: 1, value: scheme + "://" + authority + "/" + fragment },
            { p: 0, q: 1, f: 0, value: scheme + "://" + authority + "/" + query },
            { p: 0, q: 1, f: 1, value: scheme + "://" + authority + "/" + query + fragment },
            { p: 1, q: 0, f: 0, value: scheme + "://" + authority + path },
            { p: 1, q: 0, f: 1, value: scheme + "://" + authority + path + fragment },
            { p: 1, q: 1, f: 0, value: scheme + "://" + authority + path + query },
            { p: 1, q: 1, f: 1, value: scheme + "://" + authority + path + query + fragment },
        ].forEach(({ p, q, f, value }) => {
            it(`url - [${p == 1}, ${q == 1}, ${
                f == 1
            }] - returns a lowercased url of the proper form`, () => {
                const includePath = p == 1,
                    includeQuery = q == 1,
                    includeFragment = f == 1;

                const expected = value.toLocaleLowerCase();

                const result = RandomURL.url(includePath, includeQuery, includeFragment);

                sinon.assert.calledOnceWithExactly(getScheme);
                sinon.assert.calledOnceWithExactly(getAuthority);

                if (includePath) {
                    sinon.assert.calledOnceWithExactly(getPath);
                } else {
                    sinon.assert.notCalled(getPath);
                }

                if (includeQuery) {
                    sinon.assert.calledOnceWithExactly(getQuery);
                } else {
                    sinon.assert.notCalled(getQuery);
                }

                if (includeFragment) {
                    sinon.assert.calledOnceWithExactly(getFragment);
                } else {
                    sinon.assert.notCalled(getFragment);
                }

                assert.equal(result, expected);
            });
        });
    });
});
