# Preval test case

# auto_ident_unary_minus_complex.md

> Normalize > Expressions > Statement > Regular prop obj > Auto ident unary minus complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
(-$(100)).a;
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
(-$(100)).a;
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
const tmpUnaryArg = $(100);
const tmpCompObj = -tmpUnaryArg;
tmpCompObj.a;
$(a);
`````

## Output

`````js filename=intro
const tmpUnaryArg = $(100);
const tmpCompObj = -tmpUnaryArg;
tmpCompObj.a;
const a = { a: 999, b: 1000 };
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
