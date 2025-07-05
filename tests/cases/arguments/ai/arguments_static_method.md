# Preval test case

# arguments_static_method.md

> Arguments > Ai > Arguments static method
>
> Test arguments in static class method

## Input

`````js filename=intro
class TestStaticClass {
  static testStaticMethod() {
    const len = arguments.length;
    const first = arguments[0];
    $(len, first);
  }
}
TestStaticClass.testStaticMethod('static_method_arg');
`````


## Settled


`````js filename=intro
const TestStaticClass /*:class*/ /*truthy*/ = class {
  static testStaticMethod() {
    const tmpPrevalAliasArgumentsAny /*:arguments*/ /*truthy*/ = arguments;
    const tmpPrevalAliasArgumentsLen /*:number*/ = arguments.length;
    debugger;
    const first /*:unknown*/ = tmpPrevalAliasArgumentsAny[0];
    $(tmpPrevalAliasArgumentsLen, first);
    return undefined;
  }
};
const tmpMCF /*:unknown*/ = TestStaticClass.testStaticMethod;
$dotCall(tmpMCF, TestStaticClass, `testStaticMethod`, `static_method_arg`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const TestStaticClass = class {
  static testStaticMethod() {
    const tmpPrevalAliasArgumentsAny = arguments;
    $(arguments.length, tmpPrevalAliasArgumentsAny[0]);
  }
};
TestStaticClass.testStaticMethod(`static_method_arg`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = class   {
static testStaticMethod(  ) {
  const b = c;
  const d = c.length;
  debugger;
  const e = b[ 0 ];
  $( d, e );
  return undefined;
}
};
const f = a.testStaticMethod;
$dotCall( f, a, "testStaticMethod", "static_method_arg" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let TestStaticClass = class {
  static testStaticMethod() {
    const tmpPrevalAliasArgumentsAny = arguments;
    const tmpPrevalAliasArgumentsLen = arguments.length;
    debugger;
    const len = tmpPrevalAliasArgumentsLen;
    const first = tmpPrevalAliasArgumentsAny[0];
    $(len, first);
    return undefined;
  }
};
const tmpMCF = TestStaticClass.testStaticMethod;
$dotCall(tmpMCF, TestStaticClass, `testStaticMethod`, `static_method_arg`);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1, 'static_method_arg'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
