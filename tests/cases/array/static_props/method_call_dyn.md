# Preval test case

# method_call_dyn.md

> Array > Static props > Method call dyn
>
> Getting the length of an array can be tricky, and sometimes be done

We have no idea whether anything is happening to the array so we must bail.

## Input

`````js filename=intro
const arr = [1, 2, 3];
arr[$('splice')](1, 2, 20);
$(arr.length);
`````


## Settled


`````js filename=intro
const tmpCallCompProp /*:unknown*/ = $(`splice`);
const arr /*:array*/ = [1, 2, 3];
arr[tmpCallCompProp](1, 2, 20);
const tmpCalleeParam /*:number*/ = arr.length;
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCallCompProp = $(`splice`);
const arr = [1, 2, 3];
arr[tmpCallCompProp](1, 2, 20);
$(arr.length);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "splice" );
const b = [ 1, 2, 3 ];
b[ a ]( 1, 2, 20 );
const c = b.length;
$( c );
`````


## Todos triggered


- inline computed array property read


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'splice'
 - 2: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
