# Preval test case

# func_ident.md

> Normalize > Optional > Func ident
>
> Ident property access should not be changed

## Input

`````js filename=intro
function f() {
  return $(global?.foo);
}
$(f());
`````

## Settled


`````js filename=intro
const tmpIfTest /*:boolean*/ = global == null;
if (tmpIfTest) {
  const tmpClusterSSA_tmpReturnArg /*:unknown*/ = $(undefined);
  $(tmpClusterSSA_tmpReturnArg);
} else {
  const tmpChainElementObject /*:unknown*/ = global.foo;
  const tmpClusterSSA_tmpReturnArg$1 /*:unknown*/ = $(tmpChainElementObject);
  $(tmpClusterSSA_tmpReturnArg$1);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
if (global == null) {
  $($(undefined));
} else {
  $($(global.foo));
}
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  return $(global?.foo);
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  let tmpCalleeParam = undefined;
  const tmpChainRootProp = global;
  const tmpIfTest = tmpChainRootProp != null;
  if (tmpIfTest) {
    const tmpChainElementObject = tmpChainRootProp.foo;
    tmpCalleeParam = tmpChainElementObject;
  } else {
  }
  const tmpReturnArg = $(tmpCalleeParam);
  return tmpReturnArg;
};
const tmpCalleeParam$1 = f();
$(tmpCalleeParam$1);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = global == null;
if (a) {
  const b = $( undefined );
  $( b );
}
else {
  const c = global.foo;
  const d = $( c );
  $( d );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: undefined
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
