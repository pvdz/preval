# Preval test case

# while.md

> Normalize > Unique assign > While
>
> The normalization step should make it so that each binding is only assigned to once. It should create fresh bindings for every mutation.

## Input

`````js filename=intro
let a = $(1);
while (a < 10) {
  a += 1;
  $(a);
}
$(a);
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $(1);
const tmpIfTest /*:boolean*/ = a < 10;
if (tmpIfTest) {
  let tmpClusterSSA_a /*:primitive*/ = a + 1;
  while ($LOOP_UNROLL_10) {
    $(tmpClusterSSA_a);
    const tmpIfTest$1 /*:boolean*/ = tmpClusterSSA_a < 10;
    if (tmpIfTest$1) {
      tmpClusterSSA_a = tmpClusterSSA_a + 1;
    } else {
      break;
    }
  }
  $(tmpClusterSSA_a);
} else {
  $(a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $(1);
if (a < 10) {
  let tmpClusterSSA_a = a + 1;
  while (true) {
    $(tmpClusterSSA_a);
    if (tmpClusterSSA_a < 10) {
      tmpClusterSSA_a = tmpClusterSSA_a + 1;
    } else {
      break;
    }
  }
  $(tmpClusterSSA_a);
} else {
  $(a);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = a < 10;
if (b) {
  let c = a + 1;
  while ($LOOP_UNROLL_10) {
    $( c );
    const d = c < 10;
    if (d) {
      c = c + 1;
    }
    else {
      break;
    }
  }
  $( c );
}
else {
  $( a );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 3
 - 4: 4
 - 5: 5
 - 6: 6
 - 7: 7
 - 8: 8
 - 9: 9
 - 10: 10
 - 11: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
