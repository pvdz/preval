# Preval test case

# not_used_as_prop.md

> Object literal > Static prop lookups > Not used as prop
>
> If we can statically resolve a property lookup, we should

## Input

`````js filename=intro
const o = {x: $(1)};
$(o);
`````

## Pre Normal


`````js filename=intro
const o = { x: $(1) };
$(o);
`````

## Normalized


`````js filename=intro
const tmpObjLitVal = $(1);
const o = { x: tmpObjLitVal };
$(o);
`````

## Output


`````js filename=intro
const tmpObjLitVal /*:unknown*/ = $(1);
const o /*:object*/ = { x: tmpObjLitVal };
$(o);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
const b = { x: a };
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: { x: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
