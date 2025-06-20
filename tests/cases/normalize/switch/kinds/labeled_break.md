# Preval test case

# labeled_break.md

> Normalize > Switch > Kinds > Labeled break
>
> The simple switch is the one where every case ends explicitly, and only once, and where default is either the last case or omitted.

## Input

`````js filename=intro
foo: {
  if ($(1)) {
    switch ($(1)) {
      case 0:
        $('one');
        break;
      case 0:
        $('one');
        break foo;
      case 0:
        $('one');
        break;
      case 0:
        $('one');
        break;
    }
    $('fail');
  }
}
$('pass');
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  const tmpSwitchDisc /*:unknown*/ = $(1);
  const tmpIfTest$1 /*:boolean*/ = tmpSwitchDisc === 0;
  if (tmpIfTest$1) {
    $(`one`);
    $(`fail`);
    $(`pass`);
  } else {
    $(`fail`);
    $(`pass`);
  }
} else {
  $(`pass`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(1)) {
  if ($(1) === 0) {
    $(`one`);
    $(`fail`);
    $(`pass`);
  } else {
    $(`fail`);
    $(`pass`);
  }
} else {
  $(`pass`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {
  const b = $( 1 );
  const c = b === 0;
  if (c) {
    $( "one" );
    $( "fail" );
    $( "pass" );
  }
  else {
    $( "fail" );
    $( "pass" );
  }
}
else {
  $( "pass" );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
foo: {
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    tmpSwitchBreak: {
      const tmpSwitchDisc = $(1);
      const tmpIfTest$1 = tmpSwitchDisc === 0;
      if (tmpIfTest$1) {
        $(`one`);
        break tmpSwitchBreak;
      } else {
        const tmpIfTest$3 = tmpSwitchDisc === 0;
        if (tmpIfTest$3) {
          $(`one`);
          break foo;
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
    $(`fail`);
  } else {
  }
}
$(`pass`);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 'fail'
 - 4: 'pass'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
