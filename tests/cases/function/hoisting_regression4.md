# Preval test case

# hoisting_regression4.md

> Function > Hoisting regression4
>
>

## Input

`````js filename=intro
  const f = function() {
  debugger;
  const incorrectlyhoisted = function() {
    debugger;
    $(thisrefgetslost); // wompwomp
    return undefined;
  };
  if ($) {
    return undefined;
  } else {
    $(`not a decl`);
    const thisrefgetslost = $();
    return incorrectlyhoisted;
  }
};
$(f);
`````


## Settled


`````js filename=intro
const incorrectlyhoisted /*:()=>unknown*/ = function () {
  debugger;
  $(thisrefgetslost);
  return undefined;
};
const f /*:()=>unknown*/ = function () {
  debugger;
  if ($) {
    return undefined;
  } else {
    $(`not a decl`);
    $();
    return incorrectlyhoisted;
  }
};
$(f);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const incorrectlyhoisted = function () {
  $(thisrefgetslost);
};
$(function () {
  if (!$) {
    $(`not a decl`);
    $();
    return incorrectlyhoisted;
  }
});
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  $( thisrefgetslost );
  return undefined;
};
const b = function() {
  debugger;
  if ($) {
    return undefined;
  }
  else {
    $( "not a decl" );
    $();
    return a;
  }
};
$( b );
`````


## Todos triggered


None


## Globals


BAD@! Found 1 implicit global bindings:

thisrefgetslost


## Runtime Outcome


Should call `$` with:
 - 1: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
