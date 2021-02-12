# Preval test case

# auto_ident_delete_prop_c-seq.md

> normalize > expressions > bindings > switch_case > auto_ident_delete_prop_c-seq
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let x = { y: 1 };

    let a = delete ($(1), $(2), $(x)).y;
    $(a, x);
}
`````

## Normalized

`````js filename=intro
{
  let x;
  let tmpDeleteObj;
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
      $(1);
      $(2);
      tmpDeleteObj = $(x);
      a = delete tmpDeleteObj.y;
      $(a, x);
    }
  }
}
`````

## Output

`````js filename=intro
{
  let x;
  let tmpDeleteObj;
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
      $(1);
      $(2);
      tmpDeleteObj = $(x);
      a = delete tmpDeleteObj.y;
      $(a, x);
    }
  }
}
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: { y: '1' }
 - 4: true, {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
