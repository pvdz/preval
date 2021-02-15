# Preval test case

# auto_ident_delete_computed_s-seq_complex.md

> normalize > expressions > bindings > switch_case > auto_ident_delete_computed_s-seq_complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let arg = { y: 1 };

    let a = delete ($(1), $(2), arg)[$("y")];
    $(a, arg);
}
`````

## Normalized

`````js filename=intro
{
  let arg;
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
      arg = { y: 1 };
      $(1);
      $(2);
      tmpDeleteCompObj = arg;
      tmpDeleteCompProp = $('y');
      a = delete tmpDeleteCompObj[tmpDeleteCompProp];
      $(a, arg);
    }
  }
}
`````

## Output

`````js filename=intro
{
  let tmpSwitchCaseToStart = 1;
  const tmpIfTest = 1 === 1;
  if (tmpIfTest) {
    tmpSwitchCaseToStart = 0;
  }
  {
    const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
    if (tmpIfTest$1) {
      const arg = { y: 1 };
      $(1);
      $(2);
      const tmpDeleteCompObj = arg;
      const tmpDeleteCompProp = $('y');
      const a = delete tmpDeleteCompObj[tmpDeleteCompProp];
      $(a, arg);
    }
  }
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 'y'
 - 4: true, {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
