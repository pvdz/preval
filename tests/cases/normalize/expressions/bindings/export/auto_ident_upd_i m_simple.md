# Preval test case

# auto_ident_upd_i m_simple.md

> Normalize > Expressions > Bindings > Export > Auto ident upd i m simple
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
let b = 1;

export let a = b--;
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = 1;
let a = b--;
export { a };
$(a, b);
`````

## Normalized


`````js filename=intro
let b = 1;
const tmpPostUpdArgIdent = b;
b = b - 1;
let a = tmpPostUpdArgIdent;
export { a };
$(a, b);
`````

## Output


`````js filename=intro
const a /*:number*/ = 1;
export { a };
$(1, 0);
`````

## PST Output

With rename=true

`````js filename=intro
const a = 1;
export { a as a };
$( 1, 0 );
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
