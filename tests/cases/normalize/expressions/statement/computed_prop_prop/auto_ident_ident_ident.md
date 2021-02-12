# Preval test case

# auto_ident_ident_ident.md

> normalize > expressions > statement > computed_prop_prop > auto_ident_ident_ident
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = 1,
  c = 2;

let a = { a: 999, b: 1000 };
let obj = {};
obj[(b = 2)];
$(a, b, c);
`````

## Normalized

`````js filename=intro
let b = 1;
let c = 2;
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCompObj = obj;
b = 2;
let tmpCompProp = b;
tmpCompObj[tmpCompProp];
$(a, b, c);
`````

## Output

`````js filename=intro
let b = 1;
let c = 2;
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCompObj = obj;
b = 2;
let tmpCompProp = b;
tmpCompObj[tmpCompProp];
$(a, b, c);
`````

## Result

Should call `$` with:
 - 1: { a: '999', b: '1000' }, 2, 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
