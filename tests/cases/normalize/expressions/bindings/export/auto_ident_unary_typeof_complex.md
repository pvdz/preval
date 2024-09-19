# Preval test case

# auto_ident_unary_typeof_complex.md

> Normalize > Expressions > Bindings > Export > Auto ident unary typeof complex
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
let arg = 1;

export let a = typeof $(arg);
$(a, arg);
`````

## Pre Normal


`````js filename=intro
let arg = 1;
let a = typeof $(arg);
export { a };
$(a, arg);
`````

## Normalized


`````js filename=intro
let arg = 1;
const tmpUnaryArg = $(arg);
let a = typeof tmpUnaryArg;
export { a };
$(a, arg);
`````

## Output


`````js filename=intro
const tmpUnaryArg = $(1);
const a /*:string*/ = typeof tmpUnaryArg;
export { a };
$(a, 1);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
const b = typeof a;
export { b as a };
$( b, 1 );
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
