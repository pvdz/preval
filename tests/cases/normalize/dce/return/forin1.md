# Preval test case

# forin1.md

> Normalize > Dce > Return > Forin1
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
const tmpCalleeParam /*:object*/ = { a: 1, b: 2 };
const tmpForInGen /*:unknown*/ = $forIn(tmpCalleeParam);
const tmpForInNext /*:unknown*/ = tmpForInGen.next();
const tmpIfTest /*:unknown*/ = tmpForInNext.done;
if (tmpIfTest) {
  $(`keep, do not eval`);
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
