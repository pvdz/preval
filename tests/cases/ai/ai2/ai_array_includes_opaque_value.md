# Preval test case

# ai_array_includes_opaque_value.md

> Ai > Ai2 > Ai array includes opaque value
>
> Test: Array.prototype.includes with an opaque value and opaque fromIndex.

## Input

`````js filename=intro
// Expected: Includes check proceeds with opaque values.
let arr = [$('a'), 'b', $('c')];
let searchVal = $('opaque_search_value');
let fromIdx = $('opaque_from_index');
let hasIt = arr.includes(searchVal, fromIdx);
$('includes_result', hasIt);
`````


## Settled


`````js filename=intro
const tmpArrElement /*:unknown*/ = $(`a`);
const tmpArrElement$3 /*:unknown*/ = $(`c`);
const searchVal /*:unknown*/ = $(`opaque_search_value`);
const fromIdx /*:unknown*/ = $(`opaque_from_index`);
const arr /*:array*/ = [tmpArrElement, `b`, tmpArrElement$3];
const hasIt /*:boolean*/ = $dotCall($array_includes, arr, `includes`, searchVal, fromIdx);
$(`includes_result`, hasIt);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpArrElement = $(`a`);
const tmpArrElement$3 = $(`c`);
const searchVal = $(`opaque_search_value`);
const fromIdx = $(`opaque_from_index`);
$(`includes_result`, $dotCall($array_includes, [tmpArrElement, `b`, tmpArrElement$3], `includes`, searchVal, fromIdx));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "a" );
const b = $( "c" );
const c = $( "opaque_search_value" );
const d = $( "opaque_from_index" );
const e = [ a, "b", b ];
const f = $dotCall( $array_includes, e, "includes", c, d );
$( "includes_result", f );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpArrElement = $(`a`);
const tmpArrElement$1 = `b`;
const tmpArrElement$3 = $(`c`);
let arr = [tmpArrElement, tmpArrElement$1, tmpArrElement$3];
let searchVal = $(`opaque_search_value`);
let fromIdx = $(`opaque_from_index`);
const tmpMCF = arr.includes;
let hasIt = $dotCall(tmpMCF, arr, `includes`, searchVal, fromIdx);
$(`includes_result`, hasIt);
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $array_includes
- (todo) arr mutation may be able to inline this method: $array_includes
- (todo) arr mutation may be able to inline this method: tmpMCF
- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement
- (todo) type trackeed tricks can possibly support resolving the type for calling this builtin method symbol: $array_includes


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'a'
 - 2: 'c'
 - 3: 'opaque_search_value'
 - 4: 'opaque_from_index'
 - 5: 'includes_result', false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
