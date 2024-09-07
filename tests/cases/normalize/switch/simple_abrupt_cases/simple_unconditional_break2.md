# Preval test case

# simple_unconditional_break2.md

> Normalize > Switch > Simple abrupt cases > Simple unconditional break2
>
> The simple switch is the one where every case ends explicitly, and only once, and where default is either the last case or omitted.

## Input

`````js filename=intro
switch ($(1)) {
  case 0:
    $('one');
    if(KEEP_ME_AROUND) { // implicit global that we should retain
      break;
    }
    break;
  case 1:
    $('two');
    break;
}
`````

## Pre Normal


`````js filename=intro
tmpSwitchBreak: {
  const tmpSwitchDisc = $(1);
  if (tmpSwitchDisc === 0) {
    $(`one`);
    if (KEEP_ME_AROUND) {
      break tmpSwitchBreak;
    }
    break tmpSwitchBreak;
  } else if (tmpSwitchDisc === 1) {
    $(`two`);
    break tmpSwitchBreak;
  } else {
  }
}
`````

## Normalized


`````js filename=intro
tmpSwitchBreak: {
  const tmpSwitchDisc = $(1);
  const tmpIfTest = tmpSwitchDisc === 0;
  if (tmpIfTest) {
    $(`one`);
    if (KEEP_ME_AROUND) {
      break tmpSwitchBreak;
    } else {
      break tmpSwitchBreak;
    }
  } else {
    const tmpIfTest$1 = tmpSwitchDisc === 1;
    if (tmpIfTest$1) {
      $(`two`);
      break tmpSwitchBreak;
    } else {
    }
  }
}
`````

## Output


`````js filename=intro
const tmpSwitchDisc = $(1);
const tmpIfTest = tmpSwitchDisc === 0;
if (tmpIfTest) {
  $(`one`);
  KEEP_ME_AROUND;
} else {
  const tmpIfTest$1 = tmpSwitchDisc === 1;
  if (tmpIfTest$1) {
    $(`two`);
  } else {
  }
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
const b = a === 0;
if (b) {
  $( "one" );
  KEEP_ME_AROUND;
}
else {
  const c = a === 1;
  if (c) {
    $( "two" );
  }
}
`````

## Globals

BAD@! Found 1 implicit global bindings:

KEEP_ME_AROUND

## Result

Should call `$` with:
 - 1: 1
 - 2: 'two'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
