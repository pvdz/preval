# Preval test case

# method_call_call_unknown.md

> Array > Static props > Method call call unknown
>
> Getting the length of an array can be tricky, and sometimes be done

In this case the array escapes so we bail.

## Input

`````js filename=intro
const arr = [1, 2, 3];
arr.splice.call(arr, $(1), 2, 10, 20);
$(arr.length);
`````


## Settled


`````js filename=intro
const tmpMCP /*:unknown*/ = $(1);
const arr /*:array*/ = [1, 2, 3];
$dotCall($array_splice, arr, undefined, tmpMCP, 2, 10, 20);
const tmpCalleeParam /*:number*/ = arr.length;
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCP = $(1);
const arr = [1, 2, 3];
$dotCall($array_splice, arr, undefined, tmpMCP, 2, 10, 20);
$(arr.length);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = [ 1, 2, 3 ];
$dotCall( $array_splice, b, undefined, a, 2, 10, 20 );
const c = b.length;
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const arr = [1, 2, 3];
const tmpMCOO = arr.splice;
const tmpMCF = tmpMCOO.call;
const tmpMCP = $(1);
$dotCall(tmpMCF, tmpMCOO, `call`, arr, tmpMCP, 2, 10, 20);
let tmpCalleeParam = arr.length;
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
