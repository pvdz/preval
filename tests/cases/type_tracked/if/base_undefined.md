# Preval test case

# base_undefined.md

> Type tracked > If > Base undefined
>
> Even if we don't know about the concrete value of a binding, sometimes the type is sufficient for optimization

## Input

`````js filename=intro
function f(x) {
  if (x) {
    $('false');
  } else {
    $('pass');
  }
}
f();
`````


## Settled


`````js filename=intro
$(`pass`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`pass`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "pass" );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'pass'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
