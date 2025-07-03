# Preval test case

# let_loop.md

> Array reads > Let loop
>
> Inlining array properties

## Input

`````js filename=intro
let arr = [1, 2, 3];
while (true) {
  arr = [2, 3, 4];
  $(arr[0]);
  if ($) break;
}
$(arr);
`````


## Settled


`````js filename=intro
$(2);
if ($) {
  const tmpClusterSSA_arr /*:array*/ /*truthy*/ = [2, 3, 4];
  $(tmpClusterSSA_arr);
} else {
  let arr /*:unknown*/ = undefined;
  while ($LOOP_UNROLL_10) {
    arr = [2, 3, 4];
    $(2);
    if ($) {
      break;
    } else {
    }
  }
  $(arr);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(2);
if ($) {
  $([2, 3, 4]);
} else {
  let arr = undefined;
  while (true) {
    arr = [2, 3, 4];
    $(2);
    if ($) {
      break;
    }
  }
  $(arr);
}
`````


## PST Settled
With rename=true

`````js filename=intro
$( 2 );
if ($) {
  const a = [ 2, 3, 4 ];
  $( a );
}
else {
  let b = undefined;
  while ($LOOP_UNROLL_10) {
    b = [ 2, 3, 4 ];
    $( 2 );
    if ($) {
      break;
    }
  }
  $( b );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let arr = [1, 2, 3];
while (true) {
  arr = [2, 3, 4];
  let tmpCalleeParam = arr[0];
  $(tmpCalleeParam);
  if ($) {
    break;
  } else {
  }
}
$(arr);
`````


## Todos triggered


- (todo) do we want to support ArrayExpression as expression statement in free loops?
- (todo) support array reads statement type ExpressionStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2
 - 2: [2, 3, 4]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
