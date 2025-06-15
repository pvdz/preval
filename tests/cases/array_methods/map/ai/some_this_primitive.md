# Preval test case

# some_this_primitive.md

> Array methods > Map > Ai > Some this primitive
>
> Test: Array.map with thisArg as primitive (number)

## Input

`````js filename=intro
const x = [1,2,3].map(function(x) { $(this === 42); }, 42);
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
const tmpArrenow /*:unknown*/ = $dotCall(tmpMCP, 42, undefined, 1, 0, tmpMCOO);
const tmpArrin$1 /*:boolean*/ = 1 in tmpMCOO;
const tmpArreout /*:array*/ /*truthy*/ = [tmpArrenow];
if (tmpArrin$1) {
  const tmpArrel$1 /*:primitive*/ = tmpMCOO[1];
  const tmpArrenow$1 /*:unknown*/ = $dotCall(tmpMCP, 42, undefined, tmpArrel$1, 1, tmpMCOO);
  tmpArreout[1] = tmpArrenow$1;
} else {
}
const tmpArrin$2 /*:boolean*/ = 2 in tmpMCOO;
if (tmpArrin$2) {
  const tmpArrel$2 /*:primitive*/ = tmpMCOO[2];
  const tmpArrenow$2 /*:unknown*/ = $dotCall(tmpMCP, 42, undefined, tmpArrel$2, 2, tmpMCOO);
  tmpArreout[2] = tmpArrenow$2;
} else {
}
tmpArreout.length = 3;
$(tmpArreout);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCP = function ($$0) {
  const tmpPrevalAliasThis = this;
  $(tmpPrevalAliasThis === 42);
};
const tmpMCOO = [1, 2, 3];
const tmpArrenow = $dotCall(tmpMCP, 42, undefined, 1, 0, tmpMCOO);
const tmpArrin$1 = 1 in tmpMCOO;
const tmpArreout = [tmpArrenow];
if (tmpArrin$1) {
  const tmpArrenow$1 = $dotCall(tmpMCP, 42, undefined, tmpMCOO[1], 1, tmpMCOO);
  tmpArreout[1] = tmpArrenow$1;
}
if (2 in tmpMCOO) {
  const tmpArrenow$2 = $dotCall(tmpMCP, 42, undefined, tmpMCOO[2], 2, tmpMCOO);
  tmpArreout[2] = tmpArrenow$2;
}
tmpArreout.length = 3;
$(tmpArreout);
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
const e = $dotCall( a, 42, undefined, 1, 0, d );
const f = 1 in d;
const g = [ e ];
if (f) {
  const h = d[ 1 ];
  const i = $dotCall( a, 42, undefined, h, 1, d );
  g[1] = i;
}
const j = 2 in d;
if (j) {
  const k = d[ 2 ];
  const l = $dotCall( a, 42, undefined, k, 2, d );
  g[2] = l;
}
g.length = 3;
$( g );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCOO = [1, 2, 3];
const tmpMCF = tmpMCOO.map;
const tmpMCP = function ($$0) {
  const tmpPrevalAliasThis = this;
  let x$1 = $$0;
  debugger;
  let tmpCalleeParam = tmpPrevalAliasThis === 42;
  $(tmpCalleeParam);
  return undefined;
};
const x = $dotCall(tmpMCF, tmpMCOO, `map`, tmpMCP, 42);
$(x);
`````


## Todos triggered


- (todo) Support this binary expression operator:
- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement
- (todo) support array reads statement type WhileStatement
- (todo) type trackeed tricks can possibly support static $array_map


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - 2: true
 - 3: true
 - 4: [undefined, undefined, undefined]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
