# Preval test case

# switch_case.md

> normalize > pattern > assignment > switch_case
>
> Scope of a switch block is shared between all cases so bindings need to be hoisted above it

However, the TDZ is still active so this should be an error.

There might not be a possibility to retain this error after a transform without significant code duplication.

#TODO

## Input

`````js filename=intro
switch (1) {
  case 0:
    let a = 10;
    let b = 20;
  case 1:
    [a, b] = [30, 40];
}
`````

## Normalized

`````js filename=intro
{
  let a;
  let b;
  const tmpSwitchValue = 1;
  let tmpSwitchCaseToStart = 2;
  const tmpIfTest = 0 === tmpSwitchValue;
  if (tmpIfTest) {
    tmpSwitchCaseToStart = 0;
  } else {
    const tmpIfTest$1 = 1 === tmpSwitchValue;
    if (tmpIfTest$1) {
      tmpSwitchCaseToStart = 1;
    }
  }
  {
    const tmpIfTest$2 = tmpSwitchCaseToStart <= 0;
    if (tmpIfTest$2) {
      a = 10;
      b = 20;
    }
    const tmpIfTest$3 = tmpSwitchCaseToStart <= 1;
    if (tmpIfTest$3) {
      const arrAssignPatternRhs = [30, 40];
      const arrPatternSplat = [...arrAssignPatternRhs];
      a = arrPatternSplat[0];
      b = arrPatternSplat[1];
    }
  }
}
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - eval returned: ("<crash[ Cannot access '<ref>' before initialization ]>")

Normalized calls: BAD?!
 - eval returned: undefined

Final output calls: BAD!!
 - eval returned: undefined
