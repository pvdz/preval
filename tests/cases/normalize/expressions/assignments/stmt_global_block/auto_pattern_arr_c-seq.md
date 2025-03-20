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
const bindingPatternArrRoot /*:object*/ = { a: 999, b: 1000 };
const arrPatternSplat /*:array*/ = [...bindingPatternArrRoot];
arrPatternSplat[0];
$(10);
$(20);
const tmpCalleeParam /*:array*/ = [1, 2];
const arrAssignPatternRhs /*:unknown*/ = $(tmpCalleeParam);
const arrPatternSplat$1 /*:array*/ = [...arrAssignPatternRhs];
const tmpClusterSSA_a /*:unknown*/ = arrPatternSplat$1[0];
$(tmpClusterSSA_a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const bindingPatternArrRoot = { a: 999, b: 1000 };
[...bindingPatternArrRoot][0];
$(10);
$(20);
const arrAssignPatternRhs = $([1, 2]);
$([...arrAssignPatternRhs][0]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {
  a: 999,
  b: 1000,
};
const b = [ ...a ];
b[ 0 ];
$( 10 );
$( 20 );
const c = [ 1, 2 ];
const d = $( c );
const e = [ ...d ];
const f = e[ 0 ];
$( f );
`````


## Todos triggered


- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope
- inline computed array property read


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
