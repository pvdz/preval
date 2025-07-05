# Preval test case

# arguments_parameter_shadowing_length_mutation.md

> Arguments > Ai > Arguments parameter shadowing length mutation
>
> Test parameter shadowing with length mutation attempts

## Input

`````js filename=intro
function testArgsParameterShadowingLengthMutation() {
  const originalLength = arguments.length;
  try {
    arguments.length = 5;
    $(arguments.length, originalLength);
  } catch (e) {
    $(e.name, arguments.length, originalLength);
  }
}

testArgsParameterShadowingLengthMutation(1, 2, 3);
`````


## Settled


`````js filename=intro
try {
  throw `Preval: Cannot write to const binding \`tmpPrevalAliasArgumentsLen\``;
} catch (e) {
  const tmpCalleeParam /*:unknown*/ = e.name;
  $(tmpCalleeParam, 3, 3);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
try {
  throw `Preval: Cannot write to const binding \`tmpPrevalAliasArgumentsLen\``;
} catch (e) {
  $(e.name, 3, 3);
}
`````


## PST Settled
With rename=true

`````js filename=intro
try {
  throw "Preval: Cannot write to const binding `tmpPrevalAliasArgumentsLen`";
}
catch (a) {
  const b = a.name;
  $( b, 3, 3 );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let testArgsParameterShadowingLengthMutation = function () {
  const tmpPrevalAliasArgumentsLen = arguments.length;
  debugger;
  const originalLength = tmpPrevalAliasArgumentsLen;
  try {
    tmpPrevalAliasArgumentsLen = 5;
    $(tmpPrevalAliasArgumentsLen, originalLength);
  } catch (e) {
    let tmpCalleeParam = e.name;
    let tmpCalleeParam$1 = tmpPrevalAliasArgumentsLen;
    let tmpCalleeParam$3 = originalLength;
    $(tmpCalleeParam, tmpCalleeParam$1, originalLength);
  }
  return undefined;
};
testArgsParameterShadowingLengthMutation(1, 2, 3);
`````


## Todos triggered


- (todo) Can we inline a function that uses arguments, anyways?


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 5, 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: BAD!?
 - !1: 'TypeError', 3, 3
 -  eval returned: undefined

Post settled calls: BAD!!
 - !1: undefined, 3, 3
 -  eval returned: undefined

Denormalized calls: BAD!!
 - !1: undefined, 3, 3
 -  eval returned: undefined
