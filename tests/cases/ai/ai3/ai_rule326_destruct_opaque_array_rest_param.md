# Preval test case

# ai_rule326_destruct_opaque_array_rest_param.md

> Ai > Ai3 > Ai rule326 destruct opaque array rest param
>
> Test: Destructuring assignment from opaque array with rest element.

## Input

`````js filename=intro
// Expected: let [a, ...b] = $('get_arr'); $('a_val', a); $('b_val', b);
let source = $('get_arr');
let [a, ...b] = source;
$('a_val', a);
$('b_val', b);
$('b_length', b.length);
`````


## Settled


`````js filename=intro
const source /*:unknown*/ = $(`get_arr`);
const tmpArrPatternSplat /*:array*/ = [...source];
const a /*:unknown*/ = tmpArrPatternSplat[0];
const b /*:array*/ = $dotCall($array_slice, tmpArrPatternSplat, `slice`, 1);
$(`a_val`, a);
$(`b_val`, b);
const tmpCalleeParam /*:number*/ = b.length;
$(`b_length`, tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const source = $(`get_arr`);
const tmpArrPatternSplat = [...source];
const a = tmpArrPatternSplat[0];
const b = $dotCall($array_slice, tmpArrPatternSplat, `slice`, 1);
$(`a_val`, a);
$(`b_val`, b);
$(`b_length`, b.length);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "get_arr" );
const b = [ ...a ];
const c = b[ 0 ];
const d = $dotCall( $array_slice, b, "slice", 1 );
$( "a_val", c );
$( "b_val", d );
const e = d.length;
$( "b_length", e );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let source = $(`get_arr`);
let tmpBindingPatternArrRoot = source;
let tmpArrPatternSplat = [...tmpBindingPatternArrRoot];
let a = tmpArrPatternSplat[0];
const tmpMCF = tmpArrPatternSplat.slice;
let b = $dotCall(tmpMCF, tmpArrPatternSplat, `slice`, 1);
$(`a_val`, a);
$(`b_val`, b);
let tmpCalleeParam = b.length;
$(`b_length`, tmpCalleeParam);
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) access object property that also exists on prototype? $array_slice
- (todo) type trackeed tricks can possibly support static $array_slice
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'get_arr'
 - 2: 'a_val', 'g'
 - 3: 'b_val', ['e', 't', '_', 'a', 'r', 'r']
 - 4: 'b_length', 6
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
