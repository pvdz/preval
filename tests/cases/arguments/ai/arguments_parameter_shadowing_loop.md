# Preval test case

# arguments_parameter_shadowing_loop.md

> Arguments > Ai > Arguments parameter shadowing loop
>
> Test parameter shadowing with loop iteration

## Input

`````js filename=intro
function testArgsParameterShadowingLoop() {
  let sum = 0;
  for (let i = 0; i < arguments.length; i++) {
    sum += arguments[i];
  }
  $(sum);
}

testArgsParameterShadowingLoop(1, 2, 3, 4, 5);
`````


## Settled


`````js filename=intro
const testArgsParameterShadowingLoop /*:()=>undefined*/ = function (/*uses arguments*/) {
  const tmpPrevalAliasArgumentsAny /*:arguments*/ /*truthy*/ = arguments;
  debugger;
  const tmpBinBothRhs /*:unknown*/ = tmpPrevalAliasArgumentsAny[0];
  const tmpClusterSSA_sum /*:primitive*/ = 0 + tmpBinBothRhs;
  const tmpBinBothRhs$1 /*:unknown*/ = tmpPrevalAliasArgumentsAny[1];
  const tmpClusterSSA_sum$1 /*:primitive*/ = tmpClusterSSA_sum + tmpBinBothRhs$1;
  const tmpBinBothRhs$2 /*:unknown*/ = tmpPrevalAliasArgumentsAny[2];
  const tmpClusterSSA_sum$2 /*:primitive*/ = tmpClusterSSA_sum$1 + tmpBinBothRhs$2;
  const tmpBinBothRhs$3 /*:unknown*/ = tmpPrevalAliasArgumentsAny[3];
  const tmpClusterSSA_sum$3 /*:primitive*/ = tmpClusterSSA_sum$2 + tmpBinBothRhs$3;
  const tmpBinBothRhs$4 /*:unknown*/ = tmpPrevalAliasArgumentsAny[4];
  const tmpClusterSSA_sum$4 /*:primitive*/ = tmpClusterSSA_sum$3 + tmpBinBothRhs$4;
  $(tmpClusterSSA_sum$4);
  return undefined;
};
testArgsParameterShadowingLoop(1, 2, 3, 4, 5);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const testArgsParameterShadowingLoop = function () {
  const tmpPrevalAliasArgumentsAny = arguments;
  const tmpBinBothRhs = tmpPrevalAliasArgumentsAny[0];
  const tmpClusterSSA_sum$3 =
    0 + tmpBinBothRhs + tmpPrevalAliasArgumentsAny[1] + tmpPrevalAliasArgumentsAny[2] + tmpPrevalAliasArgumentsAny[3];
  $(tmpClusterSSA_sum$3 + tmpPrevalAliasArgumentsAny[4]);
};
testArgsParameterShadowingLoop(1, 2, 3, 4, 5);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  const b = c;
  debugger;
  const d = b[ 0 ];
  const e = 0 + d;
  const f = b[ 1 ];
  const g = e + f;
  const h = b[ 2 ];
  const i = g + h;
  const j = b[ 3 ];
  const k = i + j;
  const l = b[ 4 ];
  const m = k + l;
  $( m );
  return undefined;
};
a( 1, 2, 3, 4, 5 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let testArgsParameterShadowingLoop = function () {
  const tmpPrevalAliasArgumentsAny = arguments;
  const tmpPrevalAliasArgumentsLen = arguments.length;
  debugger;
  let sum = 0;
  let i = 0;
  while (true) {
    const tmpIfTest = i < tmpPrevalAliasArgumentsLen;
    if (tmpIfTest) {
      const tmpBinBothLhs = sum;
      const tmpBinBothRhs = tmpPrevalAliasArgumentsAny[i];
      sum = tmpBinBothLhs + tmpBinBothRhs;
      const tmpPostUpdArgIdent = $coerce(i, `number`);
      i = tmpPostUpdArgIdent + 1;
    } else {
      break;
    }
  }
  $(sum);
  return undefined;
};
testArgsParameterShadowingLoop(1, 2, 3, 4, 5);
`````


## Todos triggered


- (todo) Can we inline a function that uses arguments, anyways?
- (todo) Support this node type in isFree: DebuggerStatement
- (todo) regular property access of an ident feels tricky;


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 15
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
