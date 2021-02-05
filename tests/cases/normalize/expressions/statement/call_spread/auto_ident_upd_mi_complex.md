# Preval test case

# auto_ident_upd_mi_complex.md

> normalize > expressions > statement > call_spread > auto_ident_upd_mi_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
$(...--$($(b)).x);
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParamSpread;
const tmpCallCallee$1 = $;
const tmpCalleeParam = $(b);
const tmpNestedAssignObj = tmpCallCallee$1(tmpCalleeParam);
const tmpBinLhs = tmpNestedAssignObj.x;
const tmpNestedPropCompoundComplexRhs = tmpBinLhs - 1;
tmpNestedAssignObj.x = tmpNestedPropCompoundComplexRhs;
tmpCalleeParamSpread = tmpNestedPropCompoundComplexRhs;
tmpCallCallee(...tmpCalleeParamSpread);
$(a, b);
`````

## Output

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParamSpread;
const tmpCallCallee$1 = $;
const tmpCalleeParam = $(b);
const tmpNestedAssignObj = tmpCallCallee$1(tmpCalleeParam);
const tmpBinLhs = tmpNestedAssignObj.x;
const tmpNestedPropCompoundComplexRhs = tmpBinLhs - 1;
tmpNestedAssignObj.x = tmpNestedPropCompoundComplexRhs;
tmpCalleeParamSpread = tmpNestedPropCompoundComplexRhs;
tmpCallCallee(...tmpCalleeParamSpread);
$(a, b);
`````

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: { x: '1' }
 - eval returned: ('<crash[ Found non-callable @@iterator ]>')

Normalized calls: Same

Final output calls: Same
