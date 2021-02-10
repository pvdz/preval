# Preval test case

# auto_ident_upd_pi_complex.md

> normalize > expressions > statement > switch_case_test > auto_ident_upd_pi_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case ++$($(b)).x:
}
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
const tmpSwitchTest = $(1);
tmpSwitchBreak: {
  let tmpFallthrough = false;
  let tmpIfTest = tmpFallthrough;
  if (tmpIfTest) {
  } else {
    const tmpBinBothLhs = tmpSwitchTest;
    let tmpBinBothRhs;
    const tmpCallCallee = $;
    const tmpCalleeParam = $(b);
    const tmpNestedAssignObj = tmpCallCallee(tmpCalleeParam);
    const tmpBinLhs = tmpNestedAssignObj.x;
    const tmpNestedPropCompoundComplexRhs = tmpBinLhs + 1;
    tmpNestedAssignObj.x = tmpNestedPropCompoundComplexRhs;
    tmpBinBothRhs = tmpNestedPropCompoundComplexRhs;
    tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
  }
  if (tmpIfTest) {
    tmpFallthrough = true;
  }
}
$(a, b);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: { x: '1' }
 - 3: { x: '1' }
 - 4: { a: '999', b: '1000' }, { x: '2' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
