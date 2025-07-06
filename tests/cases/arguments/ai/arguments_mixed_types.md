# Preval test case

# arguments_mixed_types.md

> Arguments > Ai > Arguments mixed types
>
> Test arguments with mixed types

## Input

`````js filename=intro
function testMixedTypes() {
  const len = arguments.length;
  const types = [];
  for (let i = 0; i < len; i++) {
    types.push(typeof arguments[i]);
  }
  $(len, types);
}

testMixedTypes('string', 42, true, null, undefined, {}, [], function() {});
`````


## Settled


`````js filename=intro
const testMixedTypes /*:()=>undefined*/ = function (/*uses arguments*/) {
  const tmpPrevalAliasArgumentsAny /*:arguments*/ /*truthy*/ = arguments;
  debugger;
  const tmpUnaryArg /*:unknown*/ = tmpPrevalAliasArgumentsAny[0];
  const types /*:array*/ /*truthy*/ = [];
  const tmpMCP /*:string*/ /*truthy*/ = typeof tmpUnaryArg;
  $dotCall($array_push, types, `push`, tmpMCP);
  const tmpUnaryArg$1 /*:unknown*/ = tmpPrevalAliasArgumentsAny[1];
  const tmpMCP$1 /*:string*/ /*truthy*/ = typeof tmpUnaryArg$1;
  $dotCall($array_push, types, `push`, tmpMCP$1);
  const tmpUnaryArg$2 /*:unknown*/ = tmpPrevalAliasArgumentsAny[2];
  const tmpMCP$2 /*:string*/ /*truthy*/ = typeof tmpUnaryArg$2;
  $dotCall($array_push, types, `push`, tmpMCP$2);
  const tmpUnaryArg$3 /*:unknown*/ = tmpPrevalAliasArgumentsAny[3];
  const tmpMCP$3 /*:string*/ /*truthy*/ = typeof tmpUnaryArg$3;
  $dotCall($array_push, types, `push`, tmpMCP$3);
  const tmpUnaryArg$4 /*:unknown*/ = tmpPrevalAliasArgumentsAny[4];
  const tmpMCP$4 /*:string*/ /*truthy*/ = typeof tmpUnaryArg$4;
  $dotCall($array_push, types, `push`, tmpMCP$4);
  const tmpUnaryArg$5 /*:unknown*/ = tmpPrevalAliasArgumentsAny[5];
  const tmpMCP$5 /*:string*/ /*truthy*/ = typeof tmpUnaryArg$5;
  $dotCall($array_push, types, `push`, tmpMCP$5);
  const tmpUnaryArg$6 /*:unknown*/ = tmpPrevalAliasArgumentsAny[6];
  const tmpMCP$6 /*:string*/ /*truthy*/ = typeof tmpUnaryArg$6;
  $dotCall($array_push, types, `push`, tmpMCP$6);
  const tmpUnaryArg$7 /*:unknown*/ = tmpPrevalAliasArgumentsAny[7];
  const tmpMCP$7 /*:string*/ /*truthy*/ = typeof tmpUnaryArg$7;
  $dotCall($array_push, types, `push`, tmpMCP$7);
  $(8, types);
  return undefined;
};
const tmpCalleeParam$3 /*:()=>undefined*/ = function $pcompiled() {
  debugger;
  return undefined;
};
const tmpCalleeParam /*:object*/ /*truthy*/ = {};
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [];
testMixedTypes(`string`, 42, true, null, undefined, tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const testMixedTypes = function () {
  const tmpPrevalAliasArgumentsAny = arguments;
  const tmpUnaryArg = tmpPrevalAliasArgumentsAny[0];
  const types = [];
  $dotCall($array_push, types, `push`, typeof tmpUnaryArg);
  const tmpUnaryArg$1 = tmpPrevalAliasArgumentsAny[1];
  $dotCall($array_push, types, `push`, typeof tmpUnaryArg$1);
  const tmpUnaryArg$2 = tmpPrevalAliasArgumentsAny[2];
  $dotCall($array_push, types, `push`, typeof tmpUnaryArg$2);
  const tmpUnaryArg$3 = tmpPrevalAliasArgumentsAny[3];
  $dotCall($array_push, types, `push`, typeof tmpUnaryArg$3);
  const tmpUnaryArg$4 = tmpPrevalAliasArgumentsAny[4];
  $dotCall($array_push, types, `push`, typeof tmpUnaryArg$4);
  const tmpUnaryArg$5 = tmpPrevalAliasArgumentsAny[5];
  $dotCall($array_push, types, `push`, typeof tmpUnaryArg$5);
  const tmpUnaryArg$6 = tmpPrevalAliasArgumentsAny[6];
  $dotCall($array_push, types, `push`, typeof tmpUnaryArg$6);
  const tmpUnaryArg$7 = tmpPrevalAliasArgumentsAny[7];
  $dotCall($array_push, types, `push`, typeof tmpUnaryArg$7);
  $(8, types);
};
const tmpCalleeParam$3 = function $pcompiled() {};
testMixedTypes(`string`, 42, true, null, undefined, {}, [], tmpCalleeParam$3);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  const b = c;
  debugger;
  const d = b[ 0 ];
  const e = [];
  const f = typeof d;
  $dotCall( $array_push, e, "push", f );
  const g = b[ 1 ];
  const h = typeof g;
  $dotCall( $array_push, e, "push", h );
  const i = b[ 2 ];
  const j = typeof i;
  $dotCall( $array_push, e, "push", j );
  const k = b[ 3 ];
  const l = typeof k;
  $dotCall( $array_push, e, "push", l );
  const m = b[ 4 ];
  const n = typeof m;
  $dotCall( $array_push, e, "push", n );
  const o = b[ 5 ];
  const p = typeof o;
  $dotCall( $array_push, e, "push", p );
  const q = b[ 6 ];
  const r = typeof q;
  $dotCall( $array_push, e, "push", r );
  const s = b[ 7 ];
  const t = typeof s;
  $dotCall( $array_push, e, "push", t );
  $( 8, e );
  return undefined;
};
const u = function $pcompiled() {
  debugger;
  return undefined;
};
const v = {};
const w = [];
a( "string", 42, true, null, undefined, v, w, u );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let testMixedTypes = function () {
  const tmpPrevalAliasArgumentsAny = arguments;
  const tmpPrevalAliasArgumentsLen = arguments.length;
  debugger;
  const len = tmpPrevalAliasArgumentsLen;
  const types = [];
  let i = 0;
  while (true) {
    const tmpIfTest = i < len;
    if (tmpIfTest) {
      const tmpMCF = types.push;
      const tmpUnaryArg = tmpPrevalAliasArgumentsAny[i];
      const tmpMCP = typeof tmpUnaryArg;
      $dotCall(tmpMCF, types, `push`, tmpMCP);
      const tmpPostUpdArgIdent = $coerce(i, `number`);
      i = tmpPostUpdArgIdent + 1;
    } else {
      break;
    }
  }
  $(len, types);
  return undefined;
};
const tmpCallCallee = testMixedTypes;
let tmpCalleeParam = {};
let tmpCalleeParam$1 = [];
let tmpCalleeParam$3 = function () {
  debugger;
  return undefined;
};
testMixedTypes(`string`, 42, true, null, undefined, tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$3);
`````


## Todos triggered


- (todo) - at least one of the call args to
- (todo) Can we inline a function that uses arguments, anyways?
- (todo) Support this node type in isFree: DebuggerStatement
- (todo) access object property that also exists on prototype? $array_push
- (todo) arr push case with at least one observable statement between?
- (todo) array reads var statement with init MemberExpression
- (todo) array reads var statement with init UnaryExpression
- (todo) inline arguments when function does not have that many params yet
- (todo) regular property access of an ident feels tricky;
- (todo) support array reads statement type ExpressionStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 8, ['string', 'number', 'boolean', 'object', 'undefined', 'object', 'object', 'function']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
