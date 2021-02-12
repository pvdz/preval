# Preval test case

# auto_ident_upd_mi_complex.md

> normalize > expressions > assignments > binary_both > auto_ident_upd_mi_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
$((a = --$($(b)).x) + (a = --$($(b)).x));
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpBinBothLhs;
let tmpNestedComplexRhs;
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = $(b);
const tmpNestedAssignObj = tmpCallCallee$1(tmpCalleeParam$1);
const tmpBinLhs = tmpNestedAssignObj.x;
const tmpNestedPropCompoundComplexRhs = tmpBinLhs - 1;
tmpNestedAssignObj.x = tmpNestedPropCompoundComplexRhs;
tmpNestedComplexRhs = tmpNestedPropCompoundComplexRhs;
a = tmpNestedComplexRhs;
tmpBinBothLhs = tmpNestedComplexRhs;
let tmpBinBothRhs;
let tmpNestedComplexRhs$1;
const tmpCallCallee$2 = $;
const tmpCalleeParam$2 = $(b);
const tmpNestedAssignObj$1 = tmpCallCallee$2(tmpCalleeParam$2);
const tmpBinLhs$1 = tmpNestedAssignObj$1.x;
const tmpNestedPropCompoundComplexRhs$1 = tmpBinLhs$1 - 1;
tmpNestedAssignObj$1.x = tmpNestedPropCompoundComplexRhs$1;
tmpNestedComplexRhs$1 = tmpNestedPropCompoundComplexRhs$1;
a = tmpNestedComplexRhs$1;
tmpBinBothRhs = tmpNestedComplexRhs$1;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Output

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpBinBothLhs;
let tmpNestedComplexRhs;
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = $(b);
const tmpNestedAssignObj = tmpCallCallee$1(tmpCalleeParam$1);
const tmpBinLhs = tmpNestedAssignObj.x;
const tmpNestedPropCompoundComplexRhs = tmpBinLhs - 1;
tmpNestedAssignObj.x = tmpNestedPropCompoundComplexRhs;
tmpNestedComplexRhs = tmpNestedPropCompoundComplexRhs;
a = tmpNestedComplexRhs;
tmpBinBothLhs = tmpNestedComplexRhs;
let tmpBinBothRhs;
let tmpNestedComplexRhs$1;
const tmpCallCallee$2 = $;
const tmpCalleeParam$2 = $(b);
const tmpNestedAssignObj$1 = tmpCallCallee$2(tmpCalleeParam$2);
const tmpBinLhs$1 = tmpNestedAssignObj$1.x;
const tmpNestedPropCompoundComplexRhs$1 = tmpBinLhs$1 - 1;
tmpNestedAssignObj$1.x = tmpNestedPropCompoundComplexRhs$1;
tmpNestedComplexRhs$1 = tmpNestedPropCompoundComplexRhs$1;
a = tmpNestedComplexRhs$1;
tmpBinBothRhs = tmpNestedComplexRhs$1;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: { x: '1' }
 - 3: { x: '0' }
 - 4: { x: '0' }
 - 5: -1
 - 6: -1, { x: '-1' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
