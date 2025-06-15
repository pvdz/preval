# Preval test case

# some_with_context.md

> Array methods > Filter > Ai > Some with context
>
> Test: Array.filter with context

## Input

`````js filename=intro
let ctx = {mult: 2};
let result = [];
const x = [1,2,3].filter(function(x) { result.push(x * this.mult); }, ctx);
$(result, x);
`````


## Settled


`````js filename=intro
const result /*:array*/ /*truthy*/ = [];
const tmpMCP /*:(unknown)=>undefined*/ = function ($$0) {
  const tmpPrevalAliasThis /*:unknown*/ = this;
  const x$1 /*:unknown*/ = $$0;
  debugger;
  const tmpBinBothRhs /*:unknown*/ = tmpPrevalAliasThis.mult;
  const tmpMCP$1 /*:number*/ = x$1 * tmpBinBothRhs;
  $dotCall($array_push, result, `push`, tmpMCP$1);
  return undefined;
};
const ctx /*:object*/ /*truthy*/ = { mult: 2 };
const tmpMCOO /*:array*/ /*truthy*/ = [1, 2, 3];
const tmpArrenow /*:unknown*/ = $dotCall(tmpMCP, ctx, undefined, 1, 0, tmpMCOO);
const tmpArreout /*:array*/ /*truthy*/ = [];
if (tmpArrenow) {
  $dotCall($array_push, tmpArreout, `push`, 1);
} else {
}
const tmpArrin$1 /*:boolean*/ = 1 in tmpMCOO;
if (tmpArrin$1) {
  const tmpArrel$1 /*:primitive*/ = tmpMCOO[1];
  const tmpArrenow$1 /*:unknown*/ = $dotCall(tmpMCP, ctx, undefined, tmpArrel$1, 1, tmpMCOO);
  if (tmpArrenow$1) {
    $dotCall($array_push, tmpArreout, `push`, tmpArrel$1);
  } else {
  }
} else {
}
const tmpArrin$2 /*:boolean*/ = 2 in tmpMCOO;
if (tmpArrin$2) {
  const tmpArrel$2 /*:primitive*/ = tmpMCOO[2];
  const tmpArrenow$2 /*:unknown*/ = $dotCall(tmpMCP, ctx, undefined, tmpArrel$2, 2, tmpMCOO);
  if (tmpArrenow$2) {
    $dotCall($array_push, tmpArreout, `push`, tmpArrel$2);
    $(result, tmpArreout);
  } else {
    $(result, tmpArreout);
  }
} else {
  $(result, tmpArreout);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const result = [];
const tmpMCP = function (x$1) {
  const tmpPrevalAliasThis = this;
  $dotCall($array_push, result, `push`, x$1 * tmpPrevalAliasThis.mult);
};
const ctx = { mult: 2 };
const tmpMCOO = [1, 2, 3];
const tmpArrenow = $dotCall(tmpMCP, ctx, undefined, 1, 0, tmpMCOO);
const tmpArreout = [];
if (tmpArrenow) {
  $dotCall($array_push, tmpArreout, `push`, 1);
}
if (1 in tmpMCOO) {
  const tmpArrel$1 = tmpMCOO[1];
  if ($dotCall(tmpMCP, ctx, undefined, tmpArrel$1, 1, tmpMCOO)) {
    $dotCall($array_push, tmpArreout, `push`, tmpArrel$1);
  }
}
if (2 in tmpMCOO) {
  const tmpArrel$2 = tmpMCOO[2];
  if ($dotCall(tmpMCP, ctx, undefined, tmpArrel$2, 2, tmpMCOO)) {
    $dotCall($array_push, tmpArreout, `push`, tmpArrel$2);
    $(result, tmpArreout);
  } else {
    $(result, tmpArreout);
  }
} else {
  $(result, tmpArreout);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [];
const b = function($$0 ) {
  const c = this;
  const d = $$0;
  debugger;
  const e = c.mult;
  const f = d * e;
  $dotCall( $array_push, a, "push", f );
  return undefined;
};
const g = { mult: 2 };
const h = [ 1, 2, 3 ];
const i = $dotCall( b, g, undefined, 1, 0, h );
const j = [];
if (i) {
  $dotCall( $array_push, j, "push", 1 );
}
const k = 1 in h;
if (k) {
  const l = h[ 1 ];
  const m = $dotCall( b, g, undefined, l, 1, h );
  if (m) {
    $dotCall( $array_push, j, "push", l );
  }
}
const n = 2 in h;
if (n) {
  const o = h[ 2 ];
  const p = $dotCall( b, g, undefined, o, 2, h );
  if (p) {
    $dotCall( $array_push, j, "push", o );
    $( a, j );
  }
  else {
    $( a, j );
  }
}
else {
  $( a, j );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let ctx = { mult: 2 };
let result = [];
const tmpMCOO = [1, 2, 3];
const tmpMCF = tmpMCOO.filter;
const tmpMCP = function ($$0) {
  const tmpPrevalAliasThis = this;
  let x$1 = $$0;
  debugger;
  const tmpMCF$1 = result.push;
  const tmpBinBothLhs = x$1;
  const tmpBinBothRhs = tmpPrevalAliasThis.mult;
  const tmpMCP$1 = tmpBinBothLhs * tmpBinBothRhs;
  $dotCall(tmpMCF$1, result, `push`, tmpMCP$1);
  return undefined;
};
const x = $dotCall(tmpMCF, tmpMCOO, `filter`, tmpMCP, ctx);
$(result, x);
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $array_push
- (todo) objects in isFree check
- (todo) support array reads statement type EmptyStatement
- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement
- (todo) support array reads statement type WhileStatement
- (todo) type trackeed tricks can possibly support static $array_filter


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [2, 4, 6], []
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
