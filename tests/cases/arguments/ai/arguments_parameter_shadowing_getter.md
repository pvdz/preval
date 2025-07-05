# Preval test case

# arguments_parameter_shadowing_getter.md

> Arguments > Ai > Arguments parameter shadowing getter
>
> Test parameter shadowing in object getters

## Input

`````js filename=intro
const testArgsParameterShadowingGetter = {
  get testGetter() {
    const len = arguments.length;
    const first = arguments[0];
    $(len, first);
    return 'getter_result';
  }
};

const getterResult = testArgsParameterShadowingGetter.testGetter;
`````


## Settled


`````js filename=intro
const testArgsParameterShadowingGetter /*:object*/ /*truthy*/ = {
  get testGetter() {
    const tmpPrevalAliasArgumentsAny /*:arguments*/ /*truthy*/ = arguments;
    const tmpPrevalAliasArgumentsLen /*:number*/ = arguments.length;
    debugger;
    const first /*:unknown*/ = tmpPrevalAliasArgumentsAny[0];
    $(tmpPrevalAliasArgumentsLen, first);
    return `getter_result`;
  },
};
testArgsParameterShadowingGetter.testGetter;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
({
  get testGetter() {
    const tmpPrevalAliasArgumentsAny = arguments;
    $(arguments.length, tmpPrevalAliasArgumentsAny[0]);
    return `getter_result`;
  },
}.testGetter);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { get testGetter() {
  const b = c;
  const d = c.length;
  debugger;
  const e = b[ 0 ];
  $( d, e );
  return "getter_result";
} };
a.testGetter;
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const testArgsParameterShadowingGetter = {
  get testGetter() {
    const tmpPrevalAliasArgumentsAny = arguments;
    const tmpPrevalAliasArgumentsLen = arguments.length;
    debugger;
    const len = tmpPrevalAliasArgumentsLen;
    const first = tmpPrevalAliasArgumentsAny[0];
    $(len, first);
    return `getter_result`;
  },
};
const getterResult = testArgsParameterShadowingGetter.testGetter;
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0, undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
