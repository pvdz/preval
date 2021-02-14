# Preval test case

# switch_case.md

> normalize > pattern > assignment > switch_case
>
> Scope of a switch block is shared between all cases so bindings need to be hoisted above it

#TODO

## Input

`````js filename=intro
switch (0) {
  case 0:
    let a = 10;
    let b = 20;
    [a, b] = [30, 40];
    $(a, b);
}
`````

## Normalized

`````js filename=intro
{
  let a;
  let b;
  const tmpSwitchValue = 0;
  let tmpSwitchCaseToStart = 1;
  const tmpIfTest = 0 === tmpSwitchValue;
  if (tmpIfTest) {
    tmpSwitchCaseToStart = 0;
  }
  {
    const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
    if (tmpIfTest$1) {
      a = 10;
      b = 20;
      const arrAssignPatternRhs = [30, 40];
      const arrPatternSplat = [...arrAssignPatternRhs];
      a = arrPatternSplat[0];
      b = arrPatternSplat[1];
      $(a, b);
    }
  }
}
`````

## Output

`````js filename=intro
{
  let a;
  let b;
  let tmpSwitchCaseToStart = 1;
  const tmpIfTest = 0 === 0;
  if (tmpIfTest) {
    tmpSwitchCaseToStart = 0;
  }
  {
    const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
    if (tmpIfTest$1) {
      a = 10;
      b = 20;
      const arrAssignPatternRhs = [30, 40];
      const arrPatternSplat = [...arrAssignPatternRhs];
      a = arrPatternSplat[0];
      b = arrPatternSplat[1];
      $(a, b);
    }
  }
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 30, 40
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
