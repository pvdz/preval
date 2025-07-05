# Preval test case

# arguments_getter_setter.md

> Arguments > Ai > Arguments getter setter
>
> Test arguments in object getter/setter

## Input

`````js filename=intro
const testObj = {
  get testGetter() {
    const len = arguments.length;
    const first = arguments[0];
    $(len, first);
    return 'getter_result';
  },
  set testSetter(value) {
    const len = arguments.length;
    const first = arguments[0];
    $(len, first);
  }
};
const getterResult = testObj.testGetter;
testObj.testSetter = 'setter_value';
`````


## Settled


`````js filename=intro
const testObj /*:object*/ /*truthy*/ = {
  get testGetter() {
    const tmpPrevalAliasArgumentsAny /*:arguments*/ /*truthy*/ = arguments;
    const tmpPrevalAliasArgumentsLen /*:number*/ = arguments.length;
    debugger;
    const first /*:unknown*/ = tmpPrevalAliasArgumentsAny[0];
    $(tmpPrevalAliasArgumentsLen, first);
    return `getter_result`;
  },
  set testSetter($$0) {
    const tmpPrevalAliasArgumentsAny$1 /*:arguments*/ /*truthy*/ = arguments;
    const tmpPrevalAliasArgumentsLen$1 /*:number*/ = arguments.length;
    debugger;
    const first$1 /*:unknown*/ = tmpPrevalAliasArgumentsAny$1[0];
    $(tmpPrevalAliasArgumentsLen$1, first$1);
    return undefined;
  },
};
testObj.testGetter;
testObj.testSetter = `setter_value`;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const testObj = {
  get testGetter() {
    const tmpPrevalAliasArgumentsAny = arguments;
    $(arguments.length, tmpPrevalAliasArgumentsAny[0]);
    return `getter_result`;
  },
  set testSetter($$0) {
    const tmpPrevalAliasArgumentsAny$1 = arguments;
    $(arguments.length, tmpPrevalAliasArgumentsAny$1[0]);
  },
};
testObj.testGetter;
testObj.testSetter = `setter_value`;
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {
  get testGetter() {
    const b = c;
    const d = c.length;
    debugger;
    const e = b[ 0 ];
    $( d, e );
    return "getter_result";
  },
  set testSetter( $$0 ) {
    const f = c;
    const g = c.length;
    debugger;
    const h = f[ 0 ];
    $( g, h );
    return undefined;
  },
};
a.testGetter;
a.testSetter = "setter_value";
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const testObj = {
  get testGetter() {
    const tmpPrevalAliasArgumentsAny = arguments;
    const tmpPrevalAliasArgumentsLen = arguments.length;
    debugger;
    const len = tmpPrevalAliasArgumentsLen;
    const first = tmpPrevalAliasArgumentsAny[0];
    $(len, first);
    return `getter_result`;
  },
  set testSetter($$0) {
    const tmpPrevalAliasArgumentsAny$1 = arguments;
    const tmpPrevalAliasArgumentsLen$1 = arguments.length;
    let value = $$0;
    debugger;
    const len$1 = tmpPrevalAliasArgumentsLen$1;
    const first$1 = tmpPrevalAliasArgumentsAny$1[0];
    $(len$1, first$1);
    return undefined;
  },
};
const getterResult = testObj.testGetter;
testObj.testSetter = `setter_value`;
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0, undefined
 - 2: 1, 'setter_value'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
