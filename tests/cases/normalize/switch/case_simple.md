# Preval test case

# case_simple.md

> Normalize > Switch > Case simple
>
> Normalize switches

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1: $(1);
  case 2: $(2);
}
`````

## Pre Normal

`````js filename=intro
{
  const tmpSwitchValue = 1;
  let tmpSwitchCaseToStart = 2;
  if (1 === tmpSwitchValue) tmpSwitchCaseToStart = 0;
  else if (2 === tmpSwitchValue) tmpSwitchCaseToStart = 1;
  else;
  tmpSwitchBreak: {
    if (tmpSwitchCaseToStart <= 0) {
      $(1);
    }
    if (tmpSwitchCaseToStart <= 1) {
      $(2);
    }
  }
}
`````

## Normalized

`````js filename=intro
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
const tmpIfTest$3 = tmpSwitchCaseToStart <= 0;
if (tmpIfTest$3) {
  $(1);
}
const tmpIfTest$5 = tmpSwitchCaseToStart <= 1;
if (tmpIfTest$5) {
  $(2);
}
`````

## Output

`````js filename=intro
$(1);
$(2);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
