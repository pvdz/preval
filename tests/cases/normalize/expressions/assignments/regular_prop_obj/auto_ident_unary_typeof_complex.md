# Preval test case

# auto_ident_unary_typeof_complex.md

> Normalize > Expressions > Assignments > Regular prop obj > Auto ident unary typeof complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
let obj = {};
(a = typeof $(arg)).a;
$(a, arg);
`````

## Pre Normal

`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
let obj = {};
(a = typeof $(arg)).a;
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
const tmpUnaryArg = $(1);
const SSA_a = typeof tmpUnaryArg;
SSA_a.a;
$(SSA_a, 1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 'number', 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
