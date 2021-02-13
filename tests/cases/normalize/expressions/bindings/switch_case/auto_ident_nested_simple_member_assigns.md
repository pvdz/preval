# Preval test case

# auto_ident_nested_simple_member_assigns.md

> normalize > expressions > bindings > switch_case > auto_ident_nested_simple_member_assigns
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
}
`````

## Normalized

`````js filename=intro
{
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
  }
  {
    const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
    if (tmpIfTest$1) {
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
  }
}
`````

## Output

`````js filename=intro
{
  let b;
  let c;
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
  }
}
`````

## Result

Should call `$` with:
 - 1: 3, { x: '3' }, 3
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
