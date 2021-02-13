# Preval test case

# auto_ident_upd_mi_complex.md

> normalize > expressions > bindings > switch_case > auto_ident_upd_mi_complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let b = { x: 1 };

    let a = --$($(b)).x;
    $(a, b);
}
`````

## Normalized

`````js filename=intro
{
  let b;
  let tmpCallCallee;
  let tmpCalleeParam;
  let varInitAssignLhsComputedObj;
  let tmpBinLhs;
  let varInitAssignLhsComputedRhs;
  let a;
  const tmpSwitchValue = 1;
  let tmpSwitchCaseToStart = 1;
  const tmpIfTest = 1 === tmpSwitchValue;
  if (tmpIfTest) {
    tmpSwitchCaseToStart = 0;
  }
  {
    const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
    if (tmpIfTest$1) {
      b = { x: 1 };
      tmpCallCallee = $;
      tmpCalleeParam = $(b);
      varInitAssignLhsComputedObj = tmpCallCallee(tmpCalleeParam);
      tmpBinLhs = varInitAssignLhsComputedObj.x;
      varInitAssignLhsComputedRhs = tmpBinLhs - 1;
      varInitAssignLhsComputedObj.x = varInitAssignLhsComputedRhs;
      a = varInitAssignLhsComputedRhs;
      $(a, b);
    }
  }
}
`````

## Output

`````js filename=intro
{
  let b;
  let tmpCallCallee;
  let tmpCalleeParam;
  let varInitAssignLhsComputedObj;
  let tmpBinLhs;
  let varInitAssignLhsComputedRhs;
  let a;
  let tmpSwitchCaseToStart = 1;
  const tmpIfTest = 1 === 1;
  if (tmpIfTest) {
    tmpSwitchCaseToStart = 0;
  }
  {
    const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
    if (tmpIfTest$1) {
      b = { x: 1 };
      tmpCallCallee = $;
      tmpCalleeParam = $(b);
      varInitAssignLhsComputedObj = tmpCallCallee(tmpCalleeParam);
      tmpBinLhs = varInitAssignLhsComputedObj.x;
      varInitAssignLhsComputedRhs = tmpBinLhs - 1;
      varInitAssignLhsComputedObj.x = varInitAssignLhsComputedRhs;
      a = varInitAssignLhsComputedRhs;
      $(a, b);
    }
  }
}
`````

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: { x: '1' }
 - 3: 0, { x: '0' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same