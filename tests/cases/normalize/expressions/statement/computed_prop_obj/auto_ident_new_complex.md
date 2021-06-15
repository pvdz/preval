# Preval test case

# auto_ident_new_complex.md

> Normalize > Expressions > Statement > Computed prop obj > Auto ident new complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
new ($($))(1)["a"];
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
new ($($))(1)[`a`];
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
const tmpNewCallee = $($);
const tmpCompObj = new tmpNewCallee(1);
tmpCompObj.a;
$(a);
`````

## Output

`````js filename=intro
const tmpNewCallee = $($);
const tmpCompObj = new tmpNewCallee(1);
tmpCompObj.a;
const a = { a: 999, b: 1000 };
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
