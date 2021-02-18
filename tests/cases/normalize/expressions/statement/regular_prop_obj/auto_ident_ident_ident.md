# Preval test case

# auto_ident_ident_ident.md

> normalize > expressions > statement > regular_prop_obj > auto_ident_ident_ident
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = 1,
  c = 2;

let a = { a: 999, b: 1000 };
let obj = {};
(b = 2).a;
$(a, b, c);
`````

## Normalized

`````js filename=intro
let b = 1;
let c = 2;
let a = { a: 999, b: 1000 };
let obj = {};
b = 2;
let tmpCompObj = b;
tmpCompObj.a;
$(a, b, c);
`````

## Output

`````js filename=intro
let b = 1;
const a = { a: 999, b: 1000 };
b = 2;
const tmpCompObj = b;
tmpCompObj.a;
$(a, b, 2);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { a: '999', b: '1000' }, 2, 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
