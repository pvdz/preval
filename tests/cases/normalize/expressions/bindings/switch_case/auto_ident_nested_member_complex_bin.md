# Preval test case

# auto_ident_nested_member_complex_bin.md

> normalize > expressions > bindings > switch_case > auto_ident_nested_member_complex_bin
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let b = { x: 1 },
      c = { y: 2 },
      d = 3,
      e = 4;

    let a = ($(b)[$("x")] = $(c)[$("y")] = d + e);
    $(a, b, c, d, e);
}
`````

## Normalized

`````js filename=intro
{
  let b;
  let c;
  let d;
  let e;
  let varInitAssignLhsComputedObj;
  let varInitAssignLhsComputedProp;
  let varInitAssignLhsComputedObj$1;
  let varInitAssignLhsComputedProp$1;
  let varInitAssignLhsComputedRhs$1;
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
      c = { y: 2 };
      d = 3;
      e = 4;
      varInitAssignLhsComputedObj = $(b);
      varInitAssignLhsComputedProp = $('x');
      varInitAssignLhsComputedObj$1 = $(c);
      varInitAssignLhsComputedProp$1 = $('y');
      varInitAssignLhsComputedRhs$1 = d + e;
      varInitAssignLhsComputedObj$1[varInitAssignLhsComputedProp$1] = varInitAssignLhsComputedRhs$1;
      varInitAssignLhsComputedRhs = varInitAssignLhsComputedRhs$1;
      varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs;
      a = varInitAssignLhsComputedRhs;
      $(a, b, c, d, e);
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
  let e;
  let varInitAssignLhsComputedObj;
  let varInitAssignLhsComputedProp;
  let varInitAssignLhsComputedObj$1;
  let varInitAssignLhsComputedProp$1;
  let varInitAssignLhsComputedRhs$1;
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
      c = { y: 2 };
      d = 3;
      e = 4;
      varInitAssignLhsComputedObj = $(b);
      varInitAssignLhsComputedProp = $('x');
      varInitAssignLhsComputedObj$1 = $(c);
      varInitAssignLhsComputedProp$1 = $('y');
      varInitAssignLhsComputedRhs$1 = d + e;
      varInitAssignLhsComputedObj$1[varInitAssignLhsComputedProp$1] = varInitAssignLhsComputedRhs$1;
      varInitAssignLhsComputedRhs = varInitAssignLhsComputedRhs$1;
      varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs;
      a = varInitAssignLhsComputedRhs;
      $(a, b, c, d, e);
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
 - 5: 7, { x: '7' }, { y: '7' }, 3, 4
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same