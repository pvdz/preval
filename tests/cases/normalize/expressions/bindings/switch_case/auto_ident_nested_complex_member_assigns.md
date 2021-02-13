# Preval test case

# auto_ident_nested_complex_member_assigns.md

> normalize > expressions > bindings > switch_case > auto_ident_nested_complex_member_assigns
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let b = { x: 1 },
      c = 3;

    let a = ($(b)[$("x")] = $(b)[$("x")] = $(b)[$("x")] = $(b)[$("x")] = $(b)[
      $("x")
    ] = $(b)[$("x")] = c);
    $(a, b, c);
}
`````

## Normalized

`````js filename=intro
{
  let b;
  let c;
  let varInitAssignLhsComputedObj;
  let varInitAssignLhsComputedProp;
  let varInitAssignLhsComputedObj$1;
  let varInitAssignLhsComputedProp$1;
  let varInitAssignLhsComputedObj$2;
  let varInitAssignLhsComputedProp$2;
  let varInitAssignLhsComputedObj$3;
  let varInitAssignLhsComputedProp$3;
  let varInitAssignLhsComputedObj$4;
  let varInitAssignLhsComputedProp$4;
  let varInitAssignLhsComputedObj$5;
  let varInitAssignLhsComputedProp$5;
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
  }
  {
    const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
    if (tmpIfTest$1) {
      b = { x: 1 };
      c = 3;
      varInitAssignLhsComputedObj = $(b);
      varInitAssignLhsComputedProp = $('x');
      varInitAssignLhsComputedObj$1 = $(b);
      varInitAssignLhsComputedProp$1 = $('x');
      varInitAssignLhsComputedObj$2 = $(b);
      varInitAssignLhsComputedProp$2 = $('x');
      varInitAssignLhsComputedObj$3 = $(b);
      varInitAssignLhsComputedProp$3 = $('x');
      varInitAssignLhsComputedObj$4 = $(b);
      varInitAssignLhsComputedProp$4 = $('x');
      varInitAssignLhsComputedObj$5 = $(b);
      varInitAssignLhsComputedProp$5 = $('x');
      varInitAssignLhsComputedRhs$5 = c;
      varInitAssignLhsComputedObj$5[varInitAssignLhsComputedProp$5] = varInitAssignLhsComputedRhs$5;
      varInitAssignLhsComputedRhs$4 = varInitAssignLhsComputedRhs$5;
      varInitAssignLhsComputedObj$4[varInitAssignLhsComputedProp$4] = varInitAssignLhsComputedRhs$4;
      varInitAssignLhsComputedRhs$3 = varInitAssignLhsComputedRhs$4;
      varInitAssignLhsComputedObj$3[varInitAssignLhsComputedProp$3] = varInitAssignLhsComputedRhs$3;
      varInitAssignLhsComputedRhs$2 = varInitAssignLhsComputedRhs$3;
      varInitAssignLhsComputedObj$2[varInitAssignLhsComputedProp$2] = varInitAssignLhsComputedRhs$2;
      varInitAssignLhsComputedRhs$1 = varInitAssignLhsComputedRhs$2;
      varInitAssignLhsComputedObj$1[varInitAssignLhsComputedProp$1] = varInitAssignLhsComputedRhs$1;
      varInitAssignLhsComputedRhs = varInitAssignLhsComputedRhs$1;
      varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs;
      a = varInitAssignLhsComputedRhs;
      $(a, b, c);
    }
  }
}
`````

## Output

`````js filename=intro
{
  let b;
  let c;
  let varInitAssignLhsComputedObj;
  let varInitAssignLhsComputedProp;
  let varInitAssignLhsComputedObj$1;
  let varInitAssignLhsComputedProp$1;
  let varInitAssignLhsComputedObj$2;
  let varInitAssignLhsComputedProp$2;
  let varInitAssignLhsComputedObj$3;
  let varInitAssignLhsComputedProp$3;
  let varInitAssignLhsComputedObj$4;
  let varInitAssignLhsComputedProp$4;
  let varInitAssignLhsComputedObj$5;
  let varInitAssignLhsComputedProp$5;
  let varInitAssignLhsComputedRhs$5;
  let varInitAssignLhsComputedRhs$4;
  let varInitAssignLhsComputedRhs$3;
  let varInitAssignLhsComputedRhs$2;
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
      c = 3;
      varInitAssignLhsComputedObj = $(b);
      varInitAssignLhsComputedProp = $('x');
      varInitAssignLhsComputedObj$1 = $(b);
      varInitAssignLhsComputedProp$1 = $('x');
      varInitAssignLhsComputedObj$2 = $(b);
      varInitAssignLhsComputedProp$2 = $('x');
      varInitAssignLhsComputedObj$3 = $(b);
      varInitAssignLhsComputedProp$3 = $('x');
      varInitAssignLhsComputedObj$4 = $(b);
      varInitAssignLhsComputedProp$4 = $('x');
      varInitAssignLhsComputedObj$5 = $(b);
      varInitAssignLhsComputedProp$5 = $('x');
      varInitAssignLhsComputedRhs$5 = c;
      varInitAssignLhsComputedObj$5[varInitAssignLhsComputedProp$5] = varInitAssignLhsComputedRhs$5;
      varInitAssignLhsComputedRhs$4 = varInitAssignLhsComputedRhs$5;
      varInitAssignLhsComputedObj$4[varInitAssignLhsComputedProp$4] = varInitAssignLhsComputedRhs$4;
      varInitAssignLhsComputedRhs$3 = varInitAssignLhsComputedRhs$4;
      varInitAssignLhsComputedObj$3[varInitAssignLhsComputedProp$3] = varInitAssignLhsComputedRhs$3;
      varInitAssignLhsComputedRhs$2 = varInitAssignLhsComputedRhs$3;
      varInitAssignLhsComputedObj$2[varInitAssignLhsComputedProp$2] = varInitAssignLhsComputedRhs$2;
      varInitAssignLhsComputedRhs$1 = varInitAssignLhsComputedRhs$2;
      varInitAssignLhsComputedObj$1[varInitAssignLhsComputedProp$1] = varInitAssignLhsComputedRhs$1;
      varInitAssignLhsComputedRhs = varInitAssignLhsComputedRhs$1;
      varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs;
      a = varInitAssignLhsComputedRhs;
      $(a, b, c);
    }
  }
}
`````

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: 'x'
 - 3: { x: '1' }
 - 4: 'x'
 - 5: { x: '1' }
 - 6: 'x'
 - 7: { x: '1' }
 - 8: 'x'
 - 9: { x: '1' }
 - 10: 'x'
 - 11: { x: '1' }
 - 12: 'x'
 - 13: 3, { x: '3' }, 3
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
