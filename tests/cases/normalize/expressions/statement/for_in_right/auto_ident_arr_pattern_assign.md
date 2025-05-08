# Preval test case

# auto_ident_arr_pattern_assign.md

> Normalize > Expressions > Statement > For in right > Auto ident arr pattern assign
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Options

Known TDZ problem

- skipEval
- globals: x$1

## Input

`````js filename=intro
let x = 1,
  y = 2;

let a = { a: 999, b: 1000 };
for (let x in ([x, y] = [$(3), $(4)]));
$(a, x, y);
`````


## Settled


`````js filename=intro
const tmpArrElement /*:unknown*/ = $(3);
const tmpArrElement$1 /*:unknown*/ = $(4);
const tmpNestedAssignArrPatternRhs /*:array*/ = [tmpArrElement, tmpArrElement$1];
const tmpArrPatternSplat /*:array*/ = [...tmpNestedAssignArrPatternRhs];
x$1 = tmpArrPatternSplat[0];
const y /*:unknown*/ = tmpArrPatternSplat[1];
const tmpForInGen /*:unknown*/ = $forIn(tmpNestedAssignArrPatternRhs);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForInNext /*:unknown*/ = tmpForInGen();
  const tmpIfTest /*:unknown*/ = tmpForInNext.done;
  if (tmpIfTest) {
    break;
  } else {
    tmpForInNext.value;
  }
}
const a /*:object*/ = { a: 999, b: 1000 };
$(a, 1, y);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpArrElement = $(3);
const tmpArrElement$1 = $(4);
const tmpNestedAssignArrPatternRhs = [tmpArrElement, tmpArrElement$1];
const tmpArrPatternSplat = [...tmpNestedAssignArrPatternRhs];
x$1 = tmpArrPatternSplat[0];
const y = tmpArrPatternSplat[1];
const tmpForInGen = $forIn(tmpNestedAssignArrPatternRhs);
while (true) {
  const tmpForInNext = tmpForInGen();
  if (tmpForInNext.done) {
    break;
  } else {
    tmpForInNext.value;
  }
}
$({ a: 999, b: 1000 }, 1, y);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 3 );
const b = $( 4 );
const c = [ a, b ];
const d = [ ...c ];
x$1 = d[ 0 ];
const e = d[ 1 ];
const f = $forIn( c );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const g = f();
  const h = g.done;
  if (h) {
    break;
  }
  else {
    g.value;
  }
}
const i = {
  a: 999,
  b: 1000,
};
$( i, 1, e );
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) support array reads statement type VarStatement
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None (except for the 1 globals expected by the test)


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<skipped by option>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
