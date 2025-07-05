# Preval test case

# arguments_parameter_shadowing_prevent_extensions.md

> Arguments > Ai > Arguments parameter shadowing prevent extensions
>
> Test parameter shadowing with Object.preventExtensions

## Input

`````js filename=intro
function testArgsParameterShadowingPreventExtensions() {
  const originalLength = arguments.length;
  try {
    Object.preventExtensions(arguments);
    $(arguments.length, originalLength);
  } catch (e) {
    $(e.name, originalLength);
  }
}

testArgsParameterShadowingPreventExtensions(1, 2, 3);
`````


## Settled


`````js filename=intro
const testArgsParameterShadowingPreventExtensions /*:()=>undefined*/ = function (/*uses arguments*/) {
  const tmpPrevalAliasArgumentsAny /*:arguments*/ /*truthy*/ = arguments;
  debugger;
  try {
    $Object_preventExtensions(tmpPrevalAliasArgumentsAny);
    $(3, 3);
  } catch (e) {
    const tmpCalleeParam /*:unknown*/ = e.name;
    $(tmpCalleeParam, 3);
  }
  return undefined;
};
testArgsParameterShadowingPreventExtensions(1, 2, 3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const testArgsParameterShadowingPreventExtensions = function () {
  const tmpPrevalAliasArgumentsAny = arguments;
  try {
    $Object_preventExtensions(tmpPrevalAliasArgumentsAny);
    $(3, 3);
  } catch (e) {
    $(e.name, 3);
  }
};
testArgsParameterShadowingPreventExtensions(1, 2, 3);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  const b = c;
  debugger;
  try {
    $Object_preventExtensions( b );
    $( 3, 3 );
  }
  catch (d) {
    const e = d.name;
    $( e, 3 );
  }
  return undefined;
};
a( 1, 2, 3 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let testArgsParameterShadowingPreventExtensions = function () {
  const tmpPrevalAliasArgumentsAny = arguments;
  const tmpPrevalAliasArgumentsLen = arguments.length;
  debugger;
  const originalLength = tmpPrevalAliasArgumentsLen;
  try {
    const tmpMCF = $Object_preventExtensions;
    $Object_preventExtensions(tmpPrevalAliasArgumentsAny);
    $(tmpPrevalAliasArgumentsLen, originalLength);
  } catch (e) {
    let tmpCalleeParam = e.name;
    let tmpCalleeParam$1 = originalLength;
    $(tmpCalleeParam, originalLength);
  }
  return undefined;
};
testArgsParameterShadowingPreventExtensions(1, 2, 3);
`````


## Todos triggered


- (todo) Can we inline a function that uses arguments, anyways?
- (todo) can try-escaping support this expr node type? CallExpression
- (todo) inline arguments when function does not have that many params yet
- (todo) try escaping may support calling $Object_preventExtensions
- (todo) type trackeed tricks can possibly support static $Object_preventExtensions


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 3, 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
