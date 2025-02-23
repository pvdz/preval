# Preval test case

# write_to_binding.md

> Object literal > Static prop lookups > Write to binding
>
> If we can statically resolve a property lookup, we should

## Input

`````js filename=intro
let o = {x: $(1)};
o = {}
$(o.x);
`````

## Pre Normal


`````js filename=intro
let o = { x: $(1) };
o = {};
$(o.x);
`````

## Normalized


`````js filename=intro
const tmpObjLitVal = $(1);
let o = { x: tmpObjLitVal };
o = {};
const tmpCallCallee = $;
const tmpCalleeParam = o.x;
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
$(1);
const tmpCalleeParam /*:unknown*/ = $Object_prototype.x;
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
const a = $Object_prototype.x;
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
