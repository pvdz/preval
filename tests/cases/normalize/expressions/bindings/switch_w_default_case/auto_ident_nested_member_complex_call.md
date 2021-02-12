# Preval test case

# auto_ident_nested_member_complex_call.md

> normalize > expressions > bindings > switch_w_default_case > auto_ident_nested_member_complex_call
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let b = { x: 1 },
      c = { y: 2 },
      d = 3;

    let a = ($(b)[$("x")] = $(c)[$("y")] = $(d));
    $(a, b, c, d);
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
  let d;
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
      c = { y: 2 };
      d = 3;
      a = undefined;
      const tmpNestedAssignComMemberObj = $(b);
      const tmpNestedAssignComMemberProp = $('x');
      let tmpNestedAssignPropRhs;
      const tmpNestedAssignComMemberObj$1 = $(c);
      const tmpNestedAssignComMemberProp$1 = $('y');
      const tmpNestedAssignPropRhs$1 = $(d);
      const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs$1;
      tmpNestedAssignComMemberObj$1[tmpNestedAssignComMemberProp$1] = tmpNestedPropAssignRhs;
      tmpNestedAssignPropRhs = tmpNestedPropAssignRhs;
      const tmpNestedPropAssignRhs$1 = tmpNestedAssignPropRhs;
      tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedPropAssignRhs$1;
      a = tmpNestedPropAssignRhs$1;
      $(a, b, c, d);
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
  let d;
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
      c = { y: 2 };
      d = 3;
      a = undefined;
      const tmpNestedAssignComMemberObj = $(b);
      const tmpNestedAssignComMemberProp = $('x');
      let tmpNestedAssignPropRhs;
      const tmpNestedAssignComMemberObj$1 = $(c);
      const tmpNestedAssignComMemberProp$1 = $('y');
      const tmpNestedAssignPropRhs$1 = $(d);
      const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs$1;
      tmpNestedAssignComMemberObj$1[tmpNestedAssignComMemberProp$1] = tmpNestedPropAssignRhs;
      tmpNestedAssignPropRhs = tmpNestedPropAssignRhs;
      const tmpNestedPropAssignRhs$1 = tmpNestedAssignPropRhs;
      tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedPropAssignRhs$1;
      a = tmpNestedPropAssignRhs$1;
      $(a, b, c, d);
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
 - 1: { x: '1' }
 - 2: 'x'
 - 3: { y: '2' }
 - 4: 'y'
 - 5: 3
 - 6: 3, { x: '3' }, { y: '3' }, 3
 - 7: 'fail1'
 - 8: 'fail2'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
