# Preval test case

# arguments_parameter_shadowing_proxy.md

> Arguments > Ai > Arguments parameter shadowing proxy
>
> Test parameter shadowing in Proxy handlers

## Input

`````js filename=intro
const target = {};
const handler = {
  get(target, prop, receiver) {
    const len = arguments.length;
    const first = arguments[0];
    const second = arguments[1];
    $(len, first, second);
    return 'proxy_get_result';
  },
  set(target, prop, value, receiver) {
    const len = arguments.length;
    const first = arguments[0];
    const second = arguments[1];
    $(len, first, second);
    return true;
  }
};

const proxy = new Proxy(target, handler);
const getResult = proxy.testProp;
proxy.testProp = 'test_value';
`````


## Settled


`````js filename=intro
const target /*:object*/ /*truthy*/ = {};
const handler /*:object*/ /*truthy*/ = {
  get($$0, $$1, $$2) {
    const tmpPrevalAliasArgumentsAny /*:arguments*/ /*truthy*/ = arguments;
    const tmpPrevalAliasArgumentsLen /*:number*/ = arguments.length;
    debugger;
    const first /*:unknown*/ = tmpPrevalAliasArgumentsAny[0];
    const second /*:unknown*/ = tmpPrevalAliasArgumentsAny[1];
    $(tmpPrevalAliasArgumentsLen, first, second);
    return `proxy_get_result`;
  },
  set($$0, $$1, $$2, $$3) {
    const tmpPrevalAliasArgumentsAny$1 /*:arguments*/ /*truthy*/ = arguments;
    const tmpPrevalAliasArgumentsLen$1 /*:number*/ = arguments.length;
    debugger;
    const first$1 /*:unknown*/ = tmpPrevalAliasArgumentsAny$1[0];
    const second$1 /*:unknown*/ = tmpPrevalAliasArgumentsAny$1[1];
    $(tmpPrevalAliasArgumentsLen$1, first$1, second$1);
    return true;
  },
};
const proxy /*:object*/ /*truthy*/ = new Proxy(target, handler);
proxy.testProp;
proxy.testProp = `test_value`;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const target = {};
const handler = {
  get($$0, $$1, $$2) {
    const tmpPrevalAliasArgumentsAny = arguments;
    $(arguments.length, tmpPrevalAliasArgumentsAny[0], tmpPrevalAliasArgumentsAny[1]);
    return `proxy_get_result`;
  },
  set($$0, $$1, $$2, $$3) {
    const tmpPrevalAliasArgumentsAny$1 = arguments;
    $(arguments.length, tmpPrevalAliasArgumentsAny$1[0], tmpPrevalAliasArgumentsAny$1[1]);
    return true;
  },
};
const proxy = new Proxy(target, handler);
proxy.testProp;
proxy.testProp = `test_value`;
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {};
const b = {
  get( $$0,$$1,$$2 ) {
    const c = d;
    const e = d.length;
    debugger;
    const f = c[ 0 ];
    const g = c[ 1 ];
    $( e, f, g );
    return "proxy_get_result";
  },
  set( $$0,$$1,$$2,$$3 ) {
    const h = d;
    const i = d.length;
    debugger;
    const j = h[ 0 ];
    const k = h[ 1 ];
    $( i, j, k );
    return true;
  },
};
const l = new Proxy( a, b );
l.testProp;
l.testProp = "test_value";
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const target = {};
const handler = {
  get($$0, $$1, $$2) {
    const tmpPrevalAliasArgumentsAny = arguments;
    const tmpPrevalAliasArgumentsLen = arguments.length;
    let target$1 = $$0;
    let prop = $$1;
    let receiver = $$2;
    debugger;
    const len = tmpPrevalAliasArgumentsLen;
    const first = tmpPrevalAliasArgumentsAny[0];
    const second = tmpPrevalAliasArgumentsAny[1];
    $(len, first, second);
    return `proxy_get_result`;
  },
  set($$0, $$1, $$2, $$3) {
    const tmpPrevalAliasArgumentsAny$1 = arguments;
    const tmpPrevalAliasArgumentsLen$1 = arguments.length;
    let target$3 = $$0;
    let prop$1 = $$1;
    let value = $$2;
    let receiver$1 = $$3;
    debugger;
    const len$1 = tmpPrevalAliasArgumentsLen$1;
    const first$1 = tmpPrevalAliasArgumentsAny$1[0];
    const second$1 = tmpPrevalAliasArgumentsAny$1[1];
    $(len$1, first$1, second$1);
    return true;
  },
};
const proxy = new Proxy(target, handler);
const getResult = proxy.testProp;
proxy.testProp = `test_value`;
`````


## Todos triggered


None


## Globals


BAD@! Found 1 implicit global bindings:

Proxy


## Runtime Outcome


Should call `$` with:
 - 1: 3, {}, 'testProp'
 - 2: 4, {}, 'testProp'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
