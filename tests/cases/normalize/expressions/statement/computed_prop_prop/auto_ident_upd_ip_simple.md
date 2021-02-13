# Preval test case

# auto_ident_upd_ip_simple.md

> normalize > expressions > statement > computed_prop_prop > auto_ident_upd_ip_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
let obj = {};
obj[b++];
$(a, b);
`````

## Normalized

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCompObj = obj;
const tmpPostUpdArgIdent = b;
b = b + 1;
const tmpCompProp = tmpPostUpdArgIdent;
tmpCompObj[tmpCompProp];
$(a, b);
`````

## Output

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
let obj = {};
const tmpPostUpdArgIdent = b;
b = b + 1;
obj[tmpPostUpdArgIdent];
$(a, b);
`````

## Result

Should call `$` with:
 - 1: { a: '999', b: '1000' }, 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
