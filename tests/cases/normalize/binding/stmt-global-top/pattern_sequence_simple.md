# Preval test case

# pattern_sequence_simple.md

> Normalize > Binding > Stmt-global-top > Pattern sequence simple
>
> Assignments of all kinds should be normalized in all circumstances

## Input

`````js filename=intro
let x = 1, y = 2, z = [10, 20, 30];
let [a, b] = ($(x), $(y), z);
$(a, b, x, y, z);
`````


## Settled


`````js filename=intro
$(1);
$(2);
const z /*:array*/ = [10, 20, 30];
const arrPatternSplat /*:array*/ = [...z];
const a /*:unknown*/ = arrPatternSplat[0];
const b /*:unknown*/ = arrPatternSplat[1];
$(a, b, 1, 2, z);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(2);
const z = [10, 20, 30];
const arrPatternSplat = [...z];
$(arrPatternSplat[0], arrPatternSplat[1], 1, 2, z);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$( 2 );
const a = [ 10, 20, 30 ];
const b = [ ...a ];
const c = b[ 0 ];
const d = b[ 1 ];
$( c, d, 1, 2, a );
`````


## Todos triggered


- (todo) inline computed array property read
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 10, 20, 1, 2, [10, 20, 30]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
