# Preval test case

# multi_break.md

> Normalize > Switch > Kinds > Multi break
>
> The simple switch is the one where every case ends explicitly, and only once, and where default is either the last case or omitted.

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

## Settled


`````js filename=intro
const tmpSwitchDisc /*:unknown*/ = $(1);
const tmpIfTest /*:boolean*/ = tmpSwitchDisc === 0;
if (tmpIfTest) {
  $(`one`);
} else {
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(1) === 0) {
  $(`one`);
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

## PST Settled
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

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
