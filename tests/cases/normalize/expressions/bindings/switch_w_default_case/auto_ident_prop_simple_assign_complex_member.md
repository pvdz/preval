# Preval test case

# auto_ident_prop_simple_assign_complex_member.md

> Normalize > Expressions > Bindings > Switch w default case > Auto ident prop simple assign complex member
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let b = { c: 10, d: 20 };

    let a = (b.c = $(b)[$("d")]);
    $(a, b);
  default:
    $("fail1");
  case 2:
    $("fail2");
}
`````

## Pre Normal

`````js filename=intro
{
  let b;
  let a;
  const tmpSwitchValue = 1;
  let tmpSwitchCaseToStart = 1;
  if (1 === tmpSwitchValue) tmpSwitchCaseToStart = 0;
  else if (2 === tmpSwitchValue) tmpSwitchCaseToStart = 2;
  else;
  tmpSwitchBreak: {
    if (tmpSwitchCaseToStart <= 0) {
      b = { c: 10, d: 20 };
      a = b.c = $(b)[$('d')];
      $(a, b);
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
  b = { c: 10, d: 20 };
  const tmpCompObj = $(b);
  const tmpCompProp = $('d');
  const tmpNestedAssignPropRhs = tmpCompObj[tmpCompProp];
  const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
  b.c = tmpNestedPropAssignRhs;
  a = tmpNestedPropAssignRhs;
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
const b = { c: 10, d: 20 };
const tmpCompObj = $(b);
const tmpCompProp = $('d');
const tmpNestedAssignPropRhs = tmpCompObj[tmpCompProp];
b.c = tmpNestedAssignPropRhs;
$(tmpNestedAssignPropRhs, b);
$('fail1');
$('fail2');
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { c: '10', d: '20' }
 - 2: 'd'
 - 3: 20, { c: '20', d: '20' }
 - 4: 'fail1'
 - 5: 'fail2'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
