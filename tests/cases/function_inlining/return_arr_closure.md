# Preval test case

# return_arr_closure.md

> Function inlining > Return arr closure
>
> We should be able to inline certain functions

## Input

`````js filename=intro
function g() {
  const y = $(20);
  const z = $(30);
  function f() {
    return [10, y, z];
  }
  $(f());
}
$(g());
`````


## Settled


`````js filename=intro
const y /*:unknown*/ = $(20);
const z /*:unknown*/ = $(30);
const tmpReturnArg /*:array*/ = [10, y, z];
$(tmpReturnArg);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const y = $(20);
const z = $(30);
$([10, y, z]);
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 20 );
const b = $( 30 );
const c = [ 10, a, b ];
$( c );
$( undefined );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 20
 - 2: 30
 - 3: [10, 20, 30]
 - 4: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
