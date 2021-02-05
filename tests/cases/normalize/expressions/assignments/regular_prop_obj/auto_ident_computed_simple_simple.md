# Preval test case

# auto_ident_computed_simple_simple.md

> normalize > expressions > assignments > regular_prop_obj > auto_ident_computed_simple_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
let obj = {};
(a = b["c"]).a;
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
let obj = {};
let tmpCompObj;
const tmpNestedComplexRhs = b.c;
a = tmpNestedComplexRhs;
tmpCompObj = tmpNestedComplexRhs;
tmpCompObj.a;
$(a, b);
`````

## Output

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
({});
let tmpCompObj;
const tmpNestedComplexRhs = b.c;
a = tmpNestedComplexRhs;
tmpCompObj = tmpNestedComplexRhs;
tmpCompObj.a;
$(a, b);
`````

## Result

Should call `$` with:
 - 1: 1, { c: '1' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
