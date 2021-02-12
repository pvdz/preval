# Preval test case

# auto_ident_unary_complex.md

> normalize > expressions > statement > arr_spread > auto_ident_unary_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
[...typeof $(x)];
$(a, x);
`````

## Normalized

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
const tmpUnaryArg = $(x);
let tmpArrElToSpread = typeof tmpUnaryArg;
[...tmpArrElToSpread];
$(a, x);
`````

## Output

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
const tmpUnaryArg = $(x);
let tmpArrElToSpread = typeof tmpUnaryArg;
[...tmpArrElToSpread];
$(a, x);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: { a: '999', b: '1000' }, 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
