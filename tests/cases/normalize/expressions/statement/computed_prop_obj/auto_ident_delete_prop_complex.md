# Preval test case

# auto_ident_delete_prop_complex.md

> normalize > expressions > statement > computed_prop_obj > auto_ident_delete_prop_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
let obj = {};
(delete $(arg).y)["a"];
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
let obj = {};
const tmpDeleteObj = $(arg);
const tmpCompObj = delete tmpDeleteObj.y;
tmpCompObj.a;
$(a, arg);
`````

## Output

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
let obj = {};
const tmpDeleteObj = $(arg);
const tmpCompObj = delete tmpDeleteObj.y;
tmpCompObj.a;
$(a, arg);
`````

## Result

Should call `$` with:
 - 1: { y: '1' }
 - 2: { a: '999', b: '1000' }, {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same