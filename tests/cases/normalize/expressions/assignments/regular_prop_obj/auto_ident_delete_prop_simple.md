# Preval test case

# auto_ident_delete_prop_simple.md

> normalize > expressions > assignments > regular_prop_obj > auto_ident_delete_prop_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let x = { y: 1 };

let a = { a: 999, b: 1000 };
let obj = {};
(a = delete x.y).a;
$(a, x);
`````

## Normalized

`````js filename=intro
let x = { y: 1 };
let a = { a: 999, b: 1000 };
let obj = {};
a = delete x.y;
let tmpCompObj = a;
tmpCompObj.a;
$(a, x);
`````

## Output

`````js filename=intro
let x = { y: 1 };
let a = { a: 999, b: 1000 };
let obj = {};
a = delete x.y;
let tmpCompObj = a;
tmpCompObj.a;
$(a, x);
`````

## Result

Should call `$` with:
 - 1: true, {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
