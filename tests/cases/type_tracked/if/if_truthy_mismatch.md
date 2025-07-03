# Preval test case

# if_truthy_mismatch.md

> Type tracked > If > If truthy mismatch
>
> This caused a crash in type_tracked tricks because the param of g was
> marked as being an array when it wasn't necessarily.

## Input

`````js filename=intro
const f = function() {
  const arr = [ $ ];
  const m = g(arr);
  $(m);
  const n = g($);
  $(n);
  return undefined;
};
const g = function(x) {
  if (x) {
    return $;
  } else {
    return undefined;
  }
};
$(f);

`````


## Settled


`````js filename=intro
const f /*:()=>unknown*/ = function () {
  debugger;
  $($);
  if ($) {
    $($);
    return undefined;
  } else {
    $(undefined);
    return undefined;
  }
};
$(f);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(function () {
  $($);
  if ($) {
    $($);
  } else {
    $(undefined);
  }
});
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  $( $ );
  if ($) {
    $( $ );
    return undefined;
  }
  else {
    $( undefined );
    return undefined;
  }
};
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const f = function () {
  debugger;
  const arr = [$];
  const m = g(arr);
  $(m);
  const n = g($);
  $(n);
  return undefined;
};
const g = function ($$0) {
  let x = $$0;
  debugger;
  if (x) {
    return $;
  } else {
    return undefined;
  }
};
$(f);
`````


## Todos triggered


- (todo) array reads var statement with init CallExpression


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
