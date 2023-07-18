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

## Pre Normal

`````js filename=intro
{
  let x;
  const tmpSwitchValue = 1;
  let tmpSwitchCaseToStart = 2;
  if (1 === tmpSwitchValue) tmpSwitchCaseToStart = 0;
  else if (2 === tmpSwitchValue) tmpSwitchCaseToStart = 1;
  else;
  tmpSwitchBreak: {
    if (tmpSwitchCaseToStart <= 0) {
      [x] = [4, 5, 6];
    }
    if (tmpSwitchCaseToStart <= 1) {
      $(x);
    }
  }
}
`````

## Normalized

`````js filename=intro
let x = undefined;
const tmpSwitchValue = 1;
let tmpSwitchCaseToStart = 2;
const tmpIfTest = 1 === tmpSwitchValue;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
} else {
  const tmpIfTest$1 = 2 === tmpSwitchValue;
  if (tmpIfTest$1) {
    tmpSwitchCaseToStart = 1;
  } else {
  }
}
const tmpIfTest$3 = tmpSwitchCaseToStart <= 0;
if (tmpIfTest$3) {
  const arrAssignPatternRhs = [4, 5, 6];
  const arrPatternSplat = [...arrAssignPatternRhs];
  x = arrPatternSplat[0];
} else {
}
const tmpIfTest$5 = tmpSwitchCaseToStart <= 1;
if (tmpIfTest$5) {
  $(x);
} else {
}
`````

## Output

`````js filename=intro
$(4);
`````

## PST Output

With rename=true

`````js filename=intro
$( 4 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 4
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
