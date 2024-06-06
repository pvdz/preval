# Preval test case

# auto_ident_array_complex.md

> Normalize > Expressions > Bindings > Export > Auto ident array complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
export let a = [$(1), 2, $(3)];
$(a);
`````

## Pre Normal


`````js filename=intro
let a = [$(1), 2, $(3)];
export { a };
$(a);
`````

## Normalized


`````js filename=intro
const tmpArrElement = $(1);
const tmpArrElement$1 = 2;
const tmpArrElement$3 = $(3);
let a = [tmpArrElement, tmpArrElement$1, tmpArrElement$3];
export { a };
$(a);
`````

## Output


`````js filename=intro
const tmpArrElement = $(1);
const tmpArrElement$3 = $(3);
const a = [tmpArrElement, 2, tmpArrElement$3];
export { a };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 3 );
const c = [ a, 2, b ];
export { c as a from "undefined"
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
