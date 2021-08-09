# Preval test case

# simple_last_no_break.md

> Normalize > Switch > Kinds > Simple last no break
>
> The simple switch is the one where every case ends explicitly, and only once, and where default is either the last case or omitted.

#TODO

## Input

`````js filename=intro
switch ($(1)) {
  case 0:
    $('one');
    break;
  case 1:
    $('two');
    break;
  case 2:
    $('three');
    break;
  case 3:
    $('four');
}
`````

## Pre Normal

`````js filename=intro
tmpSwitchBreak: {
  const tmpSwitchDisc = $(1);
  if (tmpSwitchDisc === 0) {
    $(`one`);
    break tmpSwitchBreak;
  } else if (tmpSwitchDisc === 1) {
    $(`two`);
    break tmpSwitchBreak;
  } else if (tmpSwitchDisc === 2) {
    $(`three`);
    break tmpSwitchBreak;
  } else if (tmpSwitchDisc === 3) {
    $(`four`);
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
    const tmpIfTest$1 = tmpSwitchDisc === 1;
    if (tmpIfTest$1) {
      $(`two`);
      break tmpSwitchBreak;
    } else {
      const tmpIfTest$3 = tmpSwitchDisc === 2;
      if (tmpIfTest$3) {
        $(`three`);
        break tmpSwitchBreak;
      } else {
        const tmpIfTest$5 = tmpSwitchDisc === 3;
        if (tmpIfTest$5) {
          $(`four`);
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
  const tmpIfTest$1 = tmpSwitchDisc === 1;
  if (tmpIfTest$1) {
    $(`two`);
  } else {
    const tmpIfTest$3 = tmpSwitchDisc === 2;
    if (tmpIfTest$3) {
      $(`three`);
    } else {
      const tmpIfTest$5 = tmpSwitchDisc === 3;
      if (tmpIfTest$5) {
        $(`four`);
      } else {
      }
    }
  }
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 'two'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
