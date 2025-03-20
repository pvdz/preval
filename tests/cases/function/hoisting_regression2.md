# Preval test case

# hoisting_regression2.md

> Function > Hoisting regression2
>
>

## Input

`````js filename=intro
function f() {
  if ($) {
    return undefined;
  } else {
    
  }
  $('not a decl');
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
    $(`not a decl`);
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
  } else {
    $(`not a decl`);
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
  else {
    $( "not a decl" );
  }
  const c = $();
  return b;
};
$( a );
`````


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
