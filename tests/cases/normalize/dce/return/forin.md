# Preval test case

# forin.md

> Normalize > Dce > Return > Forin
>
> Any statements that follow a return in the same parent should be eliminated.

This loop could be dropped because all branches return/break it.

## Input

`````js filename=intro
function f() {
  for (let x in {a: 1, b: 2}) {
    return $(1, 'return');
    $('fail');
  }
}
$(f());
`````

## Settled


`````js filename=intro
const tmpCalleeParam /*:object*/ = { a: 1, b: 2 };
const tmpForInGen /*:unknown*/ = $forIn(tmpCalleeParam);
const tmpForInNext /*:unknown*/ = tmpForInGen.next();
const tmpIfTest /*:unknown*/ = tmpForInNext.done;
if (tmpIfTest) {
  $(undefined);
} else {
  tmpForInNext.value;
  const tmpReturnArg /*:unknown*/ = $(1, `return`);
  $(tmpReturnArg);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpForInNext = $forIn({ a: 1, b: 2 }).next();
if (tmpForInNext.done) {
  $(undefined);
} else {
  tmpForInNext.value;
  $($(1, `return`));
}
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  {
    let tmpForInGen = $forIn({ a: 1, b: 2 });
    while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
      let tmpForInNext = tmpForInGen.next();
      if (tmpForInNext.done) {
        break;
      } else {
        let x = tmpForInNext.value;
        {
          return $(1, `return`);
          $(`fail`);
        }
      }
    }
  }
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  const tmpCalleeParam = { a: 1, b: 2 };
  let tmpForInGen = $forIn(tmpCalleeParam);
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    let tmpForInNext = tmpForInGen.next();
    const tmpIfTest = tmpForInNext.done;
    if (tmpIfTest) {
      break;
    } else {
      let x = tmpForInNext.value;
      const tmpReturnArg = $(1, `return`);
      return tmpReturnArg;
    }
  }
  return undefined;
};
const tmpCalleeParam$1 = f();
$(tmpCalleeParam$1);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = {
  a: 1,
  b: 2,
};
const b = $forIn( a );
const c = b.next();
const d = c.done;
if (d) {
  $( undefined );
}
else {
  c.value;
  const e = $( 1, "return" );
  $( e );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1, 'return'
 - 2: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
