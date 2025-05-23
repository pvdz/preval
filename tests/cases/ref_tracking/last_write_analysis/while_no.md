# Preval test case

# while_no.md

> Ref tracking > Last write analysis > While no
>
> Last write analysis tracks which reads can reach which writes. We test this through single scope SSA since that's directly depending on this analysis. These are the cases to attempt to cover all cross cases.

## Input

`````js filename=intro
let x = $('a');
$(x);
// Can SSA this because the loop does not write to it
x = $('b');
while (true) {
  if ($) {
    $('123')
  } else {
    break;  
  }
}
$(x);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(`a`);
$(x);
const tmpClusterSSA_x /*:unknown*/ = $(`b`);
if ($) {
  while ($LOOP_UNROLL_10) {
    $(`123`);
    if ($) {
    } else {
      break;
    }
  }
  $(tmpClusterSSA_x);
} else {
  $(tmpClusterSSA_x);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(`a`));
const tmpClusterSSA_x = $(`b`);
if ($) {
  while (true) {
    $(`123`);
    if (!$) {
      break;
    }
  }
  $(tmpClusterSSA_x);
} else {
  $(tmpClusterSSA_x);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "a" );
$( a );
const b = $( "b" );
if ($) {
  while ($LOOP_UNROLL_10) {
    $( "123" );
    if ($) {

    }
    else {
      break;
    }
  }
  $( b );
}
else {
  $( b );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = $(`a`);
$(x);
x = $(`b`);
while (true) {
  if ($) {
    $(`123`);
  } else {
    break;
  }
}
$(x);
`````


## Todos triggered


- (todo) Support referencing this builtin in isFree: $


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'a'
 - 2: 'a'
 - 3: 'b'
 - 4: '123'
 - 5: '123'
 - 6: '123'
 - 7: '123'
 - 8: '123'
 - 9: '123'
 - 10: '123'
 - 11: '123'
 - 12: '123'
 - 13: '123'
 - 14: '123'
 - 15: '123'
 - 16: '123'
 - 17: '123'
 - 18: '123'
 - 19: '123'
 - 20: '123'
 - 21: '123'
 - 22: '123'
 - 23: '123'
 - 24: '123'
 - 25: '123'
 - 26: '123'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
