# Preval test case

# battle.md

> Normalize > Hoisting > Func > Battle
>
> Who wins?

## Input

`````js filename=intro
function top() {
  function a() { $(1); }
  function a() { $(2); }
  var a;
  $(3);
  function a() { $(4); }
  $(5);
  a();
  $(6);
}
$(top());

`````


## Settled


`````js filename=intro
$(3);
$(5);
$(4);
$(6);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(3);
$(5);
$(4);
$(6);
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 3 );
$( 5 );
$( 4 );
$( 6 );
$( undefined );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 3
 - 2: 5
 - 3: 4
 - 4: 6
 - 5: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
