# Preval test case

# pattern_sequence_complex.md

> Normalize > Binding > Stmt-func-block > Pattern sequence complex
>
> Assignments of all kinds should be normalized in all circumstances

## Input

`````js filename=intro
function f(){
if ($(true)) {
let x = 1, y = 2, z = [10, 20, 30];
  let [a, b] = ($(x), $(y), $(z));
  $(a, b, x, y, z);
}
}
$(f());
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(true);
if (tmpIfTest) {
  $(1);
  $(2);
  const z /*:array*/ = [10, 20, 30];
  const bindingPatternArrRoot /*:unknown*/ = $(z);
  const arrPatternSplat /*:array*/ = [...bindingPatternArrRoot];
  const a /*:unknown*/ = arrPatternSplat[0];
  const b /*:unknown*/ = arrPatternSplat[1];
  $(a, b, 1, 2, z);
  $(undefined);
} else {
  $(undefined);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(true)) {
  $(1);
  $(2);
  const z = [10, 20, 30];
  const bindingPatternArrRoot = $(z);
  const arrPatternSplat = [...bindingPatternArrRoot];
  $(arrPatternSplat[0], arrPatternSplat[1], 1, 2, z);
  $(undefined);
} else {
  $(undefined);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( true );
if (a) {
  $( 1 );
  $( 2 );
  const b = [ 10, 20, 30 ];
  const c = $( b );
  const d = [ ...c ];
  const e = d[ 0 ];
  const f = d[ 1 ];
  $( e, f, 1, 2, b );
  $( undefined );
}
else {
  $( undefined );
}
`````


## Todos triggered


- (todo) inline computed array property read
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - 2: 1
 - 3: 2
 - 4: [10, 20, 30]
 - 5: 10, 20, 1, 2, [10, 20, 30]
 - 6: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
