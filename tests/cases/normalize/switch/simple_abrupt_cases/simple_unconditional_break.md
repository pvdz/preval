# Preval test case

# simple_unconditional_break.md

> Normalize > Switch > Simple abrupt cases > Simple unconditional break
>
> The simple switch is the one where every case ends explicitly, and only once, and where default is either the last case or omitted.

## Input

`````js filename=intro
switch ($(1)) {
  case 0:
    $('one');
    if(x) { // implicit global that we should retain
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
    if (x) {
      break tmpSwitchBreak;
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
    if (x) {
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
      const tmpIfTest$3 = tmpSwitchDisc === 2;
      if (tmpIfTest$3) {
        $(`three`);
        break tmpSwitchBreak;
      } else {
        const tmpIfTest$5 = tmpSwitchDisc === 3;
        if (tmpIfTest$5) {
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
}
else {
  const c = a === 1;
  if (c) {
    $( "two" );
  }
  else {
    const d = a === 2;
    if (d) {
      $( "three" );
    }
    else {
      const e = a === 3;
      if (e) {
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

Inverse input result (there was at least one mismatch even though actual test evalled equal):
 - 1: 0
 - 2: ''
 - eval returned: ('<crash[ <ref> is not defined ]>')

Output inverse calls: BAD!!
 - 1: 0
 - 2: ''
 - eval returned: undefined
