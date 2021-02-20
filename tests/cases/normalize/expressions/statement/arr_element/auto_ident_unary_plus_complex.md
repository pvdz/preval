# Preval test case

# auto_ident_unary_plus_complex.md

> Normalize > Expressions > Statement > Arr element > Auto ident unary plus complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
+$(100) + +$(100);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpUnaryArg = $(100);
const tmpBinBothLhs = +tmpUnaryArg;
const tmpUnaryArg$1 = $(100);
const tmpBinBothRhs = +tmpUnaryArg$1;
tmpBinBothLhs + tmpBinBothRhs;
$(a);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpUnaryArg = $(100);
const tmpBinBothLhs = +tmpUnaryArg;
const tmpUnaryArg$1 = $(100);
const tmpBinBothRhs = +tmpUnaryArg$1;
tmpBinBothLhs + tmpBinBothRhs;
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 100
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
