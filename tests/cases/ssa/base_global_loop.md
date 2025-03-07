# Preval test case

# base_global_loop.md

> Ssa > Base global loop
>
> Contrived example

## Input

`````js filename=intro
let x = $(3);
$(x);
while (true) {
  $(++x);
  if (x > 5) break;
}
$(x);
`````

## Settled


`````js filename=intro
const x /*:unknown*/ = $(3);
$(x);
let tmpClusterSSA_x /*:primitive*/ = x + 1;
$(tmpClusterSSA_x);
const tmpIfTest /*:boolean*/ = tmpClusterSSA_x > 5;
if (tmpIfTest) {
} else {
  while ($LOOP_UNROLL_10) {
    tmpClusterSSA_x = tmpClusterSSA_x + 1;
    $(tmpClusterSSA_x);
    const tmpIfTest$1 /*:boolean*/ = tmpClusterSSA_x > 5;
    if (tmpIfTest$1) {
      break;
    } else {
    }
  }
}
$(tmpClusterSSA_x);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(3);
$(x);
let tmpClusterSSA_x = x + 1;
$(tmpClusterSSA_x);
if (!(tmpClusterSSA_x > 5)) {
  while (true) {
    tmpClusterSSA_x = tmpClusterSSA_x + 1;
    $(tmpClusterSSA_x);
    if (tmpClusterSSA_x > 5) {
      break;
    }
  }
}
$(tmpClusterSSA_x);
`````

## Pre Normal


`````js filename=intro
let x = $(3);
$(x);
while (true) {
  $(++x);
  if (x > 5) break;
}
$(x);
`````

## Normalized


`````js filename=intro
let x = $(3);
$(x);
while (true) {
  x = x + 1;
  let tmpCalleeParam = x;
  $(tmpCalleeParam);
  const tmpIfTest = x > 5;
  if (tmpIfTest) {
    break;
  } else {
  }
}
$(x);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 3 );
$( a );
let b = a + 1;
$( b );
const c = b > 5;
if (c) {

}
else {
  while ($LOOP_UNROLL_10) {
    b = b + 1;
    $( b );
    const d = b > 5;
    if (d) {
      break;
    }
  }
}
$( b );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 3
 - 2: 3
 - 3: 4
 - 4: 5
 - 5: 6
 - 6: 6
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
