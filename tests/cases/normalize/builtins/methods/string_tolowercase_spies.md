# Preval test case

# string_tolowercase_spies.md

> Normalize > Builtins > Methods > String tolowercase spies
>
> Bug: was printing string as a var name

## Input

`````js filename=intro
const x = $spy('a');
const y = $spy('b');
"".toLowerCase(x, y);
`````

## Pre Normal


`````js filename=intro
const x = $spy(`a`);
const y = $spy(`b`);
``.toLowerCase(x, y);
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
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
