# Preval test case

# forof.md

> Normalize > Dce > Return > Forof
>
> Any statements that follow a return in the same parent should be eliminated.

This loop could be dropped because all branches return/break it.

## Input

`````js filename=intro
function f() {
  for (let x of [10, 20]) {
    return $(1, 'return');
    $('fail');
  }
}
$(f());
`````

## Settled


`````js filename=intro
const tmpCalleeParam /*:array*/ = [10, 20];
const tmpForOfGen /*:unknown*/ = $forOf(tmpCalleeParam);
const tmpForOfNext /*:unknown*/ = tmpForOfGen.next();
const tmpIfTest /*:unknown*/ = tmpForOfNext.done;
if (tmpIfTest) {
  $(undefined);
} else {
  tmpForOfNext.value;
  const tmpReturnArg /*:unknown*/ = $(1, `return`);
  $(tmpReturnArg);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpForOfNext = $forOf([10, 20]).next();
if (tmpForOfNext.done) {
  $(undefined);
} else {
  tmpForOfNext.value;
  $($(1, `return`));
}
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  {
    let tmpForOfGen = $forOf([10, 20]);
    while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
      let tmpForOfNext = tmpForOfGen.next();
      if (tmpForOfNext.done) {
        break;
      } else {
        let x = tmpForOfNext.value;
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
  const tmpCalleeParam = [10, 20];
  let tmpForOfGen = $forOf(tmpCalleeParam);
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    let tmpForOfNext = tmpForOfGen.next();
    const tmpIfTest = tmpForOfNext.done;
    if (tmpIfTest) {
      break;
    } else {
      let x = tmpForOfNext.value;
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
const a = [ 10, 20 ];
const b = $forOf( a );
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
