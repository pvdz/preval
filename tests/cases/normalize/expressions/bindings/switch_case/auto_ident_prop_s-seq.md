# Preval test case

# auto_ident_prop_s-seq.md

> normalize > expressions > bindings > switch_case > auto_ident_prop_s-seq
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let b = { c: 1 };

    let a = (1, 2, b).c;
    $(a, b);
}
`````

## Normalized

`````js filename=intro
{
  let b;
  let tmpCompObj;
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
      b = { c: 1 };
      tmpCompObj = b;
      a = tmpCompObj.c;
      $(a, b);
    }
  }
}
`````

## Output

`````js filename=intro
{
  let b;
  let tmpCompObj;
  let a;
  let tmpSwitchCaseToStart = 1;
  const tmpIfTest = 1 === 1;
  if (tmpIfTest) {
    tmpSwitchCaseToStart = 0;
  }
  {
    const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
    if (tmpIfTest$1) {
      b = { c: 1 };
      tmpCompObj = b;
      a = tmpCompObj.c;
      $(a, b);
    }
  }
}
`````

## Result

Should call `$` with:
 - 1: 1, { c: '1' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same