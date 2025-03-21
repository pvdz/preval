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
const tmpArrElement /*:array*/ = [100];
const tmpCalleeParam /*:array*/ = [tmpArrElement];
const tmpForOfGen /*:unknown*/ = $forOf(tmpCalleeParam);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForOfNext /*:unknown*/ = tmpForOfGen.next();
  const tmpIfTest /*:unknown*/ = tmpForOfNext.done;
  if (tmpIfTest) {
    break;
  } else {
    const arrAssignPatternRhs /*:unknown*/ = tmpForOfNext.value;
    const arrPatternSplat /*:array*/ = [...arrAssignPatternRhs];
    x = arrPatternSplat[0];
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
  const tmpForOfNext = tmpForOfGen.next();
  if (tmpForOfNext.done) {
    break;
  } else {
    const arrAssignPatternRhs = tmpForOfNext.value;
    x = [...arrAssignPatternRhs][0];
    $(x, `for`);
  }
}
$(x);
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  let x = undefined;
  $(x);
  {
    {
      let tmpForOfGen = $forOf([[100]]);
      while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
        let tmpForOfNext = tmpForOfGen.next();
        if (tmpForOfNext.done) {
          break;
        } else {
          [x] = tmpForOfNext.value;
          $(x, `for`);
        }
      }
    }
  }
  $(x);
};
f();
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  let x = undefined;
  $(undefined);
  const tmpArrElement = [100];
  const tmpCalleeParam = [tmpArrElement];
  let tmpForOfGen = $forOf(tmpCalleeParam);
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    let tmpForOfNext = tmpForOfGen.next();
    const tmpIfTest = tmpForOfNext.done;
    if (tmpIfTest) {
      break;
    } else {
      const arrAssignPatternRhs = tmpForOfNext.value;
      const arrPatternSplat = [...arrAssignPatternRhs];
      x = arrPatternSplat[0];
      $(x, `for`);
    }
  }
  $(x);
  return undefined;
};
f();
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
  const e = d.next();
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

Todos triggered:
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope
- Calling a static method on an ident that is not global and not recorded: $tmpForOfGen_next
