# Preval test case

# auto_ident_upd_i m_simple.md

> Normalize > Expressions > Assignments > Compound > Auto ident upd i m simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
$((a *= b--));
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
$((a *= b--));
$(a, b);
`````

## Normalized

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpBinBothLhs = a;
const tmpPostUpdArgIdent = b;
b = b - 1;
const tmpBinBothRhs = tmpPostUpdArgIdent;
a = tmpBinBothLhs * tmpBinBothRhs;
let tmpCalleeParam = a;
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpSSA_a = a * 1;
$(tmpSSA_a);
$(tmpSSA_a, 0);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: NaN
 - 2: NaN, 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
