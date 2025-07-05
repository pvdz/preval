# Preval test case

# arguments_freeze_seal.md

> Arguments > Ai > Arguments freeze seal
>
> Test Object.freeze and Object.seal on arguments

## Input

`````js filename=intro
function testArgsFreezeSeal() {
  const originalLength = arguments.length;
  try {
    Object.freeze(arguments);
    $(arguments.length, originalLength);
  } catch (e) {
    $(e.name, originalLength);
  }
  
  try {
    Object.seal(arguments);
    $(arguments.length, originalLength);
  } catch (e) {
    $(e.name, originalLength);
  }
}
testArgsFreezeSeal(1, 2, 3);
`````


## Settled


`````js filename=intro
const testArgsFreezeSeal /*:()=>undefined*/ = function (/*uses arguments*/) {
  const tmpPrevalAliasArgumentsAny /*:arguments*/ /*truthy*/ = arguments;
  debugger;
  try {
    $Object_freeze(tmpPrevalAliasArgumentsAny);
    $(3, 3);
  } catch (e) {
    const tmpCalleeParam /*:unknown*/ = e.name;
    $(tmpCalleeParam, 3);
  }
  try {
    $Object_seal(tmpPrevalAliasArgumentsAny);
    $(3, 3);
  } catch (e$1) {
    const tmpCalleeParam$3 /*:unknown*/ = e$1.name;
    $(tmpCalleeParam$3, 3);
  }
  return undefined;
};
testArgsFreezeSeal(1, 2, 3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const testArgsFreezeSeal = function () {
  const tmpPrevalAliasArgumentsAny = arguments;
  try {
    $Object_freeze(tmpPrevalAliasArgumentsAny);
    $(3, 3);
  } catch (e) {
    $(e.name, 3);
  }
  try {
    $Object_seal(tmpPrevalAliasArgumentsAny);
    $(3, 3);
  } catch (e$1) {
    $(e$1.name, 3);
  }
};
testArgsFreezeSeal(1, 2, 3);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  const b = c;
  debugger;
  try {
    $Object_freeze( b );
    $( 3, 3 );
  }
  catch (d) {
    const e = d.name;
    $( e, 3 );
  }
  try {
    $Object_seal( b );
    $( 3, 3 );
  }
  catch (f) {
    const g = f.name;
    $( g, 3 );
  }
  return undefined;
};
a( 1, 2, 3 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let testArgsFreezeSeal = function () {
  const tmpPrevalAliasArgumentsAny = arguments;
  const tmpPrevalAliasArgumentsLen = arguments.length;
  debugger;
  const originalLength = tmpPrevalAliasArgumentsLen;
  try {
    const tmpMCF = $Object_freeze;
    $Object_freeze(tmpPrevalAliasArgumentsAny);
    $(tmpPrevalAliasArgumentsLen, originalLength);
  } catch (e) {
    let tmpCalleeParam = e.name;
    let tmpCalleeParam$1 = originalLength;
    $(tmpCalleeParam, originalLength);
  }
  try {
    const tmpMCF$1 = $Object_seal;
    $Object_seal(tmpPrevalAliasArgumentsAny);
    $(tmpPrevalAliasArgumentsLen, originalLength);
  } catch (e$1) {
    let tmpCalleeParam$3 = e$1.name;
    let tmpCalleeParam$5 = originalLength;
    $(tmpCalleeParam$3, originalLength);
  }
  return undefined;
};
testArgsFreezeSeal(1, 2, 3);
`````


## Todos triggered


- (todo) Can we inline a function that uses arguments, anyways?
- (todo) can try-escaping support this expr node type? CallExpression
- (todo) try escaping may support calling $Object_freeze
- (todo) try escaping may support calling $Object_seal
- (todo) type trackeed tricks can possibly support static $Object_freeze
- (todo) type trackeed tricks can possibly support static $Object_seal


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 3, 3
 - 2: 3, 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
