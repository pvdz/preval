# Preval test case

# auto_ident_delete_computed_simple_simple.md

> normalize > expressions > assignments > computed_prop_prop > auto_ident_delete_computed_simple_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let x = { y: 1 };

let a = { a: 999, b: 1000 };
let obj = {};
obj[(a = delete x["y"])];
$(a, x);
`````

## Normalized

`````js filename=intro
let x = { y: 1 };
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCompObj = obj;
let tmpCompProp;
const tmpNestedComplexRhs = delete x['y'];
a = tmpNestedComplexRhs;
tmpCompProp = tmpNestedComplexRhs;
tmpCompObj[tmpCompProp];
$(a, x);
`````

## Output

`````js filename=intro
let x = { y: 1 };
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCompObj = obj;
let tmpCompProp;
const tmpNestedComplexRhs = delete x.y;
a = tmpNestedComplexRhs;
tmpCompProp = tmpNestedComplexRhs;
tmpCompObj[tmpCompProp];
$(a, x);
`````

## Result

Should call `$` with:
 - 1: true, {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
