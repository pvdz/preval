# Preval test case

# auto_ident_unary_complex.md

> normalize > expressions > bindings > switch_case > auto_ident_unary_complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let x = 1;

    let a = typeof $(x);
    $(a, x);
}
`````

## Normalized

`````js filename=intro
{
  let x;
  let tmpUnaryArg;
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
      x = 1;
      tmpUnaryArg = $(x);
      a = typeof tmpUnaryArg;
      $(a, x);
    }
  }
}
`````

## Output

`````js filename=intro
{
  let x;
  let tmpUnaryArg;
  let a;
  let tmpSwitchCaseToStart = 1;
  const tmpIfTest = 1 === 1;
  if (tmpIfTest) {
    tmpSwitchCaseToStart = 0;
  }
  {
    const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
    if (tmpIfTest$1) {
      x = 1;
      tmpUnaryArg = $(x);
      a = typeof tmpUnaryArg;
      $(a, x);
    }
  }
}
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 'number', 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same