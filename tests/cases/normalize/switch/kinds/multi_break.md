# Preval test case

# multi_break.md

> Normalize > Switch > Kinds > Multi break
>
> The simple switch is the one where every case ends explicitly, and only once, and where default is either the last case or omitted.

#TODO

## Input

`````js filename=intro
switch ($(1)) {
  case 0:
    $('one');
    break;
  case 0:
    if ($(1)) {
      break;
    }
    $('one');
    break;
  case 0:
    $('one');
    break;
  case 0:
    $('one');
    break;
}
`````

## Pre Normal


`````js filename=intro
tmpSwitchBreak: {
  const tmpSwitchDisc = $(1);
  if (tmpSwitchDisc === 0) {
    $(`one`);
    break tmpSwitchBreak;
  } else if (tmpSwitchDisc === 0) {
    if ($(1)) {
      break tmpSwitchBreak;
    }
    $(`one`);
    break tmpSwitchBreak;
  } else if (tmpSwitchDisc === 0) {
    $(`one`);
    break tmpSwitchBreak;
  } else if (tmpSwitchDisc === 0) {
    $(`one`);
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
    break tmpSwitchBreak;
  } else {
    const tmpIfTest$1 = tmpSwitchDisc === 0;
    if (tmpIfTest$1) {
      const tmpIfTest$3 = $(1);
      if (tmpIfTest$3) {
        break tmpSwitchBreak;
      } else {
        $(`one`);
        break tmpSwitchBreak;
      }
    } else {
      const tmpIfTest$5 = tmpSwitchDisc === 0;
      if (tmpIfTest$5) {
        $(`one`);
        break tmpSwitchBreak;
      } else {
        const tmpIfTest$7 = tmpSwitchDisc === 0;
        if (tmpIfTest$7) {
          $(`one`);
          break tmpSwitchBreak;
        } else {
        }
      }
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
} else {
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
const b = a === 0;
if (b) {
  $( "one" );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
