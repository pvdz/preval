# Preval test case

# auto_ident_unary_void_complex.md

> Normalize > Expressions > Bindings > Export > Auto ident unary void complex
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
export let a = void $(100);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = void $(100);
export { a };
$(a);
`````

## Normalized


`````js filename=intro
$(100);
let a = undefined;
export { a };
$(a);
`````

## Output


`````js filename=intro
$(100);
const a /*:undefined*/ = undefined;
export { a };
$(undefined);
`````

## PST Output

With rename=true

`````js filename=intro
$( 100 );
const a = undefined;
export { a as a };
$( undefined );
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
