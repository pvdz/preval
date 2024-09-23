# Preval test case

# string_match_spies.md

> Normalize > Builtins > Methods > String match spies
>
> Bug: was printing string as a var name

## Input

`````js filename=intro
const x = $spy('a');
const y = $spy('b');
"".match(x, y);
`````

## Pre Normal


`````js filename=intro
const x = $spy(`a`);
const y = $spy(`b`);
``.match(x, y);
`````

## Normalized


`````js filename=intro
const x = $spy(`a`);
const y = $spy(`b`);
``.match(x, y);
`````

## Output


`````js filename=intro
const x = $spy(`a`);
const y = $spy(`b`);
``.match(x, y);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $spy( "a" );
const b = $spy( "b" );
"".match( a, b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'Creating spy', 1, 1, ['a', 'a']
 - 2: 'Creating spy', 2, 1, ['b', 'b']
 - 3: '$spy[1].toString()', 'a'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
