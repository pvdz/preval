# Preval test case

# auto_ident_unary_minus_complex.md

> Normalize > Expressions > Assignments > Stmt global top > Auto ident unary minus complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
a = -$(100);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpUnaryArg = $(100);
a = -tmpUnaryArg;
$(a);
`````

## Output

`````js filename=intro
const tmpUnaryArg = $(100);
const SSA_a = -tmpUnaryArg;
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
