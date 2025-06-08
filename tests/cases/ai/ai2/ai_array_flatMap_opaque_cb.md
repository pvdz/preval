# Preval test case

# ai_array_flatMap_opaque_cb.md

> Ai > Ai2 > Ai array flatMap opaque cb
>
> Test: Array.prototype.flatMap with an opaque callback.

## Input

`````js filename=intro
// Expected: flatMap uses opaque callback, result is flattened.
let arr = [$('itemA')];
let cb = $('opaque_flatMap_callback'); // cb might return an array or an opaque value
let result = arr.flatMap(cb);
$('flatMap_result', result);
`````


## Settled


`````js filename=intro
const tmpArrElement /*:unknown*/ = $(`itemA`);
const cb /*:unknown*/ = $(`opaque_flatMap_callback`);
const arr /*:array*/ /*truthy*/ = [tmpArrElement];
const result /*:array*/ /*truthy*/ = $dotCall($array_flatMap, arr, `flatMap`, cb);
$(`flatMap_result`, result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpArrElement = $(`itemA`);
const cb = $(`opaque_flatMap_callback`);
$(`flatMap_result`, $dotCall($array_flatMap, [tmpArrElement], `flatMap`, cb));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "itemA" );
const b = $( "opaque_flatMap_callback" );
const c = [ a ];
const d = $dotCall( $array_flatMap, c, "flatMap", b );
$( "flatMap_result", d );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpArrElement = $(`itemA`);
let arr = [tmpArrElement];
let cb = $(`opaque_flatMap_callback`);
const tmpMCF = arr.flatMap;
let result = $dotCall(tmpMCF, arr, `flatMap`, cb);
$(`flatMap_result`, result);
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $array_flatMap
- (todo) arr mutation may be able to inline this method: $array_flatMap
- (todo) arr mutation may be able to inline this method: tmpMCF
- (todo) support $array_flatmap with arguments?
- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'itemA'
 - 2: 'opaque_flatMap_callback'
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
