# Preval test case

# auto_ident_call_complex.md

> Normalize > Expressions > Bindings > Export > Auto ident call complex
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
export let a = $($)(1);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = $($)(1);
export { a };
$(a);
`````

## Normalized


`````js filename=intro
const tmpCallComplexCallee = $($);
let a = tmpCallComplexCallee(1);
export { a };
$(a);
`````

## Output


`````js filename=intro
const tmpCallComplexCallee /*:unknown*/ = $($);
const a /*:unknown*/ = tmpCallComplexCallee(1);
export { a };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( $ );
const b = a( 1 );
export { b as a };
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
