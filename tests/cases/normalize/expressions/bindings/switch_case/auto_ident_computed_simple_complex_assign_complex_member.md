# Preval test case

# auto_ident_computed_simple_complex_assign_complex_member.md

> normalize > expressions > bindings > switch_case > auto_ident_computed_simple_complex_assign_complex_member
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let b = { c: 10, d: 20 };

    let a = (b[$("c")] = $(b)[$("d")]);
    $(a, b);
}
`````

## Normalized

`````js filename=intro
{
  let b;
  let varInitAssignLhsComputedObj;
  let varInitAssignLhsComputedProp;
  let tmpCompObj;
  let tmpCompProp;
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
      b = { c: 10, d: 20 };
      varInitAssignLhsComputedObj = b;
      varInitAssignLhsComputedProp = $('c');
      tmpCompObj = $(b);
      tmpCompProp = $('d');
      varInitAssignLhsComputedRhs = tmpCompObj[tmpCompProp];
      varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs;
      a = varInitAssignLhsComputedRhs;
      $(a, b);
    }
  }
}
`````

## Output

`````js filename=intro
{
  let b;
  let varInitAssignLhsComputedObj;
  let varInitAssignLhsComputedProp;
  let tmpCompObj;
  let tmpCompProp;
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
      b = { c: 10, d: 20 };
      varInitAssignLhsComputedObj = b;
      varInitAssignLhsComputedProp = $('c');
      tmpCompObj = $(b);
      tmpCompProp = $('d');
      varInitAssignLhsComputedRhs = tmpCompObj[tmpCompProp];
      varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs;
      a = varInitAssignLhsComputedRhs;
      $(a, b);
    }
  }
}
`````

## Result

Should call `$` with:
 - 1: 'c'
 - 2: { c: '10', d: '20' }
 - 3: 'd'
 - 4: 20, { c: '20', d: '20' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same