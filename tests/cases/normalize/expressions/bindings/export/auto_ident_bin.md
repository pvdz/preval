# Preval test case

# auto_ident_bin.md

> Normalize > Expressions > Bindings > Export > Auto ident bin
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
export let a = $(1) + $(2);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = $(1) + $(2);
export { a };
$(a);
`````

## Normalized


`````js filename=intro
const tmpBinBothLhs = $(1);
const tmpBinBothRhs = $(2);
let a = tmpBinBothLhs + tmpBinBothRhs;
export { a };
$(a);
`````

## Output


`````js filename=intro
const tmpBinBothLhs /*:unknown*/ = $(1);
const tmpBinBothRhs /*:unknown*/ = $(2);
const a /*:primitive*/ = tmpBinBothLhs + tmpBinBothRhs;
export { a };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 2 );
const c = a + b;
export { c as a };
$( c );
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
