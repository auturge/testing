import { Arrays, RandomEnum } from "@testing/random/objects";
import { RandomString, CharacterSet } from "@testing/random/strings";
import { TOP_LEVEL_DOMAINS } from "@testing/random/URLs/TOP_LEVEL_DOMAINS";
import { SCHEMES } from "@testing/random/URLs/SCHEMES";
import { RandomUInt16 } from "@testing/random/numbers/RandomUInt16";

export abstract class RandomURL {
    private static readonly PATH_CHARS: string = CharacterSet.LOWERCASE + CharacterSet.NUMERIC;

    /** Returns a quasi-random URL, with an empty path, no query, and no fragment(s).
     * (valid per RFC-3986)
     * @see https://tools.ietf.org/html/rfc3986#section-3
     */
    public static url(): string;
    public static url(
        includePath: boolean,
        includeQuery: boolean,
        includeFragment: boolean
    ): string;
    public static url(includePath = false, includeQuery = false, includeFragment = false): string {
        // valid (per RFC-3986).  The range of this method is a strict subset of all valid URLs.
        // That is, this method will always produce a valid URL, but it will not produce all valid URLs.
        //
        // see https://en.wikipedia.org/wiki/Uniform_Resource_Identifier
        // and
        // see https://tools.ietf.org/html/rfc3986#section-3

        const scheme: string = this.getScheme();
        const authority: string = this.getAuthority();
        const path = includePath ? this.getPath() : "/";
        const query = includeQuery ? this.getQuery() : "";
        const fragment = includeFragment ? this.getFragment() : "";

        const url = scheme + "://" + authority + path + query + fragment;
        return url.toLocaleLowerCase();
    }

    private static getScheme(): string {
        return RandomEnum.enum(SCHEMES);
    }
    private static getAuthority(withPort: boolean = false): string {
        const hostname: string = this.getHostName();
        const topLevelDomain: string = this.getTopLevelDomain();
        const port: number = this.getPort();

        const authority = `${hostname}.${topLevelDomain}${withPort ? ":" + port.toString() : ""}`;

        return authority;
    }

    private static getHostName(): string {
        const HOSTNAME_CHARS: string = CharacterSet.LOWERCASE + CharacterSet.NUMERIC + "-._";

        const hostname: string =
            RandomString.string(1, 1, CharacterSet.LOWERCASE) +
            RandomString.string(10, 15, HOSTNAME_CHARS) +
            RandomString.string(1, 1, CharacterSet.LOWERCASE);
        return hostname;
    }

    private static getTopLevelDomain(): string {
        return RandomEnum.enum(TOP_LEVEL_DOMAINS);
    }

    private static getPort(): number {
        return RandomUInt16.next(0, 65535);
    }

    private static getPath(): string {
        let path = "/";

        const segments = Arrays.arrayOf(this.getPathSegment, 1, 3);
        path += segments.join("/");

        return path;
    }

    private static getPathSegment(): string {
        return RandomString.string(6, 8, this.PATH_CHARS);
    }

    private static getQuery(): string {
        let query = "?";

        const queries = Arrays.arrayOf(this.getQueryData, 1, 3);
        query += queries.join("&");

        return query;
    }

    private static getQueryData(): string {
        const key = RandomString.string(6, 8, CharacterSet.LOWERCASE);
        const value = RandomString.string(6, 8, this.PATH_CHARS);
        return `${key}=${value}`;
    }

    private static getFragment(): string {
        let fragment = "#";

        fragment += RandomString.string(6, 8, this.PATH_CHARS);

        return fragment;
    }
}
