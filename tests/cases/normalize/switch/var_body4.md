# Preval test case

# var_body4.md

> Normalize > Switch > Var body4
>
> Var as body of a do-while

#TODO

## Input

`````js filename=intro
let x = undefined;
let tmpSwitchCaseToStart = $(0);
tmpSwitchBreak: {
  const tmpIfTest$3 = tmpSwitchCaseToStart <= 0;
  if (tmpIfTest$3) {
    x = 10;
    break tmpSwitchBreak;
  } else {
  }
}
$(x);
`````

## Pre Normal

`````js filename=intro
let x = undefined;
let tmpSwitchCaseToStart = $(0);
tmpSwitchBreak: {
  const tmpIfTest$3 = tmpSwitchCaseToStart <= 0;
  if (tmpIfTest$3) {
    x = 10;
    break tmpSwitchBreak;
  } else {
  }
}
$(x);
`````

## Normalized

`````js filename=intro
let x = undefined;
let tmpSwitchCaseToStart = $(0);
tmpSwitchBreak: {
  const tmpIfTest$3 = tmpSwitchCaseToStart <= 0;
  if (tmpIfTest$3) {
    x = 10;
    break tmpSwitchBreak;
  } else {
  }
}
$(x);
`````

## Output

`````js filename=intro
let x = undefined;
const tmpSwitchCaseToStart = $(0);
const tmpIfTest$3 = tmpSwitchCaseToStart <= 0;
if (tmpIfTest$3) {
  x = 10;
  $(10);
} else {
  $(x);
}
`````

## PST Output

With rename=true

`````js filename=intro
let a = undefined;
const b = $( 0 );
const c = b <= 0;
if (c) {
  a = 10;
  $( 10 );
}
else {
  $( a );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
