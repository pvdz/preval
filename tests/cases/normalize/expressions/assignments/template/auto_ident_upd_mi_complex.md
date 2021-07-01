# Preval test case

# auto_ident_upd_mi_complex.md

> Normalize > Expressions > Assignments > Template > Auto ident upd mi complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
$(`before  ${(a = --$($(b)).x)}  after`);
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
$(`before  ` + String((a = --$($(b)).x)) + `  after`);
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpBinBothLhs = `before  `;
const tmpCallCallee$1 = String;
const tmpCallCallee$3 = $;
const tmpCalleeParam$3 = $(b);
const tmpNestedAssignObj = tmpCallCallee$3(tmpCalleeParam$3);
const tmpBinLhs$1 = tmpNestedAssignObj.x;
const tmpNestedPropCompoundComplexRhs = tmpBinLhs$1 - 1;
tmpNestedAssignObj.x = tmpNestedPropCompoundComplexRhs;
a = tmpNestedPropCompoundComplexRhs;
let tmpCalleeParam$1 = a;
const tmpBinBothRhs = tmpCallCallee$1(tmpCalleeParam$1);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const tmpStringConcatR = tmpBinLhs + ``;
const tmpCalleeParam = `${tmpStringConcatR}  after`;
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Output

`````js filename=intro
const b = { x: 1 };
const tmpCalleeParam$3 = $(b);
const tmpNestedAssignObj = $(tmpCalleeParam$3);
const tmpBinLhs$1 = tmpNestedAssignObj.x;
const tmpNestedPropCompoundComplexRhs = tmpBinLhs$1 - 1;
tmpNestedAssignObj.x = tmpNestedPropCompoundComplexRhs;
const tmpBinBothRhs = String(tmpNestedPropCompoundComplexRhs);
const tmpCalleeParam = `before  ${tmpBinBothRhs}  after`;
$(tmpCalleeParam);
$(tmpNestedPropCompoundComplexRhs, b);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: { x: '1' }
 - 3: 'before 0 after'
 - 4: 0, { x: '0' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
