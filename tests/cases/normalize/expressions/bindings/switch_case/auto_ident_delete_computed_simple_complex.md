# Preval test case

# auto_ident_delete_computed_simple_complex.md

> normalize > expressions > bindings > switch_case > auto_ident_delete_computed_simple_complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let x = { y: 1 };

    let a = delete x[$("y")];
    $(a, x);
}
`````

## Normalized

`````js filename=intro
{
  let x;
  let tmpDeleteCompObj;
  let tmpDeleteCompProp;
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
      x = { y: 1 };
      tmpDeleteCompObj = x;
      tmpDeleteCompProp = $('y');
      a = delete tmpDeleteCompObj[tmpDeleteCompProp];
      $(a, x);
    }
  }
}
`````

## Output

`````js filename=intro
{
  let x;
  let tmpDeleteCompObj;
  let tmpDeleteCompProp;
  let a;
  let tmpSwitchCaseToStart = 1;
  const tmpIfTest = 1 === 1;
  if (tmpIfTest) {
    tmpSwitchCaseToStart = 0;
  }
  {
    const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
    if (tmpIfTest$1) {
      x = { y: 1 };
      tmpDeleteCompObj = x;
      tmpDeleteCompProp = $('y');
      a = delete tmpDeleteCompObj[tmpDeleteCompProp];
      $(a, x);
    }
  }
}
`````

## Result

Should call `$` with:
 - 1: 'y'
 - 2: true, {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
