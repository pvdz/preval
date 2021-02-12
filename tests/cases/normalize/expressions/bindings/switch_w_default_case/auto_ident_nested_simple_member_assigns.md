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
{
  let b;
  let c;
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
  {
    const tmpIfTest$2 = tmpSwitchCaseToStart <= 0;
    if (tmpIfTest$2) {
      b = { x: 1 };
      c = 3;
      a = undefined;
      let tmpNestedAssignPropRhs;
      let tmpNestedAssignPropRhs$1;
      let tmpNestedAssignPropRhs$2;
      let tmpNestedAssignPropRhs$3;
      let tmpNestedAssignPropRhs$4;
      const tmpNestedPropAssignRhs = c;
      b.x = tmpNestedPropAssignRhs;
      tmpNestedAssignPropRhs$4 = tmpNestedPropAssignRhs;
      const tmpNestedPropAssignRhs$1 = tmpNestedAssignPropRhs$4;
      b.x = tmpNestedPropAssignRhs$1;
      tmpNestedAssignPropRhs$3 = tmpNestedPropAssignRhs$1;
      const tmpNestedPropAssignRhs$2 = tmpNestedAssignPropRhs$3;
      b.x = tmpNestedPropAssignRhs$2;
      tmpNestedAssignPropRhs$2 = tmpNestedPropAssignRhs$2;
      const tmpNestedPropAssignRhs$3 = tmpNestedAssignPropRhs$2;
      b.x = tmpNestedPropAssignRhs$3;
      tmpNestedAssignPropRhs$1 = tmpNestedPropAssignRhs$3;
      const tmpNestedPropAssignRhs$4 = tmpNestedAssignPropRhs$1;
      b.x = tmpNestedPropAssignRhs$4;
      tmpNestedAssignPropRhs = tmpNestedPropAssignRhs$4;
      const tmpNestedPropAssignRhs$5 = tmpNestedAssignPropRhs;
      b.x = tmpNestedPropAssignRhs$5;
      a = tmpNestedPropAssignRhs$5;
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
  }
}
`````

## Output

`````js filename=intro
{
  let b;
  let c;
  let a;
  let tmpSwitchCaseToStart = 1;
  const tmpIfTest = 1 === 1;
  if (tmpIfTest) {
    tmpSwitchCaseToStart = 0;
  } else {
    const tmpIfTest$1 = 2 === 1;
    if (tmpIfTest$1) {
      tmpSwitchCaseToStart = 2;
    }
  }
  {
    const tmpIfTest$2 = tmpSwitchCaseToStart <= 0;
    if (tmpIfTest$2) {
      b = { x: 1 };
      c = 3;
      a = undefined;
      let tmpNestedAssignPropRhs;
      let tmpNestedAssignPropRhs$1;
      let tmpNestedAssignPropRhs$2;
      let tmpNestedAssignPropRhs$3;
      let tmpNestedAssignPropRhs$4;
      const tmpNestedPropAssignRhs = c;
      b.x = tmpNestedPropAssignRhs;
      tmpNestedAssignPropRhs$4 = tmpNestedPropAssignRhs;
      const tmpNestedPropAssignRhs$1 = tmpNestedAssignPropRhs$4;
      b.x = tmpNestedPropAssignRhs$1;
      tmpNestedAssignPropRhs$3 = tmpNestedPropAssignRhs$1;
      const tmpNestedPropAssignRhs$2 = tmpNestedAssignPropRhs$3;
      b.x = tmpNestedPropAssignRhs$2;
      tmpNestedAssignPropRhs$2 = tmpNestedPropAssignRhs$2;
      const tmpNestedPropAssignRhs$3 = tmpNestedAssignPropRhs$2;
      b.x = tmpNestedPropAssignRhs$3;
      tmpNestedAssignPropRhs$1 = tmpNestedPropAssignRhs$3;
      const tmpNestedPropAssignRhs$4 = tmpNestedAssignPropRhs$1;
      b.x = tmpNestedPropAssignRhs$4;
      tmpNestedAssignPropRhs = tmpNestedPropAssignRhs$4;
      const tmpNestedPropAssignRhs$5 = tmpNestedAssignPropRhs;
      b.x = tmpNestedPropAssignRhs$5;
      a = tmpNestedPropAssignRhs$5;
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
  }
}
`````

## Result

Should call `$` with:
 - 1: 3, { x: '3' }, 3
 - 2: 'fail1'
 - 3: 'fail2'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
