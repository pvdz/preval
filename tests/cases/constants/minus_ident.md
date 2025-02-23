# Preval test case

# minus_ident.md

> Constants > Minus ident
>
> Negative idents that are not builtins should be treated as normal

## Input

`````js filename=intro
const x = $(5);
const y = -x;
const z = y;
$(z); // Should be inlined to y, not -5
`````

## Pre Normal


`````js filename=intro
const x = $(5);
const y = -x;
const z = y;
$(z);
`````

## Normalized


`````js filename=intro
const x = $(5);
const y = -x;
const z = y;
$(z);
`````

## Output


`````js filename=intro
const x /*:unknown*/ = $(5);
const y /*:number*/ = -x;
$(y);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 5 );
const b = -a;
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 5
 - 2: -5
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
