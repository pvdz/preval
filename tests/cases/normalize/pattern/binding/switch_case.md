# Preval test case

# switch_case.md

> normalize > pattern > binding > switch_case
>
> Scope of a switch block is shared between all cases so bindings need to be hoisted above it

#TODO

## Input

`````js filename=intro
switch (0) {
  case 0:
    let [a, b] = [10, 20];
    $(a, b);
}
`````

## Normalized

`````js filename=intro
let bindingPatternArrRoot;
let arrPatternSplat;
let a;
let b;
const tmpSwitchValue = 0;
let tmpSwitchCaseToStart = 1;
const tmpIfTest = 0 === tmpSwitchValue;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
}
const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
if (tmpIfTest$1) {
  bindingPatternArrRoot = [10, 20];
  arrPatternSplat = [...bindingPatternArrRoot];
  a = arrPatternSplat[0];
  b = arrPatternSplat[1];
  $(a, b);
}
`````

## Output

`````js filename=intro
let tmpSwitchCaseToStart = 1;
const tmpIfTest = 0 === 0;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
}
const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
if (tmpIfTest$1) {
  const bindingPatternArrRoot = [10, 20];
  const arrPatternSplat = [...bindingPatternArrRoot];
  const a = arrPatternSplat[0];
  const b = arrPatternSplat[1];
  $(a, b);
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 10, 20
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
