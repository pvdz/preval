# Preval test case

# default_not_last.md

> Normalize > Switch > Kinds > Default not last
>
> The simple switch is the one where every case ends explicitly, and only once, and where default is either the last case or omitted.

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
    break;
  default:
    $('def');
}
`````


## Settled


`````js filename=intro
const tmpSwitchDisc /*:unknown*/ = $(1);
const tmpIfTest /*:boolean*/ = tmpSwitchDisc === 0;
if (tmpIfTest) {
  $(`one`);
} else {
  const tmpIfTest$1 /*:boolean*/ = tmpSwitchDisc === 1;
  if (tmpIfTest$1) {
    $(`two`);
  } else {
    const tmpIfTest$3 /*:boolean*/ = tmpSwitchDisc === 2;
    if (tmpIfTest$3) {
      $(`three`);
    } else {
      const tmpIfTest$5 /*:boolean*/ = tmpSwitchDisc === 3;
      if (tmpIfTest$5) {
        $(`four`);
      } else {
        $(`def`);
      }
    }
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpSwitchDisc = $(1);
if (tmpSwitchDisc === 0) {
  $(`one`);
} else {
  if (tmpSwitchDisc === 1) {
    $(`two`);
  } else {
    if (tmpSwitchDisc === 2) {
      $(`three`);
    } else {
      if (tmpSwitchDisc === 3) {
        $(`four`);
      } else {
        $(`def`);
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


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 'two'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
