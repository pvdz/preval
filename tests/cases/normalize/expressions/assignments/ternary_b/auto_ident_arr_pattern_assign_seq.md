# Preval test case

# auto_ident_arr_pattern_assign_seq.md

> Normalize > Expressions > Assignments > Ternary b > Auto ident arr pattern assign seq
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let x = 1,
  y = 2;

let a = { a: 999, b: 1000 };
$($(1) ? (a = [x, y] = ($(x), $(y), [$(3), $(4)])) : $(200));
$(a, x, y);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  $(1);
  $(2);
  const tmpArrElement /*:unknown*/ = $(3);
  const tmpArrElement$1 /*:unknown*/ = $(4);
  const tmpNestedAssignArrPatternRhs /*:array*/ = [tmpArrElement, tmpArrElement$1];
  const tmpArrPatternSplat /*:array*/ = [...tmpNestedAssignArrPatternRhs];
  const x /*:unknown*/ = tmpArrPatternSplat[0];
  const y /*:unknown*/ = tmpArrPatternSplat[1];
  $(tmpNestedAssignArrPatternRhs);
  $(tmpNestedAssignArrPatternRhs, x, y);
} else {
  const tmpCalleeParam /*:unknown*/ = $(200);
  $(tmpCalleeParam);
  const a /*:object*/ = { a: 999, b: 1000 };
  $(a, 1, 2);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(1)) {
  $(1);
  $(2);
  const tmpArrElement = $(3);
  const tmpArrElement$1 = $(4);
  const tmpNestedAssignArrPatternRhs = [tmpArrElement, tmpArrElement$1];
  const tmpArrPatternSplat = [...tmpNestedAssignArrPatternRhs];
  const x = tmpArrPatternSplat[0];
  const y = tmpArrPatternSplat[1];
  $(tmpNestedAssignArrPatternRhs);
  $(tmpNestedAssignArrPatternRhs, x, y);
} else {
  $($(200));
  $({ a: 999, b: 1000 }, 1, 2);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {
  $( 1 );
  $( 2 );
  const b = $( 3 );
  const c = $( 4 );
  const d = [ b, c ];
  const e = [ ...d ];
  const f = e[ 0 ];
  const g = e[ 1 ];
  $( d );
  $( d, f, g );
}
else {
  const h = $( 200 );
  $( h );
  const i = {
    a: 999,
    b: 1000,
  };
  $( i, 1, 2 );
}
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) support array reads statement type VarStatement
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 2
 - 4: 3
 - 5: 4
 - 6: [3, 4]
 - 7: [3, 4], 3, 4
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
