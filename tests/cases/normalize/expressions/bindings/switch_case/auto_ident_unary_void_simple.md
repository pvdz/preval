# Preval test case

# auto_ident_unary_void_simple.md

> normalize > expressions > bindings > switch_case > auto_ident_unary_void_simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let arg = 1;

    let a = void arg;
    $(a, arg);
}
`````

## Normalized

`````js filename=intro
{
  let arg;
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
      arg = 1;
      a = undefined;
      $(a, arg);
    }
  }
}
`````

## Output

`````js filename=intro
{
  let arg;
  let a;
  let tmpSwitchCaseToStart = 1;
  const tmpIfTest = 1 === 1;
  if (tmpIfTest) {
    tmpSwitchCaseToStart = 0;
  }
  {
    const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
    if (tmpIfTest$1) {
      arg = 1;
      a = undefined;
      $(a, arg);
    }
  }
}
`````

## Result

Should call `$` with:
 - 1: undefined, 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
