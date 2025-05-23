# Preval test case

# hoisting_regression.md

> Function > Hoisting regression
>
>

## Input

`````js filename=intro
function f() {
  if ($) {
    return undefined;
  } else {
    
  }
  let thisrefgetslost = $();
  function incorrectlyhoisted() {
    $(thisrefgetslost);
    return undefined;
  }
  return incorrectlyhoisted
}
$(f);
`````


## Settled


`````js filename=intro
const f /*:()=>unknown*/ = function () {
  debugger;
  const incorrectlyhoisted /*:()=>undefined*/ = function () {
    debugger;
    $(thisrefgetslost);
    return undefined;
  };
  if ($) {
    return undefined;
  } else {
  }
  const thisrefgetslost /*:unknown*/ = $();
  return incorrectlyhoisted;
};
$(f);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(function () {
  const incorrectlyhoisted = function () {
    $(thisrefgetslost);
  };
  if ($) {
    return undefined;
  }
  const thisrefgetslost = $();
  return incorrectlyhoisted;
});
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  const b = function() {
    debugger;
    $( c );
    return undefined;
  };
  if ($) {
    return undefined;
  }
  const c = $();
  return b;
};
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  let incorrectlyhoisted = function () {
    debugger;
    $(thisrefgetslost);
    return undefined;
  };
  if ($) {
    return undefined;
  } else {
  }
  let thisrefgetslost = $();
  return incorrectlyhoisted;
};
$(f);
`````


## Todos triggered


None


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
