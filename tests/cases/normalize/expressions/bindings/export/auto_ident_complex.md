# Preval test case

# auto_ident_complex.md

> Normalize > Expressions > Bindings > Export > Auto ident complex
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
let b = 1;

export let a = $(b);
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = 1;
let a = $(b);
export { a };
$(a, b);
`````

## Normalized


`````js filename=intro
let b = 1;
let a = $(b);
export { a };
$(a, b);
`````

## Output


`````js filename=intro
const a /*:unknown*/ = $(1);
export { a };
$(a, 1);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
export { a as a };
$( a, 1 );
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
