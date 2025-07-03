# Preval test case

# for_each.md

> Promises > For each
>
>

## Input

`````js filename=intro
async function f(x) {
  return $(x);
}
$([1,2,3].forEach(f));
`````


## Settled


`````js filename=intro
try {
  $(1);
} catch (tmpRejectErr) {}
try {
  $(2);
} catch (tmpRejectErr$1) {}
try {
  $(3);
} catch (tmpRejectErr$2) {}
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
try {
  $(1);
} catch (tmpRejectErr) {}
try {
  $(2);
} catch (tmpRejectErr$1) {}
try {
  $(3);
} catch (tmpRejectErr$2) {}
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
try {
  $( 1 );
}
catch (a) {

}
try {
  $( 2 );
}
catch (b) {

}
try {
  $( 3 );
}
catch (c) {

}
$( undefined );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = async function ($$0) {
  let x = $$0;
  debugger;
  const tmpReturnArg = $(x);
  return tmpReturnArg;
};
const tmpMCOO = [1, 2, 3];
const tmpMCF = tmpMCOO.forEach;
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `forEach`, f);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) Support this binary expression operator:
- (todo) array reads var statement with init BinaryExpression
- (todo) array reads var statement with init CallExpression
- (todo) can try-escaping support this expr node type? CallExpression
- (todo) inline async functions safely (because await)
- (todo) type trackeed tricks can possibly support static $Promise_reject
- (todo) type trackeed tricks can possibly support static $Promise_resolve
- (todo) type trackeed tricks can possibly support static $array_forEach


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 3
 - 4: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
