# Preval test case

# some_this_primitive.md

> Array methods > Reduce > Ai > Some this primitive
>
> Test: Array.reduce with thisArg as primitive (number)

## Input

`````js filename=intro
const x = [1,2,3].reduce(function(x) { $(this === 42); }, 42);
$(x);
`````


## Settled


`````js filename=intro
const tmpMCP /*:(unused)=>undefined*/ = function ($$0) {
  const tmpPrevalAliasThis /*:unknown*/ = this;
  debugger;
  const tmpCalleeParam /*:boolean*/ = tmpPrevalAliasThis === 42;
  $(tmpCalleeParam);
  return undefined;
};
const tmpMCOO /*:array*/ /*truthy*/ = [1, 2, 3];
let tmpSSA_tmpArreout /*:unknown*/ = $dotCall(tmpMCP, undefined, undefined, 42, 1, 0, tmpMCOO);
const tmpArrin$1 /*:boolean*/ = 1 in tmpMCOO;
if (tmpArrin$1) {
  const tmpArrel$1 /*:primitive*/ = tmpMCOO[1];
  tmpSSA_tmpArreout = $dotCall(tmpMCP, undefined, undefined, tmpSSA_tmpArreout, tmpArrel$1, 1, tmpMCOO);
} else {
}
const tmpArrin$2 /*:boolean*/ = 2 in tmpMCOO;
if (tmpArrin$2) {
  const tmpArrel$2 /*:primitive*/ = tmpMCOO[2];
  const tmpClusterSSA_tmpSSA_tmpArreout /*:unknown*/ = $dotCall(tmpMCP, undefined, undefined, tmpSSA_tmpArreout, tmpArrel$2, 2, tmpMCOO);
  $(tmpClusterSSA_tmpSSA_tmpArreout);
} else {
  $(tmpSSA_tmpArreout);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCP = function ($$0) {
  const tmpPrevalAliasThis = this;
  $(tmpPrevalAliasThis === 42);
};
const tmpMCOO = [1, 2, 3];
let tmpSSA_tmpArreout = $dotCall(tmpMCP, undefined, undefined, 42, 1, 0, tmpMCOO);
if (1 in tmpMCOO) {
  tmpSSA_tmpArreout = $dotCall(tmpMCP, undefined, undefined, tmpSSA_tmpArreout, tmpMCOO[1], 1, tmpMCOO);
}
if (2 in tmpMCOO) {
  $($dotCall(tmpMCP, undefined, undefined, tmpSSA_tmpArreout, tmpMCOO[2], 2, tmpMCOO));
} else {
  $(tmpSSA_tmpArreout);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function($$0 ) {
  const b = this;
  debugger;
  const c = b === 42;
  $( c );
  return undefined;
};
const d = [ 1, 2, 3 ];
let e = $dotCall( a, undefined, undefined, 42, 1, 0, d );
const f = 1 in d;
if (f) {
  const g = d[ 1 ];
  e = $dotCall( a, undefined, undefined, e, g, 1, d );
}
const h = 2 in d;
if (h) {
  const i = d[ 2 ];
  const j = $dotCall( a, undefined, undefined, e, i, 2, d );
  $( j );
}
else {
  $( e );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCOO = [1, 2, 3];
const tmpMCF = tmpMCOO.reduce;
const tmpMCP = function ($$0) {
  const tmpPrevalAliasThis = this;
  let x$1 = $$0;
  debugger;
  let tmpCalleeParam = tmpPrevalAliasThis === 42;
  $(tmpCalleeParam);
  return undefined;
};
const x = $dotCall(tmpMCF, tmpMCOO, `reduce`, tmpMCP, 42);
$(x);
`````


## Todos triggered


- (todo) - at least one of the frfr args was not isFree, bailing
- (todo) Support this binary expression operator:
- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement
- (todo) support array reads statement type WhileStatement
- (todo) type trackeed tricks can possibly support static $array_reduce


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: false
 - 2: false
 - 3: false
 - 4: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
