# Preval test case

# auto_ident_upd_pi_simple.md

> normalize > expressions > statement > computed_prop_obj > auto_ident_upd_pi_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
let obj = {};
(++b)["a"];
$(a, b);
`````

## Normalized

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
let obj = {};
b = b + 1;
let tmpCompObj = b;
tmpCompObj.a;
$(a, b);
`````

## Output

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
let obj = {};
b = b + 1;
let tmpCompObj = b;
tmpCompObj.a;
$(a, b);
`````

## Result

Should call `$` with:
 - 1: { a: '999', b: '1000' }, 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
