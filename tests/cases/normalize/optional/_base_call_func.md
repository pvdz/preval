# Preval test case

# _base_call_func.md

> Normalize > Optional > Base call func
>
> Simple example

## Input

`````js filename=intro
function f(...args){ $('f', args); }
$(f?.(1, 2, 3));
`````


## Settled


`````js filename=intro
const f /*:(array)=>undefined*/ = function (...$$0 /*:array*/) {
  const args /*:array*/ = $$0;
  debugger;
  $(`f`, args);
  return undefined;
};
f(1, 2, 3);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function (...$$0 /*:array*/) {
  $(`f`, $$0);
};
f(1, 2, 3);
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function($$0 ) {
  const b = $$0;
  debugger;
  $( "f", b );
  return undefined;
};
a( 1, 2, 3 );
$( undefined );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function (...$$0 /*:array*/) {
  let args = $$0;
  debugger;
  $(`f`, args);
  return undefined;
};
let tmpCalleeParam = undefined;
const tmpChainRootCall = f;
const tmpIfTest = tmpChainRootCall != null;
if (tmpIfTest) {
  const tmpChainElementCall = tmpChainRootCall(1, 2, 3);
  tmpCalleeParam = tmpChainElementCall;
  $(tmpChainElementCall);
} else {
  $(tmpCalleeParam);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'f', [1, 2, 3]
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
