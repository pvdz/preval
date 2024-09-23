# Preval test case

# number_tostring_spies.md

> Normalize > Builtins > Methods > Number tostring spies
>
> Bug: was printing string as a var name

## Input

`````js filename=intro
const x = $spy('a');
const y = $spy('b');
200..toString(x, y);
`````

## Pre Normal


`````js filename=intro
const x = $spy(`a`);
const y = $spy(`b`);
(200).toString(x, y);
`````

## Normalized


`````js filename=intro
const x = $spy(`a`);
const y = $spy(`b`);
`````

## Output


`````js filename=intro
$spy(`a`);
$spy(`b`);
`````

## PST Output

With rename=true

`````js filename=intro
$spy( "a" );
$spy( "b" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'Creating spy', 1, 1, ['a', 'a']
 - 2: 'Creating spy', 2, 1, ['b', 'b']
 - 3: '$spy[1].valueOf()', 'a'
 - eval returned: ('<crash[ toString() radix argument must be between 2 and 36 ]>')

Pre normalization calls: Same

Normalized calls: BAD!?
 - 1: 'Creating spy', 1, 1, ['a', 'a']
 - 2: 'Creating spy', 2, 1, ['b', 'b']
 - eval returned: undefined

Final output calls: BAD!!
 - 1: 'Creating spy', 1, 1, ['a', 'a']
 - 2: 'Creating spy', 2, 1, ['b', 'b']
 - eval returned: undefined
