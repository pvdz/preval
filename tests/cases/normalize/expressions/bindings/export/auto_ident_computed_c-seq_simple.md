# Preval test case

# auto_ident_computed_c-seq_simple.md

> Normalize > Expressions > Bindings > Export > Auto ident computed c-seq simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

export let a = (1, 2, $(b))[$("c")];
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = { c: 1 };
let a = (1, 2, $(b))[$(`c`)];
export { a };
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 1 };
const tmpCompObj = $(b);
const tmpCompProp = $(`c`);
let a = tmpCompObj[tmpCompProp];
export { a };
$(a, b);
`````

## Output

`````js filename=intro
const b = { c: 1 };
const tmpCompObj = $(b);
const tmpCompProp = $(`c`);
const a = tmpCompObj[tmpCompProp];
export { a };
$(a, b);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { c: 1 };
const b = $( a );
const c = $( "c" );
const d = b[ c ];
export { d as a from "undefined"
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
