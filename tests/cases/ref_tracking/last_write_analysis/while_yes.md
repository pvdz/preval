# Preval test case

# while_yes.md

> Ref tracking > Last write analysis > While yes
>
> Last write analysis tracks which reads can reach which writes. We test this through single scope SSA since that's directly depending on this analysis. These are the cases to attempt to cover all cross cases.

## Input

`````js filename=intro
// Should be able to rename the binding since this write can only be observed by the next read
let x = $('a');
$(x);
// Can not SSA this because the loop writes to it, too
x = $('b');
while (true) {
  if (x) {
    x = $(0);
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
let tmpClusterSSA_x /*:unknown*/ = $(`b`);
if (tmpClusterSSA_x) {
  while ($LOOP_UNROLL_10) {
    tmpClusterSSA_x = $(0);
    if (tmpClusterSSA_x) {
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
let tmpClusterSSA_x = $(`b`);
if (tmpClusterSSA_x) {
  while (true) {
    tmpClusterSSA_x = $(0);
    if (!tmpClusterSSA_x) {
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
let b = $( "b" );
if (b) {
  while ($LOOP_UNROLL_10) {
    b = $( 0 );
    if (b) {

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


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'a'
 - 2: 'a'
 - 3: 'b'
 - 4: 0
 - 5: 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
