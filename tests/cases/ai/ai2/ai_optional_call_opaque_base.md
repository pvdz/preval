# Preval test case

# ai_optional_call_opaque_base.md

> Ai > Ai2 > Ai optional call opaque base
>
> Test: Optional chaining with a function call obj?.method() where obj is opaque.

## Input

`````js filename=intro
// Expected: $('obj')?.$('method_name')(); (or equivalent normalized form)
let obj = $('opaque_object_source');
let result1 = obj?.someMethod?.();      // Method might not exist, or obj might be null/undefined
let result2 = obj?.anotherMethod();   // Property access, then call; anotherMethod itself might be non-function or obj might be null/undefined

let funcProvider = $('opaque_func_provider');
let result3 = funcProvider?.(); // Direct optional call on potentially undefined/null function

$('results', result1, result2, result3);
`````


## Settled


`````js filename=intro
const obj /*:unknown*/ = $(`opaque_object_source`);
let result1 /*:unknown*/ /*ternaryConst*/ = undefined;
const tmpIfTest /*:boolean*/ = obj == null;
if (tmpIfTest) {
} else {
  const tmpChainElementObject /*:unknown*/ = obj.someMethod;
  const tmpIfTest$1 /*:boolean*/ = tmpChainElementObject == null;
  if (tmpIfTest$1) {
  } else {
    result1 = $dotCall(tmpChainElementObject, obj, `someMethod`);
  }
}
let result2 /*:unknown*/ /*ternaryConst*/ = undefined;
const tmpIfTest$3 /*:boolean*/ = obj == null;
if (tmpIfTest$3) {
} else {
  const tmpChainElementObject$1 /*:unknown*/ = obj.anotherMethod;
  result2 = $dotCall(tmpChainElementObject$1, obj, `anotherMethod`);
}
const funcProvider /*:unknown*/ = $(`opaque_func_provider`);
const tmpIfTest$5 /*:boolean*/ = funcProvider == null;
if (tmpIfTest$5) {
  $(`results`, result1, result2, undefined);
} else {
  const tmpChainElementCall$3 /*:unknown*/ = funcProvider();
  $(`results`, result1, result2, tmpChainElementCall$3);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const obj = $(`opaque_object_source`);
let result1 = undefined;
if (!(obj == null)) {
  const tmpChainElementObject = obj.someMethod;
  if (!(tmpChainElementObject == null)) {
    result1 = $dotCall(tmpChainElementObject, obj, `someMethod`);
  }
}
let result2 = undefined;
if (!(obj == null)) {
  result2 = obj.anotherMethod();
}
const funcProvider = $(`opaque_func_provider`);
if (funcProvider == null) {
  $(`results`, result1, result2, undefined);
} else {
  $(`results`, result1, result2, funcProvider());
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "opaque_object_source" );
let b = undefined;
const c = a == null;
if (c) {

}
else {
  const d = a.someMethod;
  const e = d == null;
  if (e) {

  }
  else {
    b = $dotCall( d, a, "someMethod" );
  }
}
let f = undefined;
const g = a == null;
if (g) {

}
else {
  const h = a.anotherMethod;
  f = $dotCall( h, a, "anotherMethod" );
}
const i = $( "opaque_func_provider" );
const j = i == null;
if (j) {
  $( "results", b, f, undefined );
}
else {
  const k = i();
  $( "results", b, f, k );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let obj = $(`opaque_object_source`);
let result1 = undefined;
const tmpChainRootProp = obj;
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainRootProp.someMethod;
  const tmpIfTest$1 = tmpChainElementObject != null;
  if (tmpIfTest$1) {
    const tmpChainElementCall = $dotCall(tmpChainElementObject, tmpChainRootProp, `someMethod`);
    result1 = tmpChainElementCall;
  } else {
  }
} else {
}
let result2 = undefined;
const tmpChainRootProp$1 = obj;
const tmpIfTest$3 = tmpChainRootProp$1 != null;
if (tmpIfTest$3) {
  const tmpChainElementObject$1 = tmpChainRootProp$1.anotherMethod;
  const tmpChainElementCall$1 = $dotCall(tmpChainElementObject$1, tmpChainRootProp$1, `anotherMethod`);
  result2 = tmpChainElementCall$1;
} else {
}
let funcProvider = $(`opaque_func_provider`);
let result3 = undefined;
const tmpChainRootCall = funcProvider;
const tmpIfTest$5 = tmpChainRootCall != null;
if (tmpIfTest$5) {
  const tmpChainElementCall$3 = tmpChainRootCall();
  result3 = tmpChainElementCall$3;
  $(`results`, result1, result2, tmpChainElementCall$3);
} else {
  $(`results`, result1, result2, result3);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'opaque_object_source'
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
