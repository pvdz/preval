# Preval test case

# auto_ident_upd_ip_complex.md

> normalize > expressions > bindings > switch_case > auto_ident_upd_ip_complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let b = { x: 1 };

    let a = $($(b)).x++;
    $(a, b);
}
`````

## Normalized

`````js filename=intro
let b;
let tmpCallCallee;
let tmpCalleeParam;
let tmpPostUpdArgObj;
let tmpPostUpdArgVal;
let a;
const tmpSwitchValue = 1;
let tmpSwitchCaseToStart = 1;
const tmpIfTest = 1 === tmpSwitchValue;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
}
const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
if (tmpIfTest$1) {
  b = { x: 1 };
  tmpCallCallee = $;
  tmpCalleeParam = $(b);
  tmpPostUpdArgObj = tmpCallCallee(tmpCalleeParam);
  tmpPostUpdArgVal = tmpPostUpdArgObj.x;
  const tmpAssignMemLhsObj = tmpPostUpdArgObj;
  const tmpAssignMemRhs = tmpPostUpdArgVal + 1;
  tmpAssignMemLhsObj.x = tmpAssignMemRhs;
  a = tmpPostUpdArgVal;
  $(a, b);
}
`````

## Output

`````js filename=intro
let tmpSwitchCaseToStart = 1;
tmpSwitchCaseToStart = 0;
const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
if (tmpIfTest$1) {
  const b = { x: 1 };
  const tmpCalleeParam = $(b);
  const tmpPostUpdArgObj = $(tmpCalleeParam);
  const tmpPostUpdArgVal = tmpPostUpdArgObj.x;
  const tmpAssignMemRhs = tmpPostUpdArgVal + 1;
  tmpPostUpdArgObj.x = tmpAssignMemRhs;
  $(tmpPostUpdArgVal, b);
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: { x: '1' }
 - 3: 1, { x: '2' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
