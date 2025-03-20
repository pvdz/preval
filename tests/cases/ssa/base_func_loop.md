# Preval test case

# base_func_loop.md

> Ssa > Base func loop
>
> Contrived example

## Input

`````js filename=intro
function f() {
    let x = $(3);
    $(x);
    while (true) {
      $(++x);
      if (x > 5) break;
    }
    $(x);
}
if ($) $(f()); // The branching prevents certain flattening
`````


## Settled


`````js filename=intro
if ($) {
  const x /*:unknown*/ = $(3);
  $(x);
  const tmpPostUpdArgIdent /*:number*/ = $coerce(x, `number`);
  let tmpClusterSSA_x /*:number*/ = tmpPostUpdArgIdent + 1;
  $(tmpClusterSSA_x);
  const tmpIfTest /*:boolean*/ = tmpClusterSSA_x > 5;
  if (tmpIfTest) {
    $(tmpClusterSSA_x);
    $(undefined);
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
    $(tmpClusterSSA_x);
    $(undefined);
  }
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($) {
  const x = $(3);
  $(x);
  let tmpClusterSSA_x = $coerce(x, `number`) + 1;
  $(tmpClusterSSA_x);
  if (tmpClusterSSA_x > 5) {
    $(tmpClusterSSA_x);
    $(undefined);
  } else {
    while (true) {
      tmpClusterSSA_x = tmpClusterSSA_x + 1;
      $(tmpClusterSSA_x);
      if (tmpClusterSSA_x > 5) {
        break;
      }
    }
    $(tmpClusterSSA_x);
    $(undefined);
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
if ($) {
  const a = $( 3 );
  $( a );
  const b = $coerce( a, "number" );
  let c = b + 1;
  $( c );
  const d = c > 5;
  if (d) {
    $( c );
    $( undefined );
  }
  else {
    while ($LOOP_UNROLL_10) {
      c = c + 1;
      $( c );
      const e = c > 5;
      if (e) {
        break;
      }
    }
    $( c );
    $( undefined );
  }
}
`````


## Todos triggered


- Support non-primitive in first arg to $coerce


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
 - 7: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
