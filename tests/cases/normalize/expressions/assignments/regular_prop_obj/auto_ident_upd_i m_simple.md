# Preval test case

# auto_ident_upd_i m_simple.md

> normalize > expressions > assignments > regular_prop_obj > auto_ident_upd_i m_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
let obj = {};
(a = b--).a;
$(a, b);
`````

## Normalized

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
let obj = {};
const tmpPostUpdArgIdent = b;
b = b - 1;
a = tmpPostUpdArgIdent;
let tmpCompObj = a;
tmpCompObj.a;
$(a, b);
`````

## Output

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
const obj = {};
const tmpPostUpdArgIdent = b;
b = b - 1;
a = tmpPostUpdArgIdent;
const tmpCompObj = a;
tmpCompObj.a;
$(a, b);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1, 0
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
