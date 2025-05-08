# Preval test case

# auto_ident_arr_pattern_assign_seq.md

> Normalize > Expressions > Assignments > Ternary c > Auto ident arr pattern assign seq
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let x = 1,
  y = 2;

let a = { a: 999, b: 1000 };
$($(0) ? $(100) : (a = [x, y] = ($(x), $(y), [$(3), $(4)])));
$(a, x, y);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(0);
if (tmpIfTest) {
  const tmpCalleeParam /*:unknown*/ = $(100);
  $(tmpCalleeParam);
  const a /*:object*/ = { a: 999, b: 1000 };
  $(a, 1, 2);
} else {
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
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(0)) {
  $($(100));
  $({ a: 999, b: 1000 }, 1, 2);
} else {
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
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 0 );
if (a) {
  const b = $( 100 );
  $( b );
  const c = {
    a: 999,
    b: 1000,
  };
  $( c, 1, 2 );
}
else {
  $( 1 );
  $( 2 );
  const d = $( 3 );
  const e = $( 4 );
  const f = [ d, e ];
  const g = [ ...f ];
  const h = g[ 0 ];
  const i = g[ 1 ];
  $( f );
  $( f, h, i );
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
 - 1: 0
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
