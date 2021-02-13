# Preval test case

# auto_ident_unary_typeof_complex.md

> normalize > expressions > statement > computed_prop_prop > auto_ident_unary_typeof_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
let obj = {};
obj[typeof $(arg)];
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCompObj = obj;
const tmpUnaryArg = $(arg);
const tmpCompProp = typeof tmpUnaryArg;
tmpCompObj[tmpCompProp];
$(a, arg);
`````

## Output

`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCompObj = obj;
const tmpUnaryArg = $(arg);
const tmpCompProp = typeof tmpUnaryArg;
tmpCompObj[tmpCompProp];
$(a, arg);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: { a: '999', b: '1000' }, 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
