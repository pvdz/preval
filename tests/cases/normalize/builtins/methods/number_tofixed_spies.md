# Preval test case

# number_tofixed_spies.md

> Normalize > Builtins > Methods > Number tofixed spies
>
> Bug: was printing string as a var name

## Input

`````js filename=intro
const x = $spy('a');
const y = $spy('b');
200..toFixed(x, y);
`````

## Pre Normal


`````js filename=intro
const x = $spy(`a`);
const y = $spy(`b`);
(200).toFixed(x, y);
`````

## Normalized


`````js filename=intro
const x = $spy(`a`);
const y = $spy(`b`);
$coerce(x, `number`);
`````

## Output


`````js filename=intro
const x /*:unknown*/ = $spy(`a`);
$spy(`b`);
$coerce(x, `number`);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $spy( "a" );
$spy( "b" );
$coerce( a, "number" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'Creating spy', 1, 1, ['a', 'a']
 - 2: 'Creating spy', 2, 1, ['b', 'b']
 - 3: '$spy[1].valueOf()', 'a'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
