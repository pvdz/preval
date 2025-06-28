# Preval test case

# plain.md

> Promises > Plain
>
>

## Input

`````js filename=intro
async function f() {
  return $(true);
}
$(f());
`````


## Settled


`````js filename=intro
let tmpCalleeParam /*:unknown*/ = undefined;
try {
  const tmpReturnArg /*:unknown*/ = $(true);
  tmpCalleeParam = $Promise_resolve(tmpReturnArg);
} catch (tmpRejectErr) {
  tmpCalleeParam = $Promise_reject(tmpRejectErr);
}
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpCalleeParam = undefined;
try {
  tmpCalleeParam = $Promise_resolve($(true));
} catch (tmpRejectErr) {
  tmpCalleeParam = $Promise_reject(tmpRejectErr);
}
$(tmpCalleeParam);
`````


## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
try {
  const b = $( true );
  a = $Promise_resolve( b );
}
catch (c) {
  a = $Promise_reject( c );
}
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = async function () {
  debugger;
  const tmpReturnArg = $(true);
  return tmpReturnArg;
};
let tmpCalleeParam = f();
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) can try-escaping support this expr node type? CallExpression
- (todo) inline async functions safely (because await)
- (todo) type trackeed tricks can possibly support static $Promise_reject
- (todo) type trackeed tricks can possibly support static $Promise_resolve


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - 2: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
