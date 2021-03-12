# Preval test case

# auto_ident_func_id.md

> Normalize > Expressions > Bindings > Switch case > Auto ident func id
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let a = function f() {};
    $(a);
}
`````

## Pre Normal

`````js filename=intro
{
  let a;
  const tmpSwitchValue = 1;
  let tmpSwitchCaseToStart = 1;
  if (1 === tmpSwitchValue) tmpSwitchCaseToStart = 0;
  else;
  tmpSwitchBreak: {
    if (tmpSwitchCaseToStart <= 0) {
      a = function f() {};
      $(a);
    }
  }
}
`````

## Normalized

`````js filename=intro
let a;
const tmpSwitchValue = 1;
let tmpSwitchCaseToStart = 1;
const tmpIfTest = 1 === tmpSwitchValue;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
}
const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
if (tmpIfTest$1) {
  a = function f() {};
  $(a);
}
`````

## Output

`````js filename=intro
const a = function f() {};
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
