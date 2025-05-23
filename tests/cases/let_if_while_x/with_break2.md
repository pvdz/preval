# Preval test case

# with_break2.md

> Let if while x > With break2
>
> This variation does a break rather than updating the test. I think it should be normalized by a different trick because
> since count is no longer updated after the initial check, it may as well be an infinite loop. So the while loop should
> be moved inside the consequent branch and the while test should be come the init of count (to preserve our unroll counter)

## Input

`````js filename=intro
const s = $(10);
let count = $LOOP_UNROLL_10;
$('before');
let wat = s | 10;
let chk = $(true);
if (chk) {
  while (count) {
    $('inside');
    wat = wat | 10;
    chk = $(true);
    if (chk) {
    } else {
      break;
    }
  }
} else {
  count = false;
}
$(wat);
`````


## Settled


`````js filename=intro
const s /*:unknown*/ = $(10);
$(`before`);
const wat /*:number*/ = s | 10;
const chk /*:unknown*/ = $(true);
if (chk) {
  $(`inside`);
  let tmpClusterSSA_wat /*:number*/ = wat | 10;
  const tmpClusterSSA_chk /*:unknown*/ = $(true);
  if (tmpClusterSSA_chk) {
    while ($LOOP_UNROLL_10) {
      $(`inside`);
      tmpClusterSSA_wat = tmpClusterSSA_wat | 10;
      const tmpClusterSSA_chk$1 /*:unknown*/ = $(true);
      if (tmpClusterSSA_chk$1) {
      } else {
        break;
      }
    }
    $(tmpClusterSSA_wat);
  } else {
    $(tmpClusterSSA_wat);
  }
} else {
  $(wat);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const s = $(10);
$(`before`);
const wat = s | 10;
if ($(true)) {
  $(`inside`);
  let tmpClusterSSA_wat = wat | 10;
  if ($(true)) {
    while (true) {
      $(`inside`);
      tmpClusterSSA_wat = tmpClusterSSA_wat | 10;
      if (!$(true)) {
        break;
      }
    }
    $(tmpClusterSSA_wat);
  } else {
    $(tmpClusterSSA_wat);
  }
} else {
  $(wat);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 10 );
$( "before" );
const b = a | 10;
const c = $( true );
if (c) {
  $( "inside" );
  let d = b | 10;
  const e = $( true );
  if (e) {
    while ($LOOP_UNROLL_10) {
      $( "inside" );
      d = d | 10;
      const f = $( true );
      if (f) {

      }
      else {
        break;
      }
    }
    $( d );
  }
  else {
    $( d );
  }
}
else {
  $( b );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const s = $(10);
let count = true;
$(`before`);
let wat = s | 10;
let chk = $(true);
if (chk) {
  while (true) {
    if (count) {
      $(`inside`);
      wat = wat | 10;
      chk = $(true);
      if (chk) {
      } else {
        break;
      }
    } else {
      break;
    }
  }
  $(wat);
} else {
  count = false;
  $(wat);
}
`````


## Todos triggered


- (todo) while constant managed to escape


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 10
 - 2: 'before'
 - 3: true
 - 4: 'inside'
 - 5: true
 - 6: 'inside'
 - 7: true
 - 8: 'inside'
 - 9: true
 - 10: 'inside'
 - 11: true
 - 12: 'inside'
 - 13: true
 - 14: 'inside'
 - 15: true
 - 16: 'inside'
 - 17: true
 - 18: 'inside'
 - 19: true
 - 20: 'inside'
 - 21: true
 - 22: 'inside'
 - 23: true
 - 24: 'inside'
 - 25: true
 - 26: 'inside'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
