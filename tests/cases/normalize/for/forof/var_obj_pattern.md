# Preval test case

# var_obj_pattern.md

> Normalize > For > Forof > Var obj pattern
>
> For-in must be normalized

## Input

`````js filename=intro
for (let [x] of {a: 1, b: 2}) $(x);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:object*/ = { a: 1, b: 2 };
const tmpForOfGen /*:unknown*/ = $forOf(tmpCalleeParam);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForOfNext /*:unknown*/ = tmpForOfGen();
  const tmpIfTest /*:unknown*/ = tmpForOfNext.done;
  if (tmpIfTest) {
    break;
  } else {
    const tmpBindingPatternArrRoot /*:unknown*/ = tmpForOfNext.value;
    const tmpArrPatternSplat /*:array*/ = [...tmpBindingPatternArrRoot];
    const x /*:unknown*/ = tmpArrPatternSplat[0];
    $(x);
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpForOfGen = $forOf({ a: 1, b: 2 });
while (true) {
  const tmpForOfNext = tmpForOfGen();
  if (tmpForOfNext.done) {
    break;
  } else {
    const tmpBindingPatternArrRoot = tmpForOfNext.value;
    $([...tmpBindingPatternArrRoot][0]);
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {
  a: 1,
  b: 2,
};
const b = $forOf( a );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const c = b();
  const d = c.done;
  if (d) {
    break;
  }
  else {
    const e = c.value;
    const f = [ ...e ];
    const g = f[ 0 ];
    $( g );
  }
}
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
