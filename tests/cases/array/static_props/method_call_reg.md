# Preval test case

# method_call_reg.md

> Array > Static props > Method call reg
>
> Getting the length of an array can be tricky, and sometimes be done

We could technically support this kind of thing in a subset of situations. But most of the time we'll just bail.

## Input

`````js filename=intro
const arr = [1, 2, 3];
arr.splice(1, 2, 20);
$(arr.length);
`````


## Settled


`````js filename=intro
const arr /*:array*/ = [1, 2, 3];
arr.splice(1, 2, 20);
const tmpCalleeParam /*:number*/ = arr.length;
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const arr = [1, 2, 3];
arr.splice(1, 2, 20);
$(arr.length);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 1, 2, 3 ];
a.splice( 1, 2, 20 );
const b = a.length;
$( b );
`````


## Todos triggered


- type trackeed tricks can possibly support resolving the type for calling this builtin method symbol: $array_splice


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
