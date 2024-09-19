# Preval test case

# simple_looped_unconditional_break.md

> Normalize > Switch > Simple abrupt cases > Simple looped unconditional break
>
> The simple switch is the one where every case ends explicitly, and only once, and where default is either the last case or omitted.

## Input

`````js filename=intro
switch ($(1)) {
  case 0:
    $('one');
    while ($(1)) {
      $(2);
      break;
    }
    break;
  case 1:
    $('two');
    break;
  case 2:
    $('three');
    break;
  case 3:
    $('four');
    break;
  default:
    $('def');
}
`````

## Pre Normal


`````js filename=intro
tmpSwitchBreak: {
  const tmpSwitchDisc = $(1);
  if (tmpSwitchDisc === 0) {
    $(`one`);
    while ($(1)) {
      $(2);
      break;
    }
    break tmpSwitchBreak;
  } else if (tmpSwitchDisc === 1) {
    $(`two`);
    break tmpSwitchBreak;
  } else if (tmpSwitchDisc === 2) {
    $(`three`);
    break tmpSwitchBreak;
  } else if (tmpSwitchDisc === 3) {
    $(`four`);
    break tmpSwitchBreak;
  } else if (true) {
    $(`def`);
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
    while (true) {
      const tmpIfTest$1 = $(1);
      if (tmpIfTest$1) {
        $(2);
        break;
      } else {
        break;
      }
    }
    break tmpSwitchBreak;
  } else {
    const tmpIfTest$3 = tmpSwitchDisc === 1;
    if (tmpIfTest$3) {
      $(`two`);
      break tmpSwitchBreak;
    } else {
      const tmpIfTest$5 = tmpSwitchDisc === 2;
      if (tmpIfTest$5) {
        $(`three`);
        break tmpSwitchBreak;
      } else {
        const tmpIfTest$7 = tmpSwitchDisc === 3;
        if (tmpIfTest$7) {
          $(`four`);
          break tmpSwitchBreak;
        } else {
          $(`def`);
        }
      }
    }
  }
}
`````

## Output


`````js filename=intro
const tmpSwitchDisc = $(1);
const tmpIfTest /*:boolean*/ = tmpSwitchDisc === 0;
if (tmpIfTest) {
  $(`one`);
  const tmpIfTest$1 = $(1);
  if (tmpIfTest$1) {
    $(2);
  } else {
  }
} else {
  const tmpIfTest$3 /*:boolean*/ = tmpSwitchDisc === 1;
  if (tmpIfTest$3) {
    $(`two`);
  } else {
    const tmpIfTest$5 /*:boolean*/ = tmpSwitchDisc === 2;
    if (tmpIfTest$5) {
      $(`three`);
    } else {
      const tmpIfTest$7 /*:boolean*/ = tmpSwitchDisc === 3;
      if (tmpIfTest$7) {
        $(`four`);
      } else {
        $(`def`);
      }
    }
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
  const c = $( 1 );
  if (c) {
    $( 2 );
  }
}
else {
  const d = a === 1;
  if (d) {
    $( "two" );
  }
  else {
    const e = a === 2;
    if (e) {
      $( "three" );
    }
    else {
      const f = a === 3;
      if (f) {
        $( "four" );
      }
      else {
        $( "def" );
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
