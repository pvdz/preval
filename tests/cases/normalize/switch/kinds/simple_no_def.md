# Preval test case

# simple_no_def.md

> Normalize > Switch > Kinds > Simple no def
>
> The simple switch is the one where every case ends explicitly, and only once, and where default is either the last case or omitted.

```
const test - $(1)
if (test === 0) {
  $('one');
} else {
  if (test === 1) {
    $('two');
  } else {
    if (test === 3) {
      $('three');
    } else {
      if (test === 4) {
        $('four');
      } else {
      }
    }
  }
}
```

## Input

`````js filename=intro
switch ($(1)) {
  case 0:
    $('one');
    break;
  case 2:
    $('two');
    break;
  case 3:
    $('three');
    break;
  case 4:
    $('four');
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
  } else if (tmpSwitchDisc === 2) {
    $(`two`);
    break tmpSwitchBreak;
  } else if (tmpSwitchDisc === 3) {
    $(`three`);
    break tmpSwitchBreak;
  } else if (tmpSwitchDisc === 4) {
    $(`four`);
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
    const tmpIfTest$1 = tmpSwitchDisc === 2;
    if (tmpIfTest$1) {
      $(`two`);
      break tmpSwitchBreak;
    } else {
      const tmpIfTest$3 = tmpSwitchDisc === 3;
      if (tmpIfTest$3) {
        $(`three`);
        break tmpSwitchBreak;
      } else {
        const tmpIfTest$5 = tmpSwitchDisc === 4;
        if (tmpIfTest$5) {
          $(`four`);
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
const tmpSwitchDisc /*:unknown*/ = $(1);
const tmpIfTest /*:boolean*/ = tmpSwitchDisc === 0;
if (tmpIfTest) {
  $(`one`);
} else {
  const tmpIfTest$1 /*:boolean*/ = tmpSwitchDisc === 2;
  if (tmpIfTest$1) {
    $(`two`);
  } else {
    const tmpIfTest$3 /*:boolean*/ = tmpSwitchDisc === 3;
    if (tmpIfTest$3) {
      $(`three`);
    } else {
      const tmpIfTest$5 /*:boolean*/ = tmpSwitchDisc === 4;
      if (tmpIfTest$5) {
        $(`four`);
      } else {
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
  const c = a === 2;
  if (c) {
    $( "two" );
  }
  else {
    const d = a === 3;
    if (d) {
      $( "three" );
    }
    else {
      const e = a === 4;
      if (e) {
        $( "four" );
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
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
