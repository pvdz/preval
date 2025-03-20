# Preval test case

# auto_base_assign_pattern_arr.md

> Normalize > Expressions > Statement > Stmt global block > Auto base assign pattern arr
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
{
  let b = [];

  let a = { a: 999, b: 1000 };
  [b] = $([$(2)]);
  $(a, b);
}
`````


## Settled


`````js filename=intro
const tmpArrElement /*:unknown*/ = $(2);
const tmpCalleeParam /*:array*/ = [tmpArrElement];
const arrAssignPatternRhs /*:unknown*/ = $(tmpCalleeParam);
const arrPatternSplat /*:array*/ = [...arrAssignPatternRhs];
const tmpClusterSSA_b /*:unknown*/ = arrPatternSplat[0];
const a /*:object*/ = { a: 999, b: 1000 };
$(a, tmpClusterSSA_b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpArrElement = $(2);
const arrAssignPatternRhs = $([tmpArrElement]);
const tmpClusterSSA_b = [...arrAssignPatternRhs][0];
$({ a: 999, b: 1000 }, tmpClusterSSA_b);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 2 );
const b = [ a ];
const c = $( b );
const d = [ ...c ];
const e = d[ 0 ];
const f = {
  a: 999,
  b: 1000,
};
$( f, e );
`````


## Todos triggered


- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope
- inline computed array property read


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2
 - 2: [2]
 - 3: { a: '999', b: '1000' }, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
