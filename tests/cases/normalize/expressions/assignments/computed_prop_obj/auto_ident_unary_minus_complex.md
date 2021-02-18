# Preval test case

# auto_ident_unary_minus_complex.md

> normalize > expressions > assignments > computed_prop_obj > auto_ident_unary_minus_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
(a = -$(100))["a"];
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
const tmpUnaryArg = $(100);
a = -tmpUnaryArg;
let tmpCompObj = a;
tmpCompObj.a;
$(a);
`````

## Output

`````js filename=intro
const tmpUnaryArg = $(100);
const SSA_a = -tmpUnaryArg;
SSA_a.a;
$(SSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: -100
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
