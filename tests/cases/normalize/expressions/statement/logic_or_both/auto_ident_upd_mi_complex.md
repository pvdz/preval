# Preval test case

# auto_ident_upd_mi_complex.md

> normalize > expressions > statement > logic_or_both > auto_ident_upd_mi_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
--$($(b)).x || --$($(b)).x;
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
let tmpIfTest;
const tmpCallCallee = $;
const tmpCalleeParam = $(b);
const tmpNestedAssignObj = tmpCallCallee(tmpCalleeParam);
const tmpBinLhs = tmpNestedAssignObj.x;
const tmpNestedPropCompoundComplexRhs = tmpBinLhs - 1;
tmpNestedAssignObj.x = tmpNestedPropCompoundComplexRhs;
tmpIfTest = tmpNestedPropCompoundComplexRhs;
if (tmpIfTest) {
} else {
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = $(b);
  const tmpAssignMemLhsObj = tmpCallCallee$1(tmpCalleeParam$1);
  const tmpCompoundAssignLhs = tmpAssignMemLhsObj.x;
  const tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj;
  const tmpAssignMemRhs = tmpCompoundAssignLhs - 1;
  tmpAssignMemLhsObj$1.x = tmpAssignMemRhs;
}
$(a, b);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: { x: '1' }
 - 3: { x: '0' }
 - 4: { x: '0' }
 - 5: { a: '999', b: '1000' }, { x: '-1' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
