# Preval test case

# same_func.md

> One timers > Assign > Same func
>
> What happens when the algo has to inline a call into the same func? Index staleness check.

## Input

`````js filename=intro
let x = $(100);
function closure() {
  // This serves to keep x from being eliminated/SSA'd
  return x;
}
$(closure());

function f() {
  function a() { $('a'); }
  a();
  function b() { $('b'); }
  b();
}

x = f(); // This x should not be SSA'd due to the closure
$(x);
$(closure());
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(100);
$(x);
$(`a`);
$(`b`);
$(undefined);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(100));
$(`a`);
$(`b`);
$(undefined);
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
$( a );
$( "a" );
$( "b" );
$( undefined );
$( undefined );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: 100
 - 3: 'a'
 - 4: 'b'
 - 5: undefined
 - 6: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
