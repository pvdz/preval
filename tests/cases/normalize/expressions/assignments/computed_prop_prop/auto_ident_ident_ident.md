# Preval test case

# auto_ident_ident_ident.md

> normalize > expressions > assignments > computed_prop_prop > auto_ident_ident_ident
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = 1,
  c = 2;

let a = { a: 999, b: 1000 };
let obj = {};
obj[(a = b = 2)];
$(a, b, c);
`````

## Normalized

`````js filename=intro
let b = 1;
let c = 2;
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCompObj = obj;
let tmpCompProp;
let tmpNestedComplexRhs;
b = 2;
tmpNestedComplexRhs = 2;
a = tmpNestedComplexRhs;
tmpCompProp = tmpNestedComplexRhs;
tmpCompObj[tmpCompProp];
$(a, b, c);
`````

## Output

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCompObj = obj;
let tmpCompProp;
let tmpNestedComplexRhs;
b = 2;
tmpNestedComplexRhs = 2;
a = tmpNestedComplexRhs;
tmpCompProp = tmpNestedComplexRhs;
tmpCompObj[tmpCompProp];
$(a, b, 2);
`````

## Result

Should call `$` with:
 - 1: 2, 2, 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
