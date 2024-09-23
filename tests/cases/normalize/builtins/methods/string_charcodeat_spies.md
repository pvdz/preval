# Preval test case

# string_charcodeat_spies.md

> Normalize > Builtins > Methods > String charcodeat spies
>
> Bug: was printing string as a var name

## Input

`````js filename=intro
const x = $spy('a');
"".charCodeAt(x);
`````

## Pre Normal


`````js filename=intro
const x = $spy(`a`);
``.charCodeAt(x);
`````

## Normalized


`````js filename=intro
const x = $spy(`a`);
``.charCodeAt(x);
`````

## Output


`````js filename=intro
const x = $spy(`a`);
``.charCodeAt(x);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $spy( "a" );
"".charCodeAt( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'Creating spy', 1, 1, ['a', 'a']
 - 2: '$spy[1].valueOf()', 'a'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
