# Preval test case

# auto_pattern_arr_s-seq.md

> Normalize > Expressions > Assignments > For let > Auto pattern arr s-seq
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let [a] = { a: 999, b: 1000 };
for (let xyz = ([a] = ($(10), $(20), [1, 2])); ; $(1)) $(xyz);
$(a);
`````


## Settled


`````js filename=intro
const tmpBindingPatternArrRoot /*:object*/ = { a: 999, b: 1000 };
[...tmpBindingPatternArrRoot];
$(10);
$(20);
const tmpNestedAssignArrPatternRhs /*:array*/ = [1, 2];
[...tmpNestedAssignArrPatternRhs];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(tmpNestedAssignArrPatternRhs);
  $(1);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpBindingPatternArrRoot = { a: 999, b: 1000 };
[...tmpBindingPatternArrRoot];
$(10);
$(20);
const tmpNestedAssignArrPatternRhs = [1, 2];
[...tmpNestedAssignArrPatternRhs];
while (true) {
  $(tmpNestedAssignArrPatternRhs);
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
$( 10 );
$( 20 );
const b = [ 1, 2 ];
[ ...b ];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( b );
  $( 1 );
}
`````


## Todos triggered


- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope
- (todo) Deal with array spreads in arr mutation?
- (todo) do we want to support ArrayExpression as expression statement in free loops?


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
