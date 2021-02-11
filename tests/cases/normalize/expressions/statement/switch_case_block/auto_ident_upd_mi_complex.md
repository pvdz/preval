# Preval test case

# auto_ident_upd_mi_complex.md

> normalize > expressions > statement > switch_case_block > auto_ident_upd_mi_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case $(1): {
    --$($(b)).x;
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
        const tmpAssignMemLhsObj = tmpCallCallee(tmpCalleeParam);
        const tmpCompoundAssignLhs = tmpAssignMemLhsObj.x;
        const tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj;
        const tmpAssignMemRhs = tmpCompoundAssignLhs - 1;
        tmpAssignMemLhsObj$1.x = tmpAssignMemRhs;
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
 - 5: { a: '999', b: '1000' }, { x: '0' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
