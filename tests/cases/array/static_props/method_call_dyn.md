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
const tmpMCCP /*:unknown*/ = $(`splice`);
const arr /*:array*/ = [1, 2, 3];
const tmpMCF /*:unknown*/ = arr[tmpMCCP];
$dotCall(tmpMCF, arr, undefined, 1, 2, 20);
const tmpCalleeParam /*:number*/ = arr.length;
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCCP = $(`splice`);
const arr = [1, 2, 3];
arr[tmpMCCP](1, 2, 20);
$(arr.length);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "splice" );
const b = [ 1, 2, 3 ];
const c = b[ a ];
$dotCall( c, b, undefined, 1, 2, 20 );
const d = b.length;
$( d );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const arr = [1, 2, 3];
const tmpMCCO = arr;
const tmpMCCP = $(`splice`);
const tmpMCF = tmpMCCO[tmpMCCP];
$dotCall(tmpMCF, tmpMCCO, undefined, 1, 2, 20);
let tmpCalleeParam = arr.length;
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement


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
