# Preval test case

# auto_ident_unary_typeof_complex.md

> normalize > expressions > assignments > computed_prop_obj > auto_ident_unary_typeof_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
let obj = {};
(a = typeof $(arg))["a"];
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
let obj = {};
const tmpUnaryArg = $(arg);
a = typeof tmpUnaryArg;
let tmpCompObj = a;
tmpCompObj.a;
$(a, arg);
`````

## Output

`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
let obj = {};
const tmpUnaryArg = $(arg);
a = typeof tmpUnaryArg;
let tmpCompObj = a;
tmpCompObj.a;
$(a, arg);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 'number', 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same