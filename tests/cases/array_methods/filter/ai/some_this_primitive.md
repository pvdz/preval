# Preval test case

# some_this_primitive.md

> Array methods > Filter > Ai > Some this primitive
>
> Test: Array.filter with thisArg as primitive (number)

## Input

`````js filename=intro
const x = [1,2,3].filter(function(x) { $(this === 42); }, 42);
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
const tmpLambdaFilterWas /*:unknown*/ = $dotCall(tmpMCP, 42, undefined, 1, 0, tmpMCOO);
const tmpLambdaFilterOut /*:array*/ /*truthy*/ = [];
if (tmpLambdaFilterWas) {
  $dotCall($array_push, tmpLambdaFilterOut, `push`, 1);
} else {
}
const tmpLambdaFilterHas$1 /*:boolean*/ = 1 in tmpMCOO;
if (tmpLambdaFilterHas$1) {
  const tmpLambdaFilterVal$1 /*:primitive*/ = tmpMCOO[1];
  const tmpLambdaFilterWas$1 /*:unknown*/ = $dotCall(tmpMCP, 42, undefined, tmpLambdaFilterVal$1, 1, tmpMCOO);
  if (tmpLambdaFilterWas$1) {
    $dotCall($array_push, tmpLambdaFilterOut, `push`, tmpLambdaFilterVal$1);
  } else {
  }
} else {
}
const tmpLambdaFilterHas$2 /*:boolean*/ = 2 in tmpMCOO;
if (tmpLambdaFilterHas$2) {
  const tmpLambdaFilterVal$2 /*:primitive*/ = tmpMCOO[2];
  const tmpLambdaFilterWas$2 /*:unknown*/ = $dotCall(tmpMCP, 42, undefined, tmpLambdaFilterVal$2, 2, tmpMCOO);
  if (tmpLambdaFilterWas$2) {
    $dotCall($array_push, tmpLambdaFilterOut, `push`, tmpLambdaFilterVal$2);
    $(tmpLambdaFilterOut);
  } else {
    $(tmpLambdaFilterOut);
  }
} else {
  $(tmpLambdaFilterOut);
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
const tmpLambdaFilterWas = $dotCall(tmpMCP, 42, undefined, 1, 0, tmpMCOO);
const tmpLambdaFilterOut = [];
if (tmpLambdaFilterWas) {
  $dotCall($array_push, tmpLambdaFilterOut, `push`, 1);
}
if (1 in tmpMCOO) {
  const tmpLambdaFilterVal$1 = tmpMCOO[1];
  if ($dotCall(tmpMCP, 42, undefined, tmpLambdaFilterVal$1, 1, tmpMCOO)) {
    $dotCall($array_push, tmpLambdaFilterOut, `push`, tmpLambdaFilterVal$1);
  }
}
if (2 in tmpMCOO) {
  const tmpLambdaFilterVal$2 = tmpMCOO[2];
  if ($dotCall(tmpMCP, 42, undefined, tmpLambdaFilterVal$2, 2, tmpMCOO)) {
    $dotCall($array_push, tmpLambdaFilterOut, `push`, tmpLambdaFilterVal$2);
    $(tmpLambdaFilterOut);
  } else {
    $(tmpLambdaFilterOut);
  }
} else {
  $(tmpLambdaFilterOut);
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
const e = $dotCall( a, 42, undefined, 1, 0, d );
const f = [];
if (e) {
  $dotCall( $array_push, f, "push", 1 );
}
const g = 1 in d;
if (g) {
  const h = d[ 1 ];
  const i = $dotCall( a, 42, undefined, h, 1, d );
  if (i) {
    $dotCall( $array_push, f, "push", h );
  }
}
const j = 2 in d;
if (j) {
  const k = d[ 2 ];
  const l = $dotCall( a, 42, undefined, k, 2, d );
  if (l) {
    $dotCall( $array_push, f, "push", k );
    $( f );
  }
  else {
    $( f );
  }
}
else {
  $( f );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCOO = [1, 2, 3];
const tmpMCF = tmpMCOO.filter;
const tmpMCP = function ($$0) {
  const tmpPrevalAliasThis = this;
  let x$1 = $$0;
  debugger;
  let tmpCalleeParam = tmpPrevalAliasThis === 42;
  $(tmpCalleeParam);
  return undefined;
};
const x = $dotCall(tmpMCF, tmpMCOO, `filter`, tmpMCP, 42);
$(x);
`````


## Todos triggered


- (todo) Support this binary expression operator:
- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement
- (todo) support array reads statement type WhileStatement
- (todo) type trackeed tricks can possibly support static $array_filter


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - 2: true
 - 3: true
 - 4: []
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
