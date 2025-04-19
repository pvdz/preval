# Preval test case

# auto_pattern_arr_c-seq.md

> Normalize > Expressions > Assignments > Stmt global block > Auto pattern arr c-seq
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
{
  let [a] = { a: 999, b: 1000 };
  [a] = ($(10), $(20), $([1, 2]));
  $(a);
}
`````


## Settled


`````js filename=intro
const tmpBindingPatternArrRoot /*:object*/ = { a: 999, b: 1000 };
[...tmpBindingPatternArrRoot];
$(10);
$(20);
const tmpCalleeParam /*:array*/ = [1, 2];
const tmpArrAssignPatternRhs /*:unknown*/ = $(tmpCalleeParam);
const tmpArrPatternSplat$1 /*:array*/ = [...tmpArrAssignPatternRhs];
const tmpClusterSSA_a /*:unknown*/ = tmpArrPatternSplat$1[0];
$(tmpClusterSSA_a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpBindingPatternArrRoot = { a: 999, b: 1000 };
[...tmpBindingPatternArrRoot];
$(10);
$(20);
const tmpArrAssignPatternRhs = $([1, 2]);
$([...tmpArrAssignPatternRhs][0]);
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
const c = $( b );
const d = [ ...c ];
const e = d[ 0 ];
$( e );
`````


## Todos triggered


- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope
- (todo) Deal with array spreads in arr mutation?


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
