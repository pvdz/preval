# Preval test case

# auto_ident_upd_pi_complex.md

> Normalize > Expressions > Assignments > Arr element > Auto ident upd pi complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
$((a = ++$($(b)).x) + (a = ++$($(b)).x));
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
$((a = ++$($(b)).x) + (a = ++$($(b)).x));
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = $(b);
const tmpNestedAssignObj = tmpCallCallee$1(tmpCalleeParam$1);
const tmpBinLhs = tmpNestedAssignObj.x;
const tmpNestedPropCompoundComplexRhs = tmpBinLhs + 1;
tmpNestedAssignObj.x = tmpNestedPropCompoundComplexRhs;
a = tmpNestedPropCompoundComplexRhs;
let tmpBinBothLhs = a;
const tmpCallCallee$3 = $;
const tmpCalleeParam$3 = $(b);
const tmpNestedAssignObj$1 = tmpCallCallee$3(tmpCalleeParam$3);
const tmpBinLhs$1 = tmpNestedAssignObj$1.x;
const tmpNestedPropCompoundComplexRhs$1 = tmpBinLhs$1 + 1;
tmpNestedAssignObj$1.x = tmpNestedPropCompoundComplexRhs$1;
a = tmpNestedPropCompoundComplexRhs$1;
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Output

`````js filename=intro
const b = { x: 1 };
const tmpCalleeParam$1 = $(b);
const tmpNestedAssignObj = $(tmpCalleeParam$1);
const tmpBinLhs = tmpNestedAssignObj.x;
const tmpNestedPropCompoundComplexRhs = tmpBinLhs + 1;
tmpNestedAssignObj.x = tmpNestedPropCompoundComplexRhs;
const tmpCalleeParam$3 = $(b);
const tmpNestedAssignObj$1 = $(tmpCalleeParam$3);
const tmpBinLhs$1 = tmpNestedAssignObj$1.x;
const tmpNestedPropCompoundComplexRhs$1 = tmpBinLhs$1 + 1;
tmpNestedAssignObj$1.x = tmpNestedPropCompoundComplexRhs$1;
const tmpCalleeParam = tmpNestedPropCompoundComplexRhs + tmpNestedPropCompoundComplexRhs$1;
$(tmpCalleeParam);
$(tmpNestedPropCompoundComplexRhs$1, b);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { x: 1 };
const b = $( a );
const c = $( b );
const d = c.x;
const e = d + 1;
c.x = e;
const f = $( a );
const g = $( f );
const h = g.x;
const i = h + 1;
g.x = i;
const j = e + i;
$( j );
$( i, a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: { x: '1' }
 - 3: { x: '2' }
 - 4: { x: '2' }
 - 5: 5
 - 6: 3, { x: '3' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
