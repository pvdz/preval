# Preval test case

# auto_ident_unary_tilde_complex.md

> normalize > expressions > assignments > computed_prop_prop > auto_ident_unary_tilde_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
obj[(a = ~$(100))];
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCompObj = obj;
const tmpUnaryArg = $(100);
a = ~tmpUnaryArg;
let tmpCompProp = a;
tmpCompObj[tmpCompProp];
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCompObj = obj;
const tmpUnaryArg = $(100);
a = ~tmpUnaryArg;
let tmpCompProp = a;
tmpCompObj[tmpCompProp];
$(a);
`````

## Result

Should call `$` with:
 - 1: 100
 - 2: -101
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same