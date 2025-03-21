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
const tmpCalleeParam /*:array*/ = [10, 20];
const tmpForOfGen /*:unknown*/ = $forOf(tmpCalleeParam);
const tmpForOfNext /*:unknown*/ = tmpForOfGen.next();
const tmpIfTest /*:unknown*/ = tmpForOfNext.done;
if (tmpIfTest) {
  $(`keep, do not eval`);
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
const c = b.next();
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
