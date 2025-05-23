# Preval test case

# base.md

> Static arg ops > If > Base

## Input

`````js filename=intro
const f = function (c) {
  if (c) {
    $(undefined);
    const x = [c];
    return x;
  } else {
    return undefined;
  }
};
const tmpCalleeParam = f($);
$(tmpCalleeParam);
`````


## Settled


`````js filename=intro
$(undefined);
if ($) {
  const tmpCalleeParam /*:array*/ = [$];
  $(tmpCalleeParam);
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(undefined);
if ($) {
  $([$]);
}
`````


## PST Settled
With rename=true

`````js filename=intro
$( undefined );
if ($) {
  const a = [ $ ];
  $( a );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const f = function ($$0) {
  let c = $$0;
  debugger;
  if (c) {
    $(undefined);
    const x = [c];
    return x;
  } else {
    return undefined;
  }
};
const tmpCalleeParam = f($);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) support array reads statement type EmptyStatement
- (todo) support array reads statement type ExpressionStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: undefined
 - 2: ['<$>']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
