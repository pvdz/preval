# Preval test case

# auto_ident_unary_complex.md

> Normalize > Expressions > Assignments > Binary both > Auto ident unary complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
$((a = typeof $(x)) + (a = typeof $(x)));
$(a, x);
`````

## Pre Normal

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
$((a = typeof $(x)) + (a = typeof $(x)));
$(a, x);
`````

## Normalized

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpUnaryArg = $(x);
a = typeof tmpUnaryArg;
let tmpBinBothLhs = a;
const tmpUnaryArg$1 = $(x);
a = typeof tmpUnaryArg$1;
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a, x);
`````

## Output

`````js filename=intro
const tmpUnaryArg = $(1);
const SSA_a = typeof tmpUnaryArg;
const tmpUnaryArg$1 = $(1);
const SSA_a$1 = typeof tmpUnaryArg$1;
const tmpCalleeParam = SSA_a + SSA_a$1;
$(tmpCalleeParam);
$(SSA_a$1, 1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 'numbernumber'
 - 4: 'number', 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
