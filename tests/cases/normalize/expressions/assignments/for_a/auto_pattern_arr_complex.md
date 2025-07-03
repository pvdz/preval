# Preval test case

# auto_pattern_arr_complex.md

> Normalize > Expressions > Assignments > For a > Auto pattern arr complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let [a] = { a: 999, b: 1000 };
for ([a] = $([1, 2]); ; $(1));
$(a);
`````


## Settled


`````js filename=intro
const tmpBindingPatternArrRoot /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
[...tmpBindingPatternArrRoot];
const tmpCalleeParam /*:array*/ /*truthy*/ = [1, 2];
const tmpArrAssignPatternRhs /*:unknown*/ = $(tmpCalleeParam);
[...tmpArrAssignPatternRhs];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(1);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpBindingPatternArrRoot = { a: 999, b: 1000 };
[...tmpBindingPatternArrRoot];
const tmpArrAssignPatternRhs = $([1, 2]);
[...tmpArrAssignPatternRhs];
while (true) {
  $(1);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {
  a: 999,
  b: 1000,
};
[ ...a ];
const b = [ 1, 2 ];
const c = $( b );
[ ...c ];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( 1 );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpBindingPatternArrRoot = { a: 999, b: 1000 };
let tmpArrPatternSplat = [...tmpBindingPatternArrRoot];
let a = tmpArrPatternSplat[0];
let tmpCalleeParam = [1, 2];
const tmpArrAssignPatternRhs = $(tmpCalleeParam);
const tmpArrPatternSplat$1 = [...tmpArrAssignPatternRhs];
a = tmpArrPatternSplat$1[0];
while (true) {
  $(1);
}
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) array reads var statement with init CallExpression
- (todo) do we want to support ArrayExpression as expression statement in free loops?
- (todo) regular property access of an ident feels tricky;
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
