# Preval test case

# switch_case.md

> Normalize > Pattern > Binding > Switch case
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
let a;
let b;
const tmpSwitchTest = 0;
let tmpSwitchCaseToStart = 1;
const tmpIfTest = 0 === tmpSwitchTest;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
}
const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
if (tmpIfTest$1) {
  const arrAssignPatternRhs = [10, 20];
  const arrPatternSplat = [...arrAssignPatternRhs];
  a = arrPatternSplat[0];
  b = arrPatternSplat[1];
  $(a, b);
}
`````

## Output

`````js filename=intro
const arrAssignPatternRhs = [10, 20];
const arrPatternSplat = [...arrAssignPatternRhs];
const a = arrPatternSplat[0];
const b = arrPatternSplat[1];
$(a, b);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 10, 20
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
