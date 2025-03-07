# Preval test case

# func_nested2.md

> Normalize > Optional > Func nested2
>
> Ident property access should not be changed

## Input

`````js filename=intro
function f() {
  const obj = {a: 1};
  return $(obj?.a);
}
$(f());
`````

## Settled


`````js filename=intro
const tmpClusterSSA_tmpReturnArg /*:unknown*/ = $(1);
$(tmpClusterSSA_tmpReturnArg);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(1));
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  const obj = { a: 1 };
  return $(obj?.a);
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  const obj = { a: 1 };
  let tmpCalleeParam = undefined;
  const tmpChainRootProp = obj;
  const tmpIfTest = tmpChainRootProp != null;
  if (tmpIfTest) {
    const tmpChainElementObject = tmpChainRootProp.a;
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
const a = $( 1 );
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
