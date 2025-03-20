# Preval test case

# param_is_primitive.md

> Static arg ops > Assignment > Param is primitive

## Input

`````js filename=intro
let a = 1;
function f(b) {
  b = 100;
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
const f /*:(unused)=>unknown*/ = function ($$0) {
  debugger;
  $(100);
  return undefined;
};
$(f);
$(100);
$(100);
$(100);
$(3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(function ($$0) {
  $(100);
});
$(100);
$(100);
$(100);
$(3);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function($$0 ) {
  debugger;
  $( 100 );
  return undefined;
};
$( a );
$( 100 );
$( 100 );
$( 100 );
$( 3 );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '<function>'
 - 2: 100
 - 3: 100
 - 4: 100
 - 5: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
