# Preval test case

# pattern_sequence_complex.md

> Normalize > Binding > For-a > Pattern sequence complex
>
> Assignments of all kinds should be normalized in all circumstances

## Input

`````js filename=intro
let a = 1, b = 2, z = [10, 20, 30];
for (let [x, y] = ($(a), $(b), $(z));false;) $(a, b, x, y, z);
`````


## Settled


`````js filename=intro
$(1);
$(2);
const z /*:array*/ = [10, 20, 30];
const tmpBindingPatternArrRoot /*:unknown*/ = $(z);
[...tmpBindingPatternArrRoot];
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(2);
const tmpBindingPatternArrRoot = $([10, 20, 30]);
[...tmpBindingPatternArrRoot];
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$( 2 );
const a = [ 10, 20, 30 ];
const b = $( a );
[ ...b ];
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = 1;
let b = 2;
let z = [10, 20, 30];
$(a);
$(b);
let tmpBindingPatternArrRoot = $(z);
let tmpArrPatternSplat = [...tmpBindingPatternArrRoot];
let x = tmpArrPatternSplat[0];
let y = tmpArrPatternSplat[1];
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) support array reads statement type VarStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: [10, 20, 30]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
