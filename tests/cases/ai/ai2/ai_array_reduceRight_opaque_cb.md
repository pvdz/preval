# Preval test case

# ai_array_reduceRight_opaque_cb.md

> Ai > Ai2 > Ai array reduceRight opaque cb
>
> Test: Array.prototype.reduceRight with opaque callback.

## Input

`````js filename=intro
// Expected: ReduceRight proceeds with opaque callback.
let arr = [$('a'), $('b')];
let cb = $('opaque_reducer_right');
let result = arr.reduceRight(cb, $('initial'));
$('reduceRight_result', result);
`````


## Settled


`````js filename=intro
const tmpArrElement /*:unknown*/ = $(`a`);
const tmpArrElement$1 /*:unknown*/ = $(`b`);
const cb /*:unknown*/ = $(`opaque_reducer_right`);
const tmpMCP /*:unknown*/ = $(`initial`);
const arr /*:array*/ /*truthy*/ = [tmpArrElement, tmpArrElement$1];
const result /*:array*/ /*truthy*/ = $dotCall($array_reduceRight, arr, `reduceRight`, cb, tmpMCP);
$(`reduceRight_result`, result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpArrElement = $(`a`);
const tmpArrElement$1 = $(`b`);
const cb = $(`opaque_reducer_right`);
const tmpMCP = $(`initial`);
$(`reduceRight_result`, $dotCall($array_reduceRight, [tmpArrElement, tmpArrElement$1], `reduceRight`, cb, tmpMCP));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "a" );
const b = $( "b" );
const c = $( "opaque_reducer_right" );
const d = $( "initial" );
const e = [ a, b ];
const f = $dotCall( $array_reduceRight, e, "reduceRight", c, d );
$( "reduceRight_result", f );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpArrElement = $(`a`);
const tmpArrElement$1 = $(`b`);
let arr = [tmpArrElement, tmpArrElement$1];
let cb = $(`opaque_reducer_right`);
const tmpMCF = arr.reduceRight;
const tmpMCP = $(`initial`);
let result = $dotCall(tmpMCF, arr, `reduceRight`, cb, tmpMCP);
$(`reduceRight_result`, result);
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $array_reduceRight
- (todo) arr mutation may be able to inline this method: $array_reduceRight
- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement
- (todo) type trackeed tricks can possibly support static $array_reduceRight


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'a'
 - 2: 'b'
 - 3: 'opaque_reducer_right'
 - 4: 'initial'
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
