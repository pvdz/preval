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
const tmpUnaryArg = $(x);
a = typeof tmpUnaryArg;
let tmpCompObj = a;
tmpCompObj.a;
$(a, x);
`````

## Output

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
let obj = {};
const tmpUnaryArg = $(x);
a = typeof tmpUnaryArg;
let tmpCompObj = a;
tmpCompObj.a;
$(a, x);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 'number', 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same