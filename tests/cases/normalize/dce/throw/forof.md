# Preval test case

# forof.md

> Normalize > Dce > Throw > Forof
>
> Any statements that follow a return in the same parent should be eliminated.

This loop could be dropped because all branches return/break it.

## Input

`````js filename=intro
function f() {
  for (let x of [10, 20]) {
    throw $(1, 'throw');
    $('fail');
  }
}
$(f());
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:array*/ /*truthy*/ = [10, 20];
const tmpForOfGenNext /*:unknown*/ = $forOf(tmpCalleeParam);
const tmpForOfNext /*:unknown*/ = tmpForOfGenNext();
const tmpIfTest /*:unknown*/ = tmpForOfNext.done;
if (tmpIfTest) {
  $(undefined);
} else {
  tmpForOfNext.value;
  const tmpThrowArg /*:unknown*/ = $(1, `throw`);
  throw tmpThrowArg;
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpForOfGenNext = $forOf([10, 20]);
const tmpForOfNext = tmpForOfGenNext();
if (tmpForOfNext.done) {
  $(undefined);
} else {
  tmpForOfNext.value;
  const tmpThrowArg = $(1, `throw`);
  throw tmpThrowArg;
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 10, 20 ];
const b = $forOf( a );
const c = b();
const d = c.done;
if (d) {
  $( undefined );
}
else {
  c.value;
  const e = $( 1, "throw" );
  throw e;
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  let tmpCalleeParam = [10, 20];
  const tmpForOfGenNext = $forOf(tmpCalleeParam);
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    const tmpForOfNext = tmpForOfGenNext();
    const tmpIfTest = tmpForOfNext.done;
    if (tmpIfTest) {
      break;
    } else {
      let x = tmpForOfNext.value;
      const tmpThrowArg = $(1, `throw`);
      throw tmpThrowArg;
    }
  }
  return undefined;
};
let tmpCalleeParam$1 = f();
$(tmpCalleeParam$1);
`````


## Todos triggered


- (todo) array reads var statement with init CallExpression
- (todo) fixme: spyless vars and labeled nodes
- (todo) support CallExpression as var init in let_hoisting noob check


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
