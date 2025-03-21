# Preval test case

# closure.md

> Locking > Closure
>
> A func that is being cleared after being called once is "locked". I guess.

## Input

`````js filename=intro
function f() {
  $('call me once');
}
function g() {
  let x = f;
  const t = function(){
    if (f) {
      f();
      f = false;
    }
  }
  return t;
}
$(g()());
`````


## Settled


`````js filename=intro
$(`call me once`);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`call me once`);
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "call me once" );
$( undefined );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'call me once'
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
