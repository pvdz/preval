# Preval test case

# auto_base_assign_pattern_obj.md

> normalize > expressions > bindings > switch_w_default_case > auto_base_assign_pattern_obj
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let b = {};

    let a = ({ b } = $({ b: $(2) }));
    $(a, b);
  default:
    $("fail1");
  case 2:
    $("fail2");
}
`````

## Normalized

`````js filename=intro
let b;
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
  b = {};
  a = undefined;
  const tmpCallCallee = $;
  const tmpObjLitVal = $(2);
  const tmpCalleeParam = { b: tmpObjLitVal };
  const tmpNestedAssignObjPatternRhs = tmpCallCallee(tmpCalleeParam);
  b = tmpNestedAssignObjPatternRhs.b;
  a = tmpNestedAssignObjPatternRhs;
  $(a, b);
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
const tmpObjLitVal = $(2);
const tmpCalleeParam = { b: tmpObjLitVal };
const tmpNestedAssignObjPatternRhs = $(tmpCalleeParam);
const SSA_b$1 = tmpNestedAssignObjPatternRhs.b;
$(tmpNestedAssignObjPatternRhs, SSA_b$1);
$('fail1');
$('fail2');
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - 2: { b: '2' }
 - 3: { b: '2' }, 2
 - 4: 'fail1'
 - 5: 'fail2'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
