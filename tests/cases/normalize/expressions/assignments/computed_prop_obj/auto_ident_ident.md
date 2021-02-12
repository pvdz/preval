# Preval test case

# auto_ident_ident.md

> normalize > expressions > assignments > computed_prop_obj > auto_ident_ident
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
let obj = {};
(a = b)["a"];
$(a, b);
`````

## Normalized

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
let obj = {};
let tmpCompObj;
a = b;
tmpCompObj = b;
tmpCompObj.a;
$(a, b);
`````

## Output

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
let obj = {};
let tmpCompObj;
a = b;
tmpCompObj = b;
tmpCompObj.a;
$(a, b);
`````

## Result

Should call `$` with:
 - 1: 1, 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
