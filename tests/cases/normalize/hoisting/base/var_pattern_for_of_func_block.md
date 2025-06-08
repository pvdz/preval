# Preval test case

# var_pattern_for_of_func_block.md

> Normalize > Hoisting > Base > Var pattern for of func block
>
> Hosting in a block should end up in the parent

## Input

`````js filename=intro
function f() {
  $(x);
  {
    for (var [x] of [[100]]) $(x, 'for');
  }
  $(x);
}
f();
`````


## Settled


`````js filename=intro
let x /*:unknown*/ = undefined;
$(undefined);
const tmpArrElement /*:array*/ /*truthy*/ = [100];
const tmpCalleeParam /*:array*/ /*truthy*/ = [tmpArrElement];
const tmpForOfGen /*:unknown*/ = $forOf(tmpCalleeParam);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForOfNext /*:unknown*/ = tmpForOfGen();
  const tmpIfTest /*:unknown*/ = tmpForOfNext.done;
  if (tmpIfTest) {
    break;
  } else {
    const tmpArrAssignPatternRhs /*:unknown*/ = tmpForOfNext.value;
    const tmpArrPatternSplat /*:array*/ /*truthy*/ = [...tmpArrAssignPatternRhs];
    x = tmpArrPatternSplat[0];
    $(x, `for`);
  }
}
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let x = undefined;
$(undefined);
const tmpArrElement = [100];
const tmpForOfGen = $forOf([tmpArrElement]);
while (true) {
  const tmpForOfNext = tmpForOfGen();
  if (tmpForOfNext.done) {
    break;
  } else {
    const tmpArrAssignPatternRhs = tmpForOfNext.value;
    x = [...tmpArrAssignPatternRhs][0];
    $(x, `for`);
  }
}
$(x);
`````


## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
$( undefined );
const b = [ 100 ];
const c = [ b ];
const d = $forOf( c );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const e = d();
  const f = e.done;
  if (f) {
    break;
  }
  else {
    const g = e.value;
    const h = [ ...g ];
    a = h[ 0 ];
    $( a, "for" );
  }
}
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  let x = undefined;
  $(undefined);
  const tmpArrElement = [100];
  let tmpCalleeParam = [tmpArrElement];
  const tmpForOfGen = $forOf(tmpCalleeParam);
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    const tmpForOfNext = tmpForOfGen();
    const tmpIfTest = tmpForOfNext.done;
    if (tmpIfTest) {
      break;
    } else {
      const tmpArrAssignPatternRhs = tmpForOfNext.value;
      const tmpArrPatternSplat = [...tmpArrAssignPatternRhs];
      x = tmpArrPatternSplat[0];
      $(x, `for`);
    }
  }
  $(x);
  return undefined;
};
f();
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) support array reads statement type VarStatement
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: undefined
 - 2: 100, 'for'
 - 3: 100
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
