# Preval test case

# ai_rule300_array_destructuring_opaque_source.md

> Ai > Ai3 > Ai rule300 array destructuring opaque source
>
> Test: Array destructuring assignment from an opaque array.

## Input

`````js filename=intro
// Expected: Variables a, b should be opaque after destructuring.
let source = $('source', [1, 2, 3]);
let [a, b] = source;
$('a_val', a);
$('b_val', b);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:array*/ /*truthy*/ = [1, 2, 3];
const source /*:unknown*/ = $(`source`, tmpCalleeParam);
const tmpArrPatternSplat /*:array*/ /*truthy*/ = [...source];
const a /*:unknown*/ = tmpArrPatternSplat[0];
const b /*:unknown*/ = tmpArrPatternSplat[1];
$(`a_val`, a);
$(`b_val`, b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const source = $(`source`, [1, 2, 3]);
const tmpArrPatternSplat = [...source];
const a = tmpArrPatternSplat[0];
const b = tmpArrPatternSplat[1];
$(`a_val`, a);
$(`b_val`, b);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 1, 2, 3 ];
const b = $( "source", a );
const c = [ ...b ];
const d = c[ 0 ];
const e = c[ 1 ];
$( "a_val", d );
$( "b_val", e );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = [1, 2, 3];
let source = $(`source`, tmpCalleeParam);
let tmpBindingPatternArrRoot = source;
let tmpArrPatternSplat = [...tmpBindingPatternArrRoot];
let a = tmpArrPatternSplat[0];
let b = tmpArrPatternSplat[1];
$(`a_val`, a);
$(`b_val`, b);
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) support array reads statement type VarStatement
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'source', [1, 2, 3]
 - 2: 'a_val', 's'
 - 3: 'b_val', 'o'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
