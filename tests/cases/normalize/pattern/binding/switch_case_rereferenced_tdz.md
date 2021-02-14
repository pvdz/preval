# Preval test case

# switch_case.md

> normalize > pattern > binding > switch_case
>
> Scope of a switch block is shared between all cases so bindings need to be hoisted above it

However, the TDZ is still active so this should be an error. 

#TODO

## Input

`````js filename=intro
switch (1) {
  case 0:
    let [a, b] = [10, 20];
  case 1:
    [a, b] = [30, 40];
}
`````

## Normalized

`````js filename=intro
{
  let bindingPatternArrRoot;
  let arrPatternSplat;
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
      bindingPatternArrRoot = [10, 20];
      arrPatternSplat = [...bindingPatternArrRoot];
      a = arrPatternSplat[0];
      b = arrPatternSplat[1];
    }
    const tmpIfTest$3 = tmpSwitchCaseToStart <= 1;
    if (tmpIfTest$3) {
      const arrAssignPatternRhs = [30, 40];
      const arrPatternSplat$1 = [...arrAssignPatternRhs];
      a = arrPatternSplat$1[0];
      b = arrPatternSplat$1[1];
    }
  }
}
`````

## Output

`````js filename=intro
{
  let bindingPatternArrRoot;
  let arrPatternSplat;
  let a;
  let b;
  let tmpSwitchCaseToStart = 2;
  const tmpIfTest = 0 === 1;
  if (tmpIfTest) {
    tmpSwitchCaseToStart = 0;
  } else {
    const tmpIfTest$1 = 1 === 1;
    if (tmpIfTest$1) {
      tmpSwitchCaseToStart = 1;
    }
  }
  {
    const tmpIfTest$2 = tmpSwitchCaseToStart <= 0;
    if (tmpIfTest$2) {
      bindingPatternArrRoot = [10, 20];
      arrPatternSplat = [...bindingPatternArrRoot];
      a = arrPatternSplat[0];
      b = arrPatternSplat[1];
    }
    const tmpIfTest$3 = tmpSwitchCaseToStart <= 1;
    if (tmpIfTest$3) {
      const arrAssignPatternRhs = [30, 40];
      const arrPatternSplat$1 = [...arrAssignPatternRhs];
      a = arrPatternSplat$1[0];
      b = arrPatternSplat$1[1];
    }
  }
}
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Cannot access '<ref>' before initialization ]>")

Normalized calls: BAD?!
 - eval returned: undefined

Final output calls: BAD!!
 - eval returned: undefined
