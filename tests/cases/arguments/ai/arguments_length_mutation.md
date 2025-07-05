# Preval test case

# arguments_length_mutation.md

> Arguments > Ai > Arguments length mutation
>
> Test arguments.length mutation attempts

## Options

Explicit mutations to `arguments.length` are not special cased and likely to break.

- skipEval

## Input

`````js filename=intro
function testArgsLengthMutation() {
  const originalLength = arguments.length;
  try {
    arguments.length = 5;
    $(arguments.length, originalLength);
  } catch (e) {
    $(e.name, arguments.length, originalLength);
  }
}
testArgsLengthMutation(1, 2, 3);
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
let testArgsLengthMutation = function () {
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
testArgsLengthMutation(1, 2, 3);
`````


## Todos triggered


- (todo) Can we inline a function that uses arguments, anyways?


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<skipped by option>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
