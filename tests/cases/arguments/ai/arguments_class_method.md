# Preval test case

# arguments_class_method.md

> Arguments > Ai > Arguments class method
>
> Test arguments in class method

## Input

`````js filename=intro
class TestClass {
  testMethod() {
    const len = arguments.length;
    const first = arguments[0];
    $(len, first);
  }
}
const instance = new TestClass();
instance.testMethod('class_method_arg');
`````


## Settled


`````js filename=intro
const TestClass /*:class*/ /*truthy*/ = class {
  testMethod() {
    const tmpPrevalAliasArgumentsAny /*:arguments*/ /*truthy*/ = arguments;
    const tmpPrevalAliasArgumentsLen /*:number*/ = arguments.length;
    debugger;
    const first /*:unknown*/ = tmpPrevalAliasArgumentsAny[0];
    $(tmpPrevalAliasArgumentsLen, first);
    return undefined;
  }
};
const instance /*:object*/ /*truthy*/ = new TestClass();
const tmpMCF /*:unknown*/ = instance.testMethod;
$dotCall(tmpMCF, instance, `testMethod`, `class_method_arg`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const TestClass = class {
  testMethod() {
    const tmpPrevalAliasArgumentsAny = arguments;
    $(arguments.length, tmpPrevalAliasArgumentsAny[0]);
  }
};
const instance = new TestClass();
instance.testMethod(`class_method_arg`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = class   {
testMethod(  ) {
  const b = c;
  const d = c.length;
  debugger;
  const e = b[ 0 ];
  $( d, e );
  return undefined;
}
};
const f = new a();
const g = f.testMethod;
$dotCall( g, f, "testMethod", "class_method_arg" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let TestClass = class {
  testMethod() {
    const tmpPrevalAliasArgumentsAny = arguments;
    const tmpPrevalAliasArgumentsLen = arguments.length;
    debugger;
    const len = tmpPrevalAliasArgumentsLen;
    const first = tmpPrevalAliasArgumentsAny[0];
    $(len, first);
    return undefined;
  }
};
const instance = new TestClass();
const tmpMCF = instance.testMethod;
$dotCall(tmpMCF, instance, `testMethod`, `class_method_arg`);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1, 'class_method_arg'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
