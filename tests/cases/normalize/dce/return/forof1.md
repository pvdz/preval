# Preval test case

# forof1.md

> Normalize > Dce > Return > Forof1
>
> Any statements that follow a return in the same parent should be eliminated.

This loop could be dropped because all branches return/break it.

## Input

`````js filename=intro
function f() {
  for (let x in {a: 1, b: 2}) {
    return $(1, 'return');
  }
  $('keep, do not eval');
}
$(f());
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:object*/ /*truthy*/ = { a: 1, b: 2 };
const tmpForInGen /*:unknown*/ = $forIn(tmpCalleeParam);
const tmpForInNext /*:unknown*/ = tmpForInGen();
const tmpIfTest /*:unknown*/ = tmpForInNext.done;
if (tmpIfTest) {
  $(`keep, do not eval`);
  $(undefined);
} else {
  tmpForInNext.value;
  const tmpClusterSSA_tmpCalleeParam$1 /*:unknown*/ = $(1, `return`);
  $(tmpClusterSSA_tmpCalleeParam$1);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpForInGen = $forIn({ a: 1, b: 2 });
const tmpForInNext = tmpForInGen();
if (tmpForInNext.done) {
  $(`keep, do not eval`);
  $(undefined);
} else {
  tmpForInNext.value;
  $($(1, `return`));
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
const c = b();
const d = c.done;
if (d) {
  $( "keep, do not eval" );
  $( undefined );
}
else {
  c.value;
  const e = $( 1, "return" );
  $( e );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  let tmpCalleeParam = { a: 1, b: 2 };
  const tmpForInGen = $forIn(tmpCalleeParam);
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    const tmpForInNext = tmpForInGen();
    const tmpIfTest = tmpForInNext.done;
    if (tmpIfTest) {
      break;
    } else {
      let x = tmpForInNext.value;
      const tmpReturnArg = $(1, `return`);
      return tmpReturnArg;
    }
  }
  $(`keep, do not eval`);
  return undefined;
};
let tmpCalleeParam$1 = f();
$(tmpCalleeParam$1);
`````


## Todos triggered


None


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
