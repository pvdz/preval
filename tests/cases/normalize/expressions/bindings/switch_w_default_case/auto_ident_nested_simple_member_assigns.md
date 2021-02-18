# Preval test case

# auto_ident_nested_simple_member_assigns.md

> normalize > expressions > bindings > switch_w_default_case > auto_ident_nested_simple_member_assigns
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let b = { x: 1 },
      c = 3;

    let a = (b.x = b.x = b.x = b.x = b.x = b.x = c);
    $(a, b, c);
  default:
    $("fail1");
  case 2:
    $("fail2");
}
`````

## Normalized

`````js filename=intro
let b;
let c;
let varInitAssignLhsComputedRhs$5;
let varInitAssignLhsComputedRhs$4;
let varInitAssignLhsComputedRhs$3;
let varInitAssignLhsComputedRhs$2;
let varInitAssignLhsComputedRhs$1;
let varInitAssignLhsComputedRhs;
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
  b = { x: 1 };
  c = 3;
  varInitAssignLhsComputedRhs$5 = c;
  b.x = varInitAssignLhsComputedRhs$5;
  varInitAssignLhsComputedRhs$4 = varInitAssignLhsComputedRhs$5;
  b.x = varInitAssignLhsComputedRhs$4;
  varInitAssignLhsComputedRhs$3 = varInitAssignLhsComputedRhs$4;
  b.x = varInitAssignLhsComputedRhs$3;
  varInitAssignLhsComputedRhs$2 = varInitAssignLhsComputedRhs$3;
  b.x = varInitAssignLhsComputedRhs$2;
  varInitAssignLhsComputedRhs$1 = varInitAssignLhsComputedRhs$2;
  b.x = varInitAssignLhsComputedRhs$1;
  varInitAssignLhsComputedRhs = varInitAssignLhsComputedRhs$1;
  b.x = varInitAssignLhsComputedRhs;
  a = varInitAssignLhsComputedRhs;
  $(a, b, c);
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
const b = { x: 1 };
b.x = 3;
b.x = 3;
b.x = 3;
b.x = 3;
b.x = 3;
b.x = 3;
$(3, b, 3);
$('fail1');
$('fail2');
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 3, { x: '3' }, 3
 - 2: 'fail1'
 - 3: 'fail2'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
