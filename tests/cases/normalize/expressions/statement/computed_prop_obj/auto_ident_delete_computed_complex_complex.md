# Preval test case

# auto_ident_delete_computed_complex_complex.md

> normalize > expressions > statement > computed_prop_obj > auto_ident_delete_computed_complex_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
let obj = {};
(delete $(arg)[$("y")])["a"];
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
let obj = {};
const tmpDeleteCompObj = $(arg);
const tmpDeleteCompProp = $('y');
const tmpCompObj = delete tmpDeleteCompObj[tmpDeleteCompProp];
tmpCompObj.a;
$(a, arg);
`````

## Output

`````js filename=intro
const arg = { y: 1 };
const a = { a: 999, b: 1000 };
const obj = {};
const tmpDeleteCompObj = $(arg);
const tmpDeleteCompProp = $('y');
const tmpCompObj = delete tmpDeleteCompObj[tmpDeleteCompProp];
tmpCompObj.a;
$(a, arg);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { y: '1' }
 - 2: 'y'
 - 3: { a: '999', b: '1000' }, {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
