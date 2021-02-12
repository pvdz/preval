# Preval test case

# auto_ident_unary_void_complex.md

> normalize > expressions > assignments > computed_prop_obj > auto_ident_unary_void_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
(a = void $(100))["a"];
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
let tmpCompObj;
$(100);
const tmpNestedComplexRhs = undefined;
a = tmpNestedComplexRhs;
tmpCompObj = tmpNestedComplexRhs;
tmpCompObj.a;
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
let tmpCompObj;
$(100);
a = undefined;
tmpCompObj = undefined;
tmpCompObj.a;
$(a);
`````

## Result

Should call `$` with:
 - 1: 100
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Normalized calls: Same

Final output calls: Same
