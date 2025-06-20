# Preval test case

# forin2.md

> Normalize > Dce > Return > Forin2
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
  $('keep, do not eval');
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
  $(`keep, do not eval`);
  $(undefined);
} else {
  tmpForOfNext.value;
  const tmpClusterSSA_tmpCalleeParam$1 /*:unknown*/ = $(1, `return`);
  $(tmpClusterSSA_tmpCalleeParam$1);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpForOfGenNext = $forOf([10, 20]);
const tmpForOfNext = tmpForOfGenNext();
if (tmpForOfNext.done) {
  $(`keep, do not eval`);
  $(undefined);
} else {
  tmpForOfNext.value;
  $($(1, `return`));
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
  let tmpCalleeParam = [10, 20];
  const tmpForOfGenNext = $forOf(tmpCalleeParam);
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    const tmpForOfNext = tmpForOfGenNext();
    const tmpIfTest = tmpForOfNext.done;
    if (tmpIfTest) {
      break;
    } else {
      let x = tmpForOfNext.value;
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


- (todo) support array reads statement type VarStatement


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
