# Preval test case

# inlining_exported_constant.md

> Export > Inlining exported constant
>
> The constant is redundant but is exported. We need to properly handle that.

## Input

`````js filename=intro
const a = $(1);
const b = a;
export { b };
$(a);
`````

## Pre Normal


`````js filename=intro
const a = $(1);
const b = a;
export { b };
$(a);
`````

## Normalized


`````js filename=intro
const a = $(1);
const b = a;
export { b };
$(a);
`````

## Output


`````js filename=intro
const a /*:unknown*/ = $(1);
const b /*:unknown*/ = a;
export { b };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
const b = a;
export { b as b };
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
