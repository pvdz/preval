# Preval test case

# if_else_partial.md

> Normalize > Dce > Break > If else partial
>
> Any statements that follow a return in the same parent should be eliminated.

## Input

`````js filename=intro
while ($(true)) {
  if ($(1)) {
    break;
    $('fail');
  }
  $('keep, do not eval');
}
$('after');
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(true);
if (tmpIfTest) {
  const tmpIfTest$1 /*:unknown*/ = $(1);
  if (tmpIfTest$1) {
    $(`after`);
  } else {
    $(`keep, do not eval`);
    while ($LOOP_UNROLL_10) {
      const tmpIfTest$2 /*:unknown*/ = $(true);
      if (tmpIfTest$2) {
        const tmpIfTest$4 /*:unknown*/ = $(1);
        if (tmpIfTest$4) {
          break;
        } else {
          $(`keep, do not eval`);
        }
      } else {
        break;
      }
    }
    $(`after`);
  }
} else {
  $(`after`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(true)) {
  if ($(1)) {
    $(`after`);
  } else {
    $(`keep, do not eval`);
    while (true) {
      if ($(true)) {
        if ($(1)) {
          break;
        } else {
          $(`keep, do not eval`);
        }
      } else {
        break;
      }
    }
    $(`after`);
  }
} else {
  $(`after`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( true );
if (a) {
  const b = $( 1 );
  if (b) {
    $( "after" );
  }
  else {
    $( "keep, do not eval" );
    while ($LOOP_UNROLL_10) {
      const c = $( true );
      if (c) {
        const d = $( 1 );
        if (d) {
          break;
        }
        else {
          $( "keep, do not eval" );
        }
      }
      else {
        break;
      }
    }
    $( "after" );
  }
}
else {
  $( "after" );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - 2: 1
 - 3: 'after'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
