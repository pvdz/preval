# Preval test case

# auto_ident_arr_pattern_assign_seq.md

> Normalize > Expressions > Statement > For in left > Auto ident arr pattern assign seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let x = 1,
  y = 2;

let a = { a: 999, b: 1000 };
for (([x, y] = ($(x), $(y), [$(3), $(4)])).x in $({ x: 1 }));
$(a, x, y);
`````


## Settled


`````js filename=intro
let x /*:unknown*/ = 1;
let y /*:unknown*/ = 2;
const tmpCalleeParam$1 /*:object*/ = { x: 1 };
const tmpCalleeParam /*:unknown*/ = $(tmpCalleeParam$1);
const tmpForInGen /*:unknown*/ = $forIn(tmpCalleeParam);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForInNext /*:unknown*/ = tmpForInGen();
  const tmpIfTest /*:unknown*/ = tmpForInNext.done;
  if (tmpIfTest) {
    break;
  } else {
    $(x);
    $(y);
    const tmpArrElement /*:unknown*/ = $(3);
    const tmpArrElement$1 /*:unknown*/ = $(4);
    const tmpNestedAssignArrPatternRhs /*:array*/ = [tmpArrElement, tmpArrElement$1];
    const tmpArrPatternSplat /*:array*/ = [...tmpNestedAssignArrPatternRhs];
    x = tmpArrPatternSplat[0];
    y = tmpArrPatternSplat[1];
    const tmpAssignMemRhs /*:unknown*/ = tmpForInNext.value;
    tmpNestedAssignArrPatternRhs.x = tmpAssignMemRhs;
  }
}
const a /*:object*/ = { a: 999, b: 1000 };
$(a, x, y);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let x = 1;
let y = 2;
const tmpForInGen = $forIn($({ x: 1 }));
while (true) {
  const tmpForInNext = tmpForInGen();
  if (tmpForInNext.done) {
    break;
  } else {
    $(x);
    $(y);
    const tmpArrElement = $(3);
    const tmpArrElement$1 = $(4);
    const tmpNestedAssignArrPatternRhs = [tmpArrElement, tmpArrElement$1];
    const tmpArrPatternSplat = [...tmpNestedAssignArrPatternRhs];
    x = tmpArrPatternSplat[0];
    y = tmpArrPatternSplat[1];
    tmpNestedAssignArrPatternRhs.x = tmpForInNext.value;
  }
}
$({ a: 999, b: 1000 }, x, y);
`````


## PST Settled
With rename=true

`````js filename=intro
let a = 1;
let b = 2;
const c = { x: 1 };
const d = $( c );
const e = $forIn( d );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const f = e();
  const g = f.done;
  if (g) {
    break;
  }
  else {
    $( a );
    $( b );
    const h = $( 3 );
    const i = $( 4 );
    const j = [ h, i ];
    const k = [ ...j ];
    a = k[ 0 ];
    b = k[ 1 ];
    const l = f.value;
    j.x = l;
  }
}
const m = {
  a: 999,
  b: 1000,
};
$( m, a, b );
`````


## Todos triggered


- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope
- (todo) Deal with array spreads in arr mutation?


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { x: '1' }
 - 2: 1
 - 3: 2
 - 4: 3
 - 5: 4
 - 6: { a: '999', b: '1000' }, 3, 4
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
