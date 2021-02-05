# Preval test case

# auto_ident_unary_complex.md

> normalize > expressions > assignments > computed_prop_obj > auto_ident_unary_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
let obj = {};
(a = typeof $(x))["a"];
$(a, x);
`````

## Normalized

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
let obj = {};
let tmpCompObj;
const tmpUnaryArg = $(x);
const tmpNestedComplexRhs = typeof tmpUnaryArg;
a = tmpNestedComplexRhs;
tmpCompObj = tmpNestedComplexRhs;
tmpCompObj.a;
$(a, x);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
({});
let tmpCompObj;
const tmpUnaryArg = $(1);
const tmpNestedComplexRhs = typeof tmpUnaryArg;
a = tmpNestedComplexRhs;
tmpCompObj = tmpNestedComplexRhs;
tmpCompObj.a;
$(a, 1);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 'number', 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
