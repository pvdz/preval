# Preval test case

# one_pattern.md

> Normalize > Switch > One pattern
>
> A switch that contains a pattern needs to have that pattern to be normalized before being able to decompose the switch itself because all bindings need to be declared before the switch in order to make the decomposition safe/correct.

Should end up something like this (will take some time before we get there :p)

```js
let bindingPatternArrRoot = [4, 5, 6];
let arrPatternSplat = [...bindingPatternArrRoot];
let x = arrPatternSplat[0];
$(x);
```


#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let [x] = [4, 5, 6];
  case 2:
    $(x);
}
`````

## Normalized

`````js filename=intro
let bindingPatternArrRoot;
let arrPatternSplat;
let x;
const tmpSwitchValue = 1;
let tmpSwitchCaseToStart = 2;
const tmpIfTest = 1 === tmpSwitchValue;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
} else {
  const tmpIfTest$1 = 2 === tmpSwitchValue;
  if (tmpIfTest$1) {
    tmpSwitchCaseToStart = 1;
  }
}
const tmpIfTest$2 = tmpSwitchCaseToStart <= 0;
if (tmpIfTest$2) {
  bindingPatternArrRoot = [4, 5, 6];
  arrPatternSplat = [...bindingPatternArrRoot];
  x = arrPatternSplat[0];
}
const tmpIfTest$3 = tmpSwitchCaseToStart <= 1;
if (tmpIfTest$3) {
  $(x);
}
`````

## Output

`````js filename=intro
const bindingPatternArrRoot = [4, 5, 6];
const arrPatternSplat = [...bindingPatternArrRoot];
const x = arrPatternSplat[0];
$(x);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 4
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
