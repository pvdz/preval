# Preval test case

# string_includes_spies.md

> Normalize > Builtins > Methods > String includes spies
>
> Bug: was printing string as a var name

## Input

`````js filename=intro
const x = $spy('a');
const y = $spy('b');
"".includes(x, y);
`````

## Pre Normal


`````js filename=intro
const x = $spy(`a`);
const y = $spy(`b`);
``.includes(x, y);
`````

## Normalized


`````js filename=intro
const x = $spy(`a`);
const y = $spy(`b`);
``.includes(x, y);
`````

## Output


`````js filename=intro
const x /*:unknown*/ = $spy(`a`);
const y /*:unknown*/ = $spy(`b`);
``.includes(x, y);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $spy( "a" );
const b = $spy( "b" );
"".includes( a, b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'Creating spy', 1, 1, ['a', 'a']
 - 2: 'Creating spy', 2, 1, ['b', 'b']
 - 3: '$spy[1].toString()', 'a'
 - 4: '$spy[2].valueOf()', 'b'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

Todos triggered:
- type trackeed tricks can possibly support resolving the type for calling this builtin symbol: $string_includes