# Preval test case

# param_default2.md

> Normalize > Arguments > Param default2
>
> The `arguments` object is a valid default expression

## Input

`````js filename=intro
const f = function(a = arguments) {
  return a;
};
$(f());
`````


## Settled


`````js filename=intro
const f /*:(unused)=>arguments*/ = function ($$0 /*uses arguments*/) {
  const tmpPrevalAliasArgumentsAny /*:arguments*/ /*truthy*/ = arguments;
  debugger;
  return tmpPrevalAliasArgumentsAny;
};
const tmpCalleeParam /*:arguments*/ /*truthy*/ = f();
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function ($$0) {
  const tmpPrevalAliasArgumentsAny = arguments;
  return tmpPrevalAliasArgumentsAny;
};
$(f());
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function($$0 ) {
  const b = c;
  debugger;
  return b;
};
const d = a();
$( d );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const f = function ($$0) {
  const tmpPrevalAliasArgumentsAny = arguments;
  const tmpParamBare = $$0;
  debugger;
  let a = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  if (tmpIfTest) {
    a = tmpPrevalAliasArgumentsAny;
    return a;
  } else {
    a = tmpParamBare;
    return a;
  }
};
let tmpCalleeParam = f();
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
