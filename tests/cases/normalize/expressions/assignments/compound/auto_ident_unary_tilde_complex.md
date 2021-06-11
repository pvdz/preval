# Preval test case

# auto_ident_unary_tilde_complex.md

> Normalize > Expressions > Assignments > Compound > Auto ident unary tilde complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a *= ~$(100)));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a *= ~$(100)));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpBinBothLhs = a;
const tmpUnaryArg = $(100);
const tmpBinBothRhs = ~tmpUnaryArg;
a = tmpBinBothLhs * tmpBinBothRhs;
let tmpCalleeParam = a;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const tmpUnaryArg = $(100);
const tmpBinBothRhs = ~tmpUnaryArg;
const a = { a: 999, b: 1000 };
const tmpClusterSSA_a = a * tmpBinBothRhs;
$(tmpClusterSSA_a);
$(tmpClusterSSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: NaN
 - 3: NaN
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
