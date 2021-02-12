# Preval test case

# auto_ident_delete_computed_complex_simple.md

> normalize > expressions > statement > computed_prop_obj > auto_ident_delete_computed_complex_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let x = { y: 1 };

let a = { a: 999, b: 1000 };
let obj = {};
(delete $(x)["y"])["a"];
$(a, x);
`````

## Normalized

`````js filename=intro
let x = { y: 1 };
let a = { a: 999, b: 1000 };
let obj = {};
const tmpDeleteCompObj = $(x);
const tmpDeleteCompProp = 'y';
const tmpCompObj = delete tmpDeleteCompObj[tmpDeleteCompProp];
tmpCompObj.a;
$(a, x);
`````

## Output

`````js filename=intro
let x = { y: 1 };
let a = { a: 999, b: 1000 };
let obj = {};
const tmpDeleteCompObj = $(x);
const tmpDeleteCompProp = 'y';
const tmpCompObj = delete tmpDeleteCompObj[tmpDeleteCompProp];
tmpCompObj.a;
$(a, x);
`````

## Result

Should call `$` with:
 - 1: { y: '1' }
 - 2: { a: '999', b: '1000' }, {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
