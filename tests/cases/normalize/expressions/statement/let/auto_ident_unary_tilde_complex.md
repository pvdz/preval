# Preval test case

# auto_ident_unary_tilde_complex.md

> Normalize > Expressions > Statement > Let > Auto ident unary tilde complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let xyz = ~$(100);
$(xyz);
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
let xyz = ~$(100);
$(xyz);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpUnaryArg = $(100);
let xyz = ~tmpUnaryArg;
$(xyz);
$(a);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpUnaryArg = $(100);
const xyz = ~tmpUnaryArg;
$(xyz);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: -101
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
