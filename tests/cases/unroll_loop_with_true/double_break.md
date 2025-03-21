# Preval test case

# double_break.md

> Unroll loop with true > Double break
>
> Trying to unroll a while loop with `true` as condition.

## Input

`````js filename=intro
while (true) {
    const test = $('first');
    $('second');
    if (test) {
      break;
    } else if ($(test)) {
      break;
    } else {
      $('third');
    }
}
`````


## Settled


`````js filename=intro
const test /*:unknown*/ = $(`first`);
$(`second`);
if (test) {
} else {
  const tmpIfTest /*:unknown*/ = $(test);
  if (tmpIfTest) {
  } else {
    $(`third`);
    while ($LOOP_UNROLL_10) {
      const test$1 /*:unknown*/ = $(`first`);
      $(`second`);
      if (test$1) {
        break;
      } else {
        const tmpIfTest$1 /*:unknown*/ = $(test$1);
        if (tmpIfTest$1) {
          break;
        } else {
          $(`third`);
        }
      }
    }
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const test = $(`first`);
$(`second`);
if (!test) {
  if (!$(test)) {
    $(`third`);
    while (true) {
      const test$1 = $(`first`);
      $(`second`);
      if (test$1) {
        break;
      } else {
        if ($(test$1)) {
          break;
        } else {
          $(`third`);
        }
      }
    }
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "first" );
$( "second" );
if (a) {

}
else {
  const b = $( a );
  if (b) {

  }
  else {
    $( "third" );
    while ($LOOP_UNROLL_10) {
      const c = $( "first" );
      $( "second" );
      if (c) {
        break;
      }
      else {
        const d = $( c );
        if (d) {
          break;
        }
        else {
          $( "third" );
        }
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
 - 1: 'first'
 - 2: 'second'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
