# Preval test case

# base.md

> Function trampoline > Call only > Base
>
> Calls to a function that only call another function should immediately call that other function instead

## Input

`````js filename=intro
function f() {
  $('inline me');
}
f();
f();
`````


## Settled


`````js filename=intro
$(`inline me`);
$(`inline me`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`inline me`);
$(`inline me`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "inline me" );
$( "inline me" );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'inline me'
 - 2: 'inline me'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
