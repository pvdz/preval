# Preval test case

# unknown_init.md

> Const aliasing > Unknown init
>
>

## Input

`````js filename=intro
const x = $(1);
const y = x;
$(x, y);
`````

## Pre Normal


`````js filename=intro
const x = $(1);
const y = x;
$(x, y);
`````

## Normalized


`````js filename=intro
const x = $(1);
const y = x;
$(x, y);
`````

## Output


`````js filename=intro
const x /*:unknown*/ = $(1);
$(x, x);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
$( a, a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
