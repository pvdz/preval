# Preval test case

# auto_ident_unary_plus_complex.md

> Normalize > Expressions > Assignments > Binary left > Auto ident unary plus complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = +$(100)) + $(100));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpUnaryArg = $(100);
a = +tmpUnaryArg;
let tmpBinBothLhs = a;
const tmpBinBothRhs = $(100);
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const tmpUnaryArg = $(100);
const SSA_a = +tmpUnaryArg;
const tmpBinBothRhs = $(100);
const tmpCalleeParam = SSA_a + tmpBinBothRhs;
$(tmpCalleeParam);
$(SSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 100
 - 3: 200
 - 4: 100
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
