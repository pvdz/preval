# Preval test case

# closure_to_param.md

> Static arg ops > Assignment > Closure to param

## Input

`````js filename=intro
let a = 1;
function f(b) {
  b = a;
  $(b);
}
$(f);
f(10);
f(11);
f(12);
$(3);
`````


## Settled


`````js filename=intro
const f /*:()=>unknown*/ = function () {
  debugger;
  $(1);
  return undefined;
};
$(f);
$(1);
$(1);
$(1);
$(3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(function () {
  $(1);
});
$(1);
$(1);
$(1);
$(3);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  $( 1 );
  return undefined;
};
$( a );
$( 1 );
$( 1 );
$( 1 );
$( 3 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function ($$0) {
  let b = $$0;
  debugger;
  b = a;
  $(a);
  return undefined;
};
let a = 1;
$(f);
f(10);
f(11);
f(12);
$(3);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '<function>'
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
