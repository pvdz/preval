# Preval test case

# auto_ident_unary_tilde_complex.md

> Normalize > Expressions > Assignments > Binary both > Auto ident unary tilde complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = ~$(100)) + (a = ~$(100)));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = ~$(100)) + (a = ~$(100)));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpUnaryArg = $(100);
a = ~tmpUnaryArg;
let tmpBinBothLhs = a;
const tmpUnaryArg$1 = $(100);
a = ~tmpUnaryArg$1;
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const tmpUnaryArg = $(100);
const SSA_a = ~tmpUnaryArg;
const tmpUnaryArg$1 = $(100);
const SSA_a$1 = ~tmpUnaryArg$1;
const tmpCalleeParam = SSA_a + SSA_a$1;
$(tmpCalleeParam);
$(SSA_a$1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 100
 - 3: -202
 - 4: -101
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
