# Preval test case

# forof2.md

> Normalize > Dce > Throw > Forof2
>
> Any statements that follow a return in the same parent should be eliminated.

This loop could be dropped because all branches return/break it.

## Input

`````js filename=intro
function f() {
  for (let x in {a: 1, b: 2}) {
    throw $(1, 'throw');
    $('fail');
  }
  $('keep, do not eval');
}
$(f());
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:object*/ = { a: 1, b: 2 };
const tmpForInGen /*:unknown*/ = $forIn(tmpCalleeParam);
const tmpForInNext /*:unknown*/ = tmpForInGen();
const tmpIfTest /*:unknown*/ = tmpForInNext.done;
if (tmpIfTest) {
  $(`keep, do not eval`);
  $(undefined);
} else {
  tmpForInNext.value;
  const tmpThrowArg /*:unknown*/ = $(1, `throw`);
  throw tmpThrowArg;
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
  const tmpThrowArg = $(1, `throw`);
  throw tmpThrowArg;
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
  const e = $( 1, "throw" );
  throw e;
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1, 'throw'
 - eval returned: ('<crash[ 1 ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
