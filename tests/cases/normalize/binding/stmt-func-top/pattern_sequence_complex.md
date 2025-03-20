# Preval test case

# pattern_sequence_complex.md

> Normalize > Binding > Stmt-func-top > Pattern sequence complex
>
> Assignments of all kinds should be normalized in all circumstances

## Input

`````js filename=intro
function f() {
  let x = 1, y = 2, z = [10, 20, 30];
  let [a, b] = ($(x), $(y), $(z));
  $(a, b, x, y, z);
}
$(f());
`````


## Settled


`````js filename=intro
$(1);
$(2);
const z /*:array*/ = [10, 20, 30];
const bindingPatternArrRoot /*:unknown*/ = $(z);
const arrPatternSplat /*:array*/ = [...bindingPatternArrRoot];
const a /*:unknown*/ = arrPatternSplat[0];
const b /*:unknown*/ = arrPatternSplat[1];
$(a, b, 1, 2, z);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(2);
const z = [10, 20, 30];
const bindingPatternArrRoot = $(z);
const arrPatternSplat = [...bindingPatternArrRoot];
$(arrPatternSplat[0], arrPatternSplat[1], 1, 2, z);
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$( 2 );
const a = [ 10, 20, 30 ];
const b = $( a );
const c = [ ...b ];
const d = c[ 0 ];
const e = c[ 1 ];
$( d, e, 1, 2, a );
$( undefined );
`````


## Todos triggered


- inline computed array property read
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: [10, 20, 30]
 - 4: 10, 20, 1, 2, [10, 20, 30]
 - 5: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
