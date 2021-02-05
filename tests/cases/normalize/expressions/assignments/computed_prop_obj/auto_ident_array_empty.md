# Preval test case

# auto_ident_array_empty.md

> normalize > expressions > assignments > computed_prop_obj > auto_ident_array_empty
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
(a = [])["a"];
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
let tmpCompObj;
const tmpNestedComplexRhs = [];
a = tmpNestedComplexRhs;
tmpCompObj = tmpNestedComplexRhs;
tmpCompObj.a;
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
({});
let tmpCompObj;
const tmpNestedComplexRhs = [];
a = tmpNestedComplexRhs;
tmpCompObj = tmpNestedComplexRhs;
tmpCompObj.a;
$(a);
`````

## Result

Should call `$` with:
 - 1: []
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
