# Preval test case

# auto_ident_delete_computed_simple_complex.md

> normalize > expressions > assignments > regular_prop_obj > auto_ident_delete_computed_simple_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
let obj = {};
(a = delete arg[$("y")]).a;
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
let obj = {};
const tmpDeleteCompObj = arg;
const tmpDeleteCompProp = $('y');
a = delete tmpDeleteCompObj[tmpDeleteCompProp];
let tmpCompObj = a;
tmpCompObj.a;
$(a, arg);
`````

## Output

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
let obj = {};
const tmpDeleteCompObj = arg;
const tmpDeleteCompProp = $('y');
a = delete tmpDeleteCompObj[tmpDeleteCompProp];
let tmpCompObj = a;
tmpCompObj.a;
$(a, arg);
`````

## Result

Should call `$` with:
 - 1: 'y'
 - 2: true, {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same