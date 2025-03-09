# Preval test case

# auto_ident_opt_call_simple.md

> Normalize > Expressions > Assignments > Param default > Auto ident opt call simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f(p = (a = $?.(1))) {}
$(f());
$(a);
`````

## Settled


`````js filename=intro
const tmpIfTest$1 /*:boolean*/ = $ == null;
if (tmpIfTest$1) {
  $(undefined);
  $(undefined);
} else {
  const tmpChainElementCall /*:unknown*/ = $(1);
  $(undefined);
  $(tmpChainElementCall);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($ == null) {
  $(undefined);
  $(undefined);
} else {
  const tmpChainElementCall = $(1);
  $(undefined);
  $(tmpChainElementCall);
}
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let p = tmpParamBare === undefined ? (a = $?.(1)) : tmpParamBare;
};
let a = { a: 999, b: 1000 };
$(f());
$(a);
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let p = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  if (tmpIfTest) {
    let tmpNestedComplexRhs = undefined;
    const tmpChainRootCall = $;
    const tmpIfTest$1 = tmpChainRootCall != null;
    if (tmpIfTest$1) {
      const tmpChainElementCall = tmpChainRootCall(1);
      tmpNestedComplexRhs = tmpChainElementCall;
    } else {
    }
    a = tmpNestedComplexRhs;
    p = tmpNestedComplexRhs;
    return undefined;
  } else {
    p = tmpParamBare;
    return undefined;
  }
};
let a = { a: 999, b: 1000 };
const tmpCalleeParam = f();
$(tmpCalleeParam);
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $ == null;
if (a) {
  $( undefined );
  $( undefined );
}
else {
  const b = $( 1 );
  $( undefined );
  $( b );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: undefined
 - 3: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
