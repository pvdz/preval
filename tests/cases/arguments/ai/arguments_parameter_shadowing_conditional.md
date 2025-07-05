# Preval test case

# arguments_parameter_shadowing_conditional.md

> Arguments > Ai > Arguments parameter shadowing conditional
>
> Test parameter shadowing with conditional access

## Input

`````js filename=intro
function testArgsParameterShadowingConditional() {
  const len = arguments.length;
  let result = [];
  
  if (len >= 1) {
    result.push(arguments[0]);
  }
  if (len >= 2) {
    result.push(arguments[1]);
  }
  if (len >= 3) {
    result.push(arguments[2]);
  }
  if (len >= 4) {
    result.push(arguments[3]);
  }
  
  $(len, result);
}

testArgsParameterShadowingConditional();
testArgsParameterShadowingConditional(1);
testArgsParameterShadowingConditional(1, 2);
testArgsParameterShadowingConditional(1, 2, 3);
testArgsParameterShadowingConditional(1, 2, 3, 4);
`````


## Settled


`````js filename=intro
const testArgsParameterShadowingConditional /*:()=>undefined*/ = function (/*uses arguments*/) {
  const tmpPrevalAliasArgumentsAny /*:arguments*/ /*truthy*/ = arguments;
  const tmpPrevalAliasArgumentsLen$1 /*:number*/ = arguments.length;
  debugger;
  const tmpIfTest /*:boolean*/ = tmpPrevalAliasArgumentsLen$1 >= 1;
  const result /*:array*/ /*truthy*/ = [];
  if (tmpIfTest) {
    const tmpMCP /*:unknown*/ = tmpPrevalAliasArgumentsAny[0];
    $dotCall($array_push, result, `push`, tmpMCP);
  } else {
  }
  const tmpIfTest$1 /*:boolean*/ = tmpPrevalAliasArgumentsLen$1 >= 2;
  if (tmpIfTest$1) {
    const tmpMCP$1 /*:unknown*/ = tmpPrevalAliasArgumentsAny[1];
    $dotCall($array_push, result, `push`, tmpMCP$1);
  } else {
  }
  const tmpIfTest$3 /*:boolean*/ = tmpPrevalAliasArgumentsLen$1 >= 3;
  if (tmpIfTest$3) {
    const tmpMCP$3 /*:unknown*/ = tmpPrevalAliasArgumentsAny[2];
    $dotCall($array_push, result, `push`, tmpMCP$3);
  } else {
  }
  const tmpIfTest$5 /*:boolean*/ = tmpPrevalAliasArgumentsLen$1 >= 4;
  if (tmpIfTest$5) {
    const tmpMCP$5 /*:unknown*/ = tmpPrevalAliasArgumentsAny[3];
    $dotCall($array_push, result, `push`, tmpMCP$5);
    $(tmpPrevalAliasArgumentsLen$1, result);
    return undefined;
  } else {
    $(tmpPrevalAliasArgumentsLen$1, result);
    return undefined;
  }
};
testArgsParameterShadowingConditional();
testArgsParameterShadowingConditional(1);
testArgsParameterShadowingConditional(1, 2);
testArgsParameterShadowingConditional(1, 2, 3);
testArgsParameterShadowingConditional(1, 2, 3, 4);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const testArgsParameterShadowingConditional = function () {
  const tmpPrevalAliasArgumentsAny = arguments;
  const tmpPrevalAliasArgumentsLen$1 = arguments.length;
  const tmpIfTest = tmpPrevalAliasArgumentsLen$1 >= 1;
  const result = [];
  if (tmpIfTest) {
    $dotCall($array_push, result, `push`, tmpPrevalAliasArgumentsAny[0]);
  }
  if (tmpPrevalAliasArgumentsLen$1 >= 2) {
    $dotCall($array_push, result, `push`, tmpPrevalAliasArgumentsAny[1]);
  }
  if (tmpPrevalAliasArgumentsLen$1 >= 3) {
    $dotCall($array_push, result, `push`, tmpPrevalAliasArgumentsAny[2]);
  }
  if (tmpPrevalAliasArgumentsLen$1 >= 4) {
    $dotCall($array_push, result, `push`, tmpPrevalAliasArgumentsAny[3]);
    $(tmpPrevalAliasArgumentsLen$1, result);
  } else {
    $(tmpPrevalAliasArgumentsLen$1, result);
  }
};
testArgsParameterShadowingConditional();
testArgsParameterShadowingConditional(1);
testArgsParameterShadowingConditional(1, 2);
testArgsParameterShadowingConditional(1, 2, 3);
testArgsParameterShadowingConditional(1, 2, 3, 4);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  const b = c;
  const d = c.length;
  debugger;
  const e = d >= 1;
  const f = [];
  if (e) {
    const g = b[ 0 ];
    $dotCall( $array_push, f, "push", g );
  }
  const h = d >= 2;
  if (h) {
    const i = b[ 1 ];
    $dotCall( $array_push, f, "push", i );
  }
  const j = d >= 3;
  if (j) {
    const k = b[ 2 ];
    $dotCall( $array_push, f, "push", k );
  }
  const l = d >= 4;
  if (l) {
    const m = b[ 3 ];
    $dotCall( $array_push, f, "push", m );
    $( d, f );
    return undefined;
  }
  else {
    $( d, f );
    return undefined;
  }
};
a();
a( 1 );
a( 1, 2 );
a( 1, 2, 3 );
a( 1, 2, 3, 4 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let testArgsParameterShadowingConditional = function () {
  const tmpPrevalAliasArgumentsAny = arguments;
  const tmpPrevalAliasArgumentsLen = arguments.length;
  debugger;
  const len = tmpPrevalAliasArgumentsLen;
  let result = [];
  const tmpIfTest = len >= 1;
  if (tmpIfTest) {
    const tmpMCF = result.push;
    const tmpMCP = tmpPrevalAliasArgumentsAny[0];
    $dotCall(tmpMCF, result, `push`, tmpMCP);
  } else {
  }
  const tmpIfTest$1 = len >= 2;
  if (tmpIfTest$1) {
    const tmpMCF$1 = result.push;
    const tmpMCP$1 = tmpPrevalAliasArgumentsAny[1];
    $dotCall(tmpMCF$1, result, `push`, tmpMCP$1);
  } else {
  }
  const tmpIfTest$3 = len >= 3;
  if (tmpIfTest$3) {
    const tmpMCF$3 = result.push;
    const tmpMCP$3 = tmpPrevalAliasArgumentsAny[2];
    $dotCall(tmpMCF$3, result, `push`, tmpMCP$3);
  } else {
  }
  const tmpIfTest$5 = len >= 4;
  if (tmpIfTest$5) {
    const tmpMCF$5 = result.push;
    const tmpMCP$5 = tmpPrevalAliasArgumentsAny[3];
    $dotCall(tmpMCF$5, result, `push`, tmpMCP$5);
    $(len, result);
    return undefined;
  } else {
    $(len, result);
    return undefined;
  }
};
testArgsParameterShadowingConditional();
testArgsParameterShadowingConditional(1);
testArgsParameterShadowingConditional(1, 2);
testArgsParameterShadowingConditional(1, 2, 3);
testArgsParameterShadowingConditional(1, 2, 3, 4);
`````


## Todos triggered


- (todo) Can we inline a function that uses arguments, anyways?
- (todo) access object property that also exists on prototype? $array_push
- (todo) array reads var statement with init MemberExpression
- (todo) support array reads statement type ExpressionStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0, []
 - 2: 1, [1]
 - 3: 2, [1, 2]
 - 4: 3, [1, 2, 3]
 - 5: 4, [1, 2, 3, 4]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
