# Preval test case

# auto_ident_computed_complex_complex.md

> Normalize > Expressions > Bindings > Stmt global top > Auto ident computed complex complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

let a = $(b)[$("c")];
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = { c: 1 };
let a = $(b)[$(`c`)];
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 1 };
const tmpCompObj = $(b);
const tmpCompProp = $(`c`);
let a = tmpCompObj[tmpCompProp];
$(a, b);
`````

## Output

`````js filename=intro
const b = { c: 1 };
const tmpCompObj = $(b);
const tmpCompProp = $(`c`);
const a = tmpCompObj[tmpCompProp];
$(a, b);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { c: '1' }
 - 2: 'c'
 - 3: 1, { c: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
