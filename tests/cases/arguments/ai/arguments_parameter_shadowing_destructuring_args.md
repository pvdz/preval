# Preval test case

# arguments_parameter_shadowing_destructuring_args.md

> Arguments > Ai > Arguments parameter shadowing destructuring args
>
> Test parameter shadowing with destructuring arguments

## Input

`````js filename=intro
function testArgsParameterShadowingDestructuringArgs() {
  const [first, second, ...rest] = arguments;
  $(first, second, rest);
}

testArgsParameterShadowingDestructuringArgs('a', 'b', 'c', 'd', 'e');
`````


## Settled


`````js filename=intro
const testArgsParameterShadowingDestructuringArgs /*:()=>undefined*/ = function (/*uses arguments*/) {
  const tmpPrevalAliasArgumentsAny /*:arguments*/ /*truthy*/ = arguments;
  debugger;
  const tmpArrPatternSplat /*:array*/ /*truthy*/ = [...tmpPrevalAliasArgumentsAny];
  const first /*:unknown*/ = tmpArrPatternSplat[0];
  const second /*:unknown*/ = tmpArrPatternSplat[1];
  const rest /*:array*/ /*truthy*/ = $dotCall($array_slice, tmpArrPatternSplat, `slice`, 2);
  $(first, second, rest);
  return undefined;
};
testArgsParameterShadowingDestructuringArgs(`a`, `b`, `c`, `d`, `e`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const testArgsParameterShadowingDestructuringArgs = function () {
  const tmpPrevalAliasArgumentsAny = arguments;
  const tmpArrPatternSplat = [...tmpPrevalAliasArgumentsAny];
  $(tmpArrPatternSplat[0], tmpArrPatternSplat[1], $dotCall($array_slice, tmpArrPatternSplat, `slice`, 2));
};
testArgsParameterShadowingDestructuringArgs(`a`, `b`, `c`, `d`, `e`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  const b = c;
  debugger;
  const d = [ ...b ];
  const e = d[ 0 ];
  const f = d[ 1 ];
  const g = $dotCall( $array_slice, d, "slice", 2 );
  $( e, f, g );
  return undefined;
};
a( "a", "b", "c", "d", "e" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let testArgsParameterShadowingDestructuringArgs = function () {
  const tmpPrevalAliasArgumentsAny = arguments;
  debugger;
  const tmpBindingPatternArrRoot = tmpPrevalAliasArgumentsAny;
  const tmpArrPatternSplat = [...tmpBindingPatternArrRoot];
  const first = tmpArrPatternSplat[0];
  const second = tmpArrPatternSplat[1];
  const tmpMCF = tmpArrPatternSplat.slice;
  const rest = $dotCall(tmpMCF, tmpArrPatternSplat, `slice`, 2);
  $(first, second, rest);
  return undefined;
};
testArgsParameterShadowingDestructuringArgs(`a`, `b`, `c`, `d`, `e`);
`````


## Todos triggered


- (todo) Can we inline a function that uses arguments, anyways?
- (todo) Deal with array spreads in arr mutation?
- (todo) access object property that also exists on prototype? $array_slice
- (todo) type trackeed tricks can possibly support static $array_slice
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'a', 'b', ['c', 'd', 'e']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
