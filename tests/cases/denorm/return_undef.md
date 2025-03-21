# Preval test case

# return_undef.md

> Denorm > Return undef
>
>

## Input

`````js filename=intro
$(() => {})
$(() => x ? void $(1) : void $(2));
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:()=>unknown*/ = function () {
  debugger;
  return undefined;
};
$(tmpCalleeParam);
const tmpCalleeParam$1 /*:()=>unknown*/ = function () {
  debugger;
  if (x) {
    $(1);
    return undefined;
  } else {
    $(2);
    return undefined;
  }
};
$(tmpCalleeParam$1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(function () {});
$(function () {
  if (x) {
    $(1);
  } else {
    $(2);
  }
});
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  return undefined;
};
$( a );
const b = function() {
  debugger;
  if (x) {
    $( 1 );
    return undefined;
  }
  else {
    $( 2 );
    return undefined;
  }
};
$( b );
`````


## Todos triggered


None


## Globals


BAD@! Found 1 implicit global bindings:

x


## Runtime Outcome


Should call `$` with:
 - 1: '<function>'
 - 2: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
