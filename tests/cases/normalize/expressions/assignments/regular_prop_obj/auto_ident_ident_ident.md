# Preval test case

# auto_ident_ident_ident.md

> normalize > expressions > assignments > regular_prop_obj > auto_ident_ident_ident
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = 1,
  c = 2;

let a = { a: 999, b: 1000 };
let obj = {};
(a = b = 2).a;
$(a, b, c);
`````

## Normalized

`````js filename=intro
let b = 1;
let c = 2;
let a = { a: 999, b: 1000 };
let obj = {};
b = 2;
a = 2;
let tmpCompObj = a;
tmpCompObj.a;
$(a, b, c);
`````

## Output

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
b = 2;
a = 2;
const tmpCompObj = a;
tmpCompObj.a;
$(a, b, 2);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2, 2, 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
