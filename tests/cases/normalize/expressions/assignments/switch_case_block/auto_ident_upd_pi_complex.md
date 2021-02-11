# Preval test case

# auto_ident_upd_pi_complex.md

> normalize > expressions > assignments > switch_case_block > auto_ident_upd_pi_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case $(1): {
    a = ++$($(b)).x;
  }
}
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
const tmpSwitchTest = $(1);
{
  let tmpFallthrough = false;
  let tmpIfTest = tmpFallthrough;
  if (tmpIfTest) {
  } else {
    const tmpBinBothLhs = tmpSwitchTest;
    const tmpBinBothRhs = $(1);
    tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
  }
  if (tmpIfTest) {
    {
      {
        const tmpCallCallee = $;
        const tmpCalleeParam = $(b);
        const tmpNestedAssignObj = tmpCallCallee(tmpCalleeParam);
        const tmpBinLhs = tmpNestedAssignObj.x;
        const tmpNestedPropCompoundComplexRhs = tmpBinLhs + 1;
        tmpNestedAssignObj.x = tmpNestedPropCompoundComplexRhs;
        a = tmpNestedPropCompoundComplexRhs;
      }
    }
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
 - 2: 1
 - 3: { x: '1' }
 - 4: { x: '1' }
 - 5: 2, { x: '2' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
