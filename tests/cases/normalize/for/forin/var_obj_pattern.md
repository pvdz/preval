# Preval test case

# var_obj_pattern.md

> Normalize > For > Forin > Var obj pattern
>
> For-in must be normalized

## Input

`````js filename=intro
for (let [x] in {a: 1, b: 2}) $(x);
`````

## Settled


`````js filename=intro
const tmpCalleeParam /*:object*/ = { a: 1, b: 2 };
const tmpForInGen /*:unknown*/ = $forIn(tmpCalleeParam);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForInNext /*:unknown*/ = tmpForInGen.next();
  const tmpIfTest /*:unknown*/ = tmpForInNext.done;
  if (tmpIfTest) {
    break;
  } else {
    const bindingPatternArrRoot /*:unknown*/ = tmpForInNext.value;
    const arrPatternSplat /*:array*/ = [...bindingPatternArrRoot];
    const x /*:unknown*/ = arrPatternSplat[0];
    $(x);
  }
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpForInGen = $forIn({ a: 1, b: 2 });
while (true) {
  const tmpForInNext = tmpForInGen.next();
  if (tmpForInNext.done) {
    break;
  } else {
    const bindingPatternArrRoot = tmpForInNext.value;
    $([...bindingPatternArrRoot][0]);
  }
}
`````

## Pre Normal


`````js filename=intro
{
  let tmpForInGen = $forIn({ a: 1, b: 2 });
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    let tmpForInNext = tmpForInGen.next();
    if (tmpForInNext.done) {
      break;
    } else {
      let [x] = tmpForInNext.value;
      $(x);
    }
  }
}
`````

## Normalized


`````js filename=intro
const tmpCalleeParam = { a: 1, b: 2 };
let tmpForInGen = $forIn(tmpCalleeParam);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  let tmpForInNext = tmpForInGen.next();
  const tmpIfTest = tmpForInNext.done;
  if (tmpIfTest) {
    break;
  } else {
    let bindingPatternArrRoot = tmpForInNext.value;
    let arrPatternSplat = [...bindingPatternArrRoot];
    let x = arrPatternSplat[0];
    $(x);
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
const b = $forIn( a );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const c = b.next();
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

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'a'
 - 2: 'b'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope
- Calling a static method on an ident that is not global and not recorded: $tmpForInGen_next
