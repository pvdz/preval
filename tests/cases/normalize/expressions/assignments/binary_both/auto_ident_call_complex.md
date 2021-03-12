# Preval test case

# auto_ident_call_complex.md

> Normalize > Expressions > Assignments > Binary both > Auto ident call complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = $($)(1)) + (a = $($)(1)));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = $($)(1)) + (a = $($)(1)));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCallCallee$1 = $($);
a = tmpCallCallee$1(1);
let tmpBinBothLhs = a;
const tmpCallCallee$2 = $($);
a = tmpCallCallee$2(1);
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const tmpCallCallee$1 = $($);
const SSA_a = tmpCallCallee$1(1);
const tmpCallCallee$2 = $($);
const SSA_a$1 = tmpCallCallee$2(1);
const tmpCalleeParam = SSA_a + SSA_a$1;
$(tmpCalleeParam);
$(SSA_a$1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - 3: '<$>'
 - 4: 1
 - 5: 2
 - 6: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
