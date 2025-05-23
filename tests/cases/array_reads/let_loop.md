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
let arr /*:array*/ = [2, 3, 4];
$(2);
if ($) {
  $(arr);
} else {
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
let arr = [2, 3, 4];
$(2);
if ($) {
  $(arr);
} else {
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
let a = [ 2, 3, 4 ];
$( 2 );
if ($) {
  $( a );
}
else {
  while ($LOOP_UNROLL_10) {
    a = [ 2, 3, 4 ];
    $( 2 );
    if ($) {
      break;
    }
  }
  $( a );
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
