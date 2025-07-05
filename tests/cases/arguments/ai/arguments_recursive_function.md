# Preval test case

# arguments_recursive_function.md

> Arguments > Ai > Arguments recursive function
>
> Test arguments in recursive function calls

## Input

`````js filename=intro
function testArgsRecursive(count = 0) {
  if (count >= 3) {
    $(arguments.length);
    return;
  }
  const currentArgs = arguments.length;
  testArgsRecursive(count + 1, 'recursive', currentArgs);
}
testArgsRecursive();
`````


## Settled


`````js filename=intro
const testArgsRecursive /*:(primitive)=>undefined*/ = function ($$0 /*uses arguments*/) {
  const tmpPrevalAliasArgumentsLen$1 /*:number*/ = arguments.length;
  const tmpParamBare /*:primitive*/ = $$0;
  debugger;
  let count$1 /*:primitive*/ /*ternaryConst*/ = 0;
  let tmpIfTest$1 /*:boolean*/ /*ternaryConst*/ = false;
  const tmpIfTest /*:boolean*/ = tmpParamBare === undefined;
  if (tmpIfTest) {
  } else {
    count$1 = tmpParamBare;
    tmpIfTest$1 = tmpParamBare >= 3;
  }
  if (tmpIfTest$1) {
    $(tmpPrevalAliasArgumentsLen$1);
    return undefined;
  } else {
    const tmpCalleeParam /*:primitive*/ = count$1 + 1;
    testArgsRecursive(tmpCalleeParam, `recursive`, tmpPrevalAliasArgumentsLen$1);
    return undefined;
  }
};
testArgsRecursive();
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const testArgsRecursive = function (tmpParamBare) {
  const tmpPrevalAliasArgumentsLen$1 = arguments.length;
  let count$1 = 0;
  let tmpIfTest$1 = false;
  if (!(tmpParamBare === undefined)) {
    count$1 = tmpParamBare;
    tmpIfTest$1 = tmpParamBare >= 3;
  }
  if (tmpIfTest$1) {
    $(tmpPrevalAliasArgumentsLen$1);
  } else {
    testArgsRecursive(count$1 + 1, `recursive`, tmpPrevalAliasArgumentsLen$1);
  }
};
testArgsRecursive();
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function($$0 ) {
  const b = c.length;
  const d = $$0;
  debugger;
  let e = 0;
  let f = false;
  const g = d === undefined;
  if (g) {

  }
  else {
    e = d;
    f = d >= 3;
  }
  if (f) {
    $( b );
    return undefined;
  }
  else {
    const h = e + 1;
    a( h, "recursive", b );
    return undefined;
  }
};
a();
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let testArgsRecursive = function ($$0) {
  const tmpPrevalAliasArgumentsLen = arguments.length;
  const tmpParamBare = $$0;
  debugger;
  let count = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  if (tmpIfTest) {
    count = 0;
  } else {
    count = tmpParamBare;
  }
  const tmpIfTest$1 = count >= 3;
  if (tmpIfTest$1) {
    $(tmpPrevalAliasArgumentsLen);
    return undefined;
  } else {
    const currentArgs = tmpPrevalAliasArgumentsLen;
    const tmpCallCallee = testArgsRecursive;
    let tmpCalleeParam = count + 1;
    let tmpCalleeParam$1 = currentArgs;
    testArgsRecursive(tmpCalleeParam, `recursive`, currentArgs);
    return undefined;
  }
};
testArgsRecursive();
`````


## Todos triggered


- (todo) Can we inline a function that uses arguments, anyways?


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
