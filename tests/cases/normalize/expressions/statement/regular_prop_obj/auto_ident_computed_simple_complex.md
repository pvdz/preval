# Preval test case

# auto_ident_computed_simple_complex.md

> normalize > expressions > statement > regular_prop_obj > auto_ident_computed_simple_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
let obj = {};
b[$("c")].a;
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCompObj$1 = b;
const tmpCompProp = $('c');
const tmpCompObj = tmpCompObj$1[tmpCompProp];
tmpCompObj.a;
$(a, b);
`````

## Output

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCompObj$1 = b;
const tmpCompProp = $('c');
const tmpCompObj = tmpCompObj$1[tmpCompProp];
tmpCompObj.a;
$(a, b);
`````

## Result

Should call `$` with:
 - 1: 'c'
 - 2: { a: '999', b: '1000' }, { c: '1' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same