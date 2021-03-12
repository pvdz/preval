# Preval test case

# if_break.md

> Normalize > Switch > If break
>
> Breaks don't need to be toplevel to a case...

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1: {
    if (2) {
      $(3);
      break;
    }
  }
  case 4: {
    if (5) {
      $(6);
      break;
    }
  }
}
`````

## Normalized

`````js filename=intro
const tmpSwitchTest = 1;
let tmpSwitchCaseToStart = 2;
const tmpIfTest = 1 === tmpSwitchTest;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
} else {
  const tmpIfTest$1 = 4 === tmpSwitchTest;
  if (tmpIfTest$1) {
    tmpSwitchCaseToStart = 1;
  }
}
tmpSwitchBreak: {
  const tmpIfTest$2 = tmpSwitchCaseToStart <= 0;
  if (tmpIfTest$2) {
    $(3);
    break tmpSwitchBreak;
  } else {
    const tmpIfTest$3 = tmpSwitchCaseToStart <= 1;
    if (tmpIfTest$3) {
      $(6);
      break tmpSwitchBreak;
    }
  }
}
`````

## Output

`````js filename=intro
tmpSwitchBreak: {
  $(3);
  break tmpSwitchBreak;
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 3
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
