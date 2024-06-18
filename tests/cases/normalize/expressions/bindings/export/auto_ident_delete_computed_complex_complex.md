# Preval test case

# auto_ident_delete_computed_complex_complex.md

> Normalize > Expressions > Bindings > Export > Auto ident delete computed complex complex
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
let arg = { y: 1 };

export let a = delete $(arg)[$("y")];
$(a, arg);
`````

## Pre Normal


`````js filename=intro
let arg = { y: 1 };
let a = delete $(arg)[$(`y`)];
export { a };
$(a, arg);
`````

## Normalized


`````js filename=intro
let arg = { y: 1 };
const tmpDeleteCompObj = $(arg);
const tmpDeleteCompProp = $(`y`);
let a = delete tmpDeleteCompObj[tmpDeleteCompProp];
export { a };
$(a, arg);
`````

## Output


`````js filename=intro
const arg = { y: 1 };
const tmpDeleteCompObj = $(arg);
const tmpDeleteCompProp = $(`y`);
const a = delete tmpDeleteCompObj[tmpDeleteCompProp];
export { a };
$(a, arg);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { y: 1 };
const b = $( a );
const c = $( "y" );
const d = delete b[ c ];
export { d as a };
$( d, a );
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
