# Preval test case

# auto_ident_upd_mi_complex.md

> normalize > expressions > assignments > if > auto_ident_upd_mi_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
if ((a = --$($(b)).x));
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = $(b);
const tmpNestedAssignObj = tmpCallCallee(tmpCalleeParam);
const tmpBinLhs = tmpNestedAssignObj.x;
const tmpNestedPropCompoundComplexRhs = tmpBinLhs - 1;
tmpNestedAssignObj.x = tmpNestedPropCompoundComplexRhs;
a = tmpNestedPropCompoundComplexRhs;
let tmpIfTest = a;
$(a, b);
`````

## Output

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
const tmpCalleeParam = $(b);
const tmpNestedAssignObj = $(tmpCalleeParam);
const tmpBinLhs = tmpNestedAssignObj.x;
const tmpNestedPropCompoundComplexRhs = tmpBinLhs - 1;
tmpNestedAssignObj.x = tmpNestedPropCompoundComplexRhs;
a = tmpNestedPropCompoundComplexRhs;
let tmpIfTest = a;
$(a, b);
`````

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: { x: '1' }
 - 3: 0, { x: '0' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same