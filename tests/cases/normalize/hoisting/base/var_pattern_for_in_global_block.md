# Preval test case

# var_pattern_for_in_global_block.md

> Normalize > Hoisting > Base > Var pattern for in global block
>
> Hosting in a block should end up in the parent

## Input

`````js filename=intro
$(x);
{
  for (var [x] in {y: 100}) $(x, 'for');
}
$(x);
`````


## Settled


`````js filename=intro
let x /*:unknown*/ = undefined;
$(undefined);
const tmpCalleeParam /*:object*/ = { y: 100 };
const tmpForInGen /*:unknown*/ = $forIn(tmpCalleeParam);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForInNext /*:unknown*/ = tmpForInGen();
  const tmpIfTest /*:unknown*/ = tmpForInNext.done;
  if (tmpIfTest) {
    break;
  } else {
    const tmpArrAssignPatternRhs /*:unknown*/ = tmpForInNext.value;
    const tmpArrPatternSplat /*:array*/ = [...tmpArrAssignPatternRhs];
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
const tmpForInGen = $forIn({ y: 100 });
while (true) {
  const tmpForInNext = tmpForInGen();
  if (tmpForInNext.done) {
    break;
  } else {
    const tmpArrAssignPatternRhs = tmpForInNext.value;
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
const b = { y: 100 };
const c = $forIn( b );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const d = c();
  const e = d.done;
  if (e) {
    break;
  }
  else {
    const f = d.value;
    const g = [ ...f ];
    a = g[ 0 ];
    $( a, "for" );
  }
}
$( a );
`````


## Todos triggered


- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope
- (todo) Deal with array spreads in arr mutation?


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: undefined
 - 2: 'y', 'for'
 - 3: 'y'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
