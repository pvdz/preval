# Preval test case

# some_without_context.md

> Array methods > Filter > Ai > Some without context
>
> Test: Array.filter without context

## Input

`````js filename=intro
let result = [];
const x = [1,2,3].filter(function(x) { result.push(this === undefined); });
$(result, x);
`````


## Settled


`````js filename=intro
const result /*:array*/ /*truthy*/ = [];
const tmpMCP /*:(unused)=>undefined*/ = function ($$0) {
  const tmpPrevalAliasThis /*:unknown*/ = this;
  debugger;
  const tmpMCP$1 /*:boolean*/ = tmpPrevalAliasThis === undefined;
  $dotCall($array_push, result, `push`, tmpMCP$1);
  return undefined;
};
const tmpMCOO /*:array*/ /*truthy*/ = [1, 2, 3];
const tmpArrenow /*:unknown*/ = $dotCall(tmpMCP, undefined, undefined, 1, 0, tmpMCOO);
const tmpArreout /*:array*/ /*truthy*/ = [];
if (tmpArrenow) {
  $dotCall($array_push, tmpArreout, `push`, 1);
} else {
}
const tmpArrin$1 /*:boolean*/ = 1 in tmpMCOO;
if (tmpArrin$1) {
  const tmpArrel$1 /*:primitive*/ = tmpMCOO[1];
  const tmpArrenow$1 /*:unknown*/ = $dotCall(tmpMCP, undefined, undefined, tmpArrel$1, 1, tmpMCOO);
  if (tmpArrenow$1) {
    $dotCall($array_push, tmpArreout, `push`, tmpArrel$1);
  } else {
  }
} else {
}
const tmpArrin$2 /*:boolean*/ = 2 in tmpMCOO;
if (tmpArrin$2) {
  const tmpArrel$2 /*:primitive*/ = tmpMCOO[2];
  const tmpArrenow$2 /*:unknown*/ = $dotCall(tmpMCP, undefined, undefined, tmpArrel$2, 2, tmpMCOO);
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
const tmpMCP = function ($$0) {
  const tmpPrevalAliasThis = this;
  $dotCall($array_push, result, `push`, tmpPrevalAliasThis === undefined);
};
const tmpMCOO = [1, 2, 3];
const tmpArrenow = $dotCall(tmpMCP, undefined, undefined, 1, 0, tmpMCOO);
const tmpArreout = [];
if (tmpArrenow) {
  $dotCall($array_push, tmpArreout, `push`, 1);
}
if (1 in tmpMCOO) {
  const tmpArrel$1 = tmpMCOO[1];
  if ($dotCall(tmpMCP, undefined, undefined, tmpArrel$1, 1, tmpMCOO)) {
    $dotCall($array_push, tmpArreout, `push`, tmpArrel$1);
  }
}
if (2 in tmpMCOO) {
  const tmpArrel$2 = tmpMCOO[2];
  if ($dotCall(tmpMCP, undefined, undefined, tmpArrel$2, 2, tmpMCOO)) {
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
  debugger;
  const d = c === undefined;
  $dotCall( $array_push, a, "push", d );
  return undefined;
};
const e = [ 1, 2, 3 ];
const f = $dotCall( b, undefined, undefined, 1, 0, e );
const g = [];
if (f) {
  $dotCall( $array_push, g, "push", 1 );
}
const h = 1 in e;
if (h) {
  const i = e[ 1 ];
  const j = $dotCall( b, undefined, undefined, i, 1, e );
  if (j) {
    $dotCall( $array_push, g, "push", i );
  }
}
const k = 2 in e;
if (k) {
  const l = e[ 2 ];
  const m = $dotCall( b, undefined, undefined, l, 2, e );
  if (m) {
    $dotCall( $array_push, g, "push", l );
    $( a, g );
  }
  else {
    $( a, g );
  }
}
else {
  $( a, g );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let result = [];
const tmpMCOO = [1, 2, 3];
const tmpMCF = tmpMCOO.filter;
const tmpMCP = function ($$0) {
  const tmpPrevalAliasThis = this;
  let x$1 = $$0;
  debugger;
  const tmpMCF$1 = result.push;
  const tmpMCP$1 = tmpPrevalAliasThis === undefined;
  $dotCall(tmpMCF$1, result, `push`, tmpMCP$1);
  return undefined;
};
const x = $dotCall(tmpMCF, tmpMCOO, `filter`, tmpMCP);
$(result, x);
`````


## Todos triggered


- (todo) Support this binary expression operator:
- (todo) access object property that also exists on prototype? $array_push
- (todo) support array reads statement type EmptyStatement
- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement
- (todo) support array reads statement type WhileStatement
- (todo) type trackeed tricks can possibly support static $array_filter


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [true, true, true], []
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
