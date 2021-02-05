# Preval test case

# auto_ident_upd_pi_complex.md

> normalize > expressions > statement > tagged > auto_ident_upd_pi_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
$`before ${++$($(b)).x} after`;
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = ['before ', ' after'];
let tmpCalleeParam$1;
const tmpCallCallee$1 = $;
const tmpCalleeParam$2 = $(b);
const tmpNestedAssignObj = tmpCallCallee$1(tmpCalleeParam$2);
const tmpBinLhs = tmpNestedAssignObj.x;
const tmpNestedPropCompoundComplexRhs = tmpBinLhs + 1;
tmpNestedAssignObj.x = tmpNestedPropCompoundComplexRhs;
tmpCalleeParam$1 = tmpNestedPropCompoundComplexRhs;
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
$(a, b);
`````

## Output

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = ['before ', ' after'];
let tmpCalleeParam$1;
const tmpCallCallee$1 = $;
const tmpCalleeParam$2 = $(b);
const tmpNestedAssignObj = tmpCallCallee$1(tmpCalleeParam$2);
const tmpBinLhs = tmpNestedAssignObj.x;
const tmpNestedPropCompoundComplexRhs = tmpBinLhs + 1;
tmpNestedAssignObj.x = tmpNestedPropCompoundComplexRhs;
tmpCalleeParam$1 = tmpNestedPropCompoundComplexRhs;
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
$(a, b);
`````

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: { x: '1' }
 - 3: ['before ', ' after'], 2
 - 4: { a: '999', b: '1000' }, { x: '2' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
