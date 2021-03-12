# Preval test case

# auto_ident_obj_pattern_assign.md

> Normalize > Expressions > Bindings > Switch w default case > Auto ident obj pattern assign
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let x = 1,
      y = 2;

    let a = ({ x, y } = { x: $(3), y: $(4) });
    $(a, x, y);
  default:
    $("fail1");
  case 2:
    $("fail2");
}
`````

## Pre Normal

`````js filename=intro
{
  let x;
  let y;
  let a;
  const tmpSwitchValue = 1;
  let tmpSwitchCaseToStart = 1;
  if (1 === tmpSwitchValue) tmpSwitchCaseToStart = 0;
  else if (2 === tmpSwitchValue) tmpSwitchCaseToStart = 2;
  else;
  tmpSwitchBreak: {
    if (tmpSwitchCaseToStart <= 0) {
      (x = 1), (y = 2);
      a = { x, y } = { x: $(3), y: $(4) };
      $(a, x, y);
    }
    if (tmpSwitchCaseToStart <= 1) {
      $('fail1');
    }
    if (tmpSwitchCaseToStart <= 2) {
      $('fail2');
    }
  }
}
`````

## Normalized

`````js filename=intro
let x;
let y;
let a;
const tmpSwitchValue = 1;
let tmpSwitchCaseToStart = 1;
const tmpIfTest = 1 === tmpSwitchValue;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
} else {
  const tmpIfTest$1 = 2 === tmpSwitchValue;
  if (tmpIfTest$1) {
    tmpSwitchCaseToStart = 2;
  }
}
const tmpIfTest$2 = tmpSwitchCaseToStart <= 0;
if (tmpIfTest$2) {
  x = 1;
  y = 2;
  const tmpObjLitVal = $(3);
  const tmpObjLitVal$1 = $(4);
  const tmpNestedAssignObjPatternRhs = { x: tmpObjLitVal, y: tmpObjLitVal$1 };
  x = tmpNestedAssignObjPatternRhs.x;
  y = tmpNestedAssignObjPatternRhs.y;
  a = tmpNestedAssignObjPatternRhs;
  $(a, x, y);
}
const tmpIfTest$3 = tmpSwitchCaseToStart <= 1;
if (tmpIfTest$3) {
  $('fail1');
}
const tmpIfTest$4 = tmpSwitchCaseToStart <= 2;
if (tmpIfTest$4) {
  $('fail2');
}
`````

## Output

`````js filename=intro
const tmpObjLitVal = $(3);
const tmpObjLitVal$1 = $(4);
const tmpNestedAssignObjPatternRhs = { x: tmpObjLitVal, y: tmpObjLitVal$1 };
const SSA_x$1 = tmpNestedAssignObjPatternRhs.x;
const SSA_y$1 = tmpNestedAssignObjPatternRhs.y;
$(tmpNestedAssignObjPatternRhs, SSA_x$1, SSA_y$1);
$('fail1');
$('fail2');
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 3
 - 2: 4
 - 3: { x: '3', y: '4' }, 3, 4
 - 4: 'fail1'
 - 5: 'fail2'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
