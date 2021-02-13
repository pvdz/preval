# Preval test case

# auto_ident_upd_ip_complex.md

> normalize > expressions > statement > switch_case_block > auto_ident_upd_ip_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case $(1): {
    $($(b)).x++;
  }
}
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
const tmpSwitchTest = $(1);
const tmpSwitchValue = tmpSwitchTest;
let tmpSwitchCaseToStart = 1;
const tmpBinLhs = $(1);
const tmpIfTest = tmpBinLhs === tmpSwitchValue;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
}
{
  const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
  if (tmpIfTest$1) {
    {
      const tmpCallCallee = $;
      const tmpCalleeParam = $(b);
      const tmpPostUpdArgObj = tmpCallCallee(tmpCalleeParam);
      const tmpPostUpdArgVal = tmpPostUpdArgObj.x;
      const tmpAssignMemLhsObj = tmpPostUpdArgObj;
      const tmpAssignMemRhs = tmpPostUpdArgVal + 1;
      tmpAssignMemLhsObj.x = tmpAssignMemRhs;
    }
  }
}
$(a, b);
`````

## Output

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
const tmpSwitchTest = $(1);
let tmpSwitchCaseToStart = 1;
const tmpBinLhs = $(1);
const tmpIfTest = tmpBinLhs === tmpSwitchTest;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
}
{
  const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
  if (tmpIfTest$1) {
    {
      const tmpCalleeParam = $(b);
      const tmpPostUpdArgObj = $(tmpCalleeParam);
      const tmpPostUpdArgVal = tmpPostUpdArgObj.x;
      const tmpAssignMemRhs = tmpPostUpdArgVal + 1;
      tmpPostUpdArgObj.x = tmpAssignMemRhs;
    }
  }
}
$(a, b);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: { x: '1' }
 - 4: { x: '1' }
 - 5: { a: '999', b: '1000' }, { x: '2' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
