# Preval test case

# auto_ident_unary_minus_complex.md

> normalize > expressions > assignments > regular_prop_obj > auto_ident_unary_minus_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
(a = -$(100)).a;
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
let tmpCompObj;
const tmpUnaryArg = $(100);
const tmpNestedComplexRhs = -tmpUnaryArg;
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
const tmpUnaryArg = $(100);
const tmpNestedComplexRhs = -tmpUnaryArg;
a = tmpNestedComplexRhs;
tmpCompObj = tmpNestedComplexRhs;
tmpCompObj.a;
$(a);
`````

## Result

Should call `$` with:
 - 1: 100
 - 2: -100
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
