# Preval test case

# var_pattern_for_in_func_block.md

> Normalize > Hoisting > Base > Var pattern for in func block
>
> Hosting in a block should end up in the parent

## Input

`````js filename=intro
function f() {
  $(x);
  {
    for (var [x] in {y: 100}) $(x, 'for');
  }
  $(x);
}
f();
`````

## Settled


`````js filename=intro
let x /*:unknown*/ = undefined;
$(undefined);
const tmpCalleeParam /*:object*/ = { y: 100 };
const tmpForInGen /*:unknown*/ = $forIn(tmpCalleeParam);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForInNext /*:unknown*/ = tmpForInGen.next();
  const tmpIfTest /*:unknown*/ = tmpForInNext.done;
  if (tmpIfTest) {
    break;
  } else {
    const arrAssignPatternRhs /*:unknown*/ = tmpForInNext.value;
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
const tmpForInGen = $forIn({ y: 100 });
while (true) {
  const tmpForInNext = tmpForInGen.next();
  if (tmpForInNext.done) {
    break;
  } else {
    const arrAssignPatternRhs = tmpForInNext.value;
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
      let tmpForInGen = $forIn({ y: 100 });
      while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
        let tmpForInNext = tmpForInGen.next();
        if (tmpForInNext.done) {
          break;
        } else {
          [x] = tmpForInNext.value;
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
  $(x);
  const tmpCalleeParam = { y: 100 };
  let tmpForInGen = $forIn(tmpCalleeParam);
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    let tmpForInNext = tmpForInGen.next();
    const tmpIfTest = tmpForInNext.done;
    if (tmpIfTest) {
      break;
    } else {
      const arrAssignPatternRhs = tmpForInNext.value;
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
const b = { y: 100 };
const c = $forIn( b );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const d = c.next();
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

Todos triggered:
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope
- Calling a static method on an ident that is not global and not recorded: $tmpForInGen_next