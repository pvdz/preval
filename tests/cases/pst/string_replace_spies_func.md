# Preval test case

# string_replace_spies_func.md

> Pst > String replace spies func
>
> Bug: was printing string as a var name

## Input

`````js filename=intro
const x = $('a');
const y = $spy('b');
"".replace(x, y);
`````

## Pre Normal


`````js filename=intro
const x = $(`a`);
const y = $spy(`b`);
``.replace(x, y);
`````

## Normalized


`````js filename=intro
const x = $(`a`);
const y = $spy(`b`);
``.replace(x, y);
`````

## Output


`````js filename=intro
const x /*:unknown*/ = $(`a`);
const y /*:unknown*/ = $spy(`b`);
``.replace(x, y);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( "a" );
const b = $spy( "b" );
"".replace( a, b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'a'
 - 2: 'Creating spy', 1, 1, ['b', 'b']
 - 3: '$spy[1].toString()', 'b'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
