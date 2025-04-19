# Preval test case

# ident_opt_call_complex_complex2.md

> Normalize > Expressions > Assignments > Param default > Ident opt call complex complex2
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
const f = function (tmpParamDefault) {
  const tmpIfTest = tmpParamDefault === undefined;
  const tmpBranchingA = function () {
    const tmpChainElementCall$2 = $($);
    const tmpIfTest$3 = tmpChainElementCall$2 != null;
    const tmpBranchingC$1 = function (tmpNestedComplexRhs$4) {
      a = tmpNestedComplexRhs$4;
    };
    if (tmpIfTest$3) {
      const tmpCallVal$2 = tmpChainElementCall$2.call;
      const tmpCalleeParam$5 = $(1);
      const tmpChainElementCall$5 = tmpCallVal$2.call(tmpChainElementCall$2, $, tmpCalleeParam$5);
      const tmpReturnArg = (a = tmpChainElementCall$5);
      return tmpReturnArg;
    } else {
      const tmpReturnArg$4 = (a = undefined);
      return tmpReturnArg$4;
    }
  };
  if (tmpIfTest) {
    const tmpReturnArg$6 = tmpBranchingA();
    return tmpReturnArg$6;
  } else {
    return undefined;
  }
};
let a = { a: 999, b: 1000 };
const tmpCalleeParam$6 = f();
$(tmpCalleeParam$6);
$(a);
`````


## Settled


`````js filename=intro
const tmpChainElementCall$2 /*:unknown*/ = $($);
const tmpIfTest$3 /*:boolean*/ = tmpChainElementCall$2 == null;
if (tmpIfTest$3) {
  $(undefined);
  $(undefined);
} else {
  const tmpCallVal$2 /*:unknown*/ = tmpChainElementCall$2.call;
  const tmpCalleeParam$5 /*:unknown*/ = $(1);
  const tmpCallCompVal /*:unknown*/ = tmpCallVal$2.call;
  const tmpChainElementCall$5 /*:unknown*/ = $dotCall(tmpCallCompVal, tmpCallVal$2, `call`, tmpChainElementCall$2, $, tmpCalleeParam$5);
  $(tmpChainElementCall$5);
  $(tmpChainElementCall$5);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpChainElementCall$2 = $($);
if (tmpChainElementCall$2 == null) {
  $(undefined);
  $(undefined);
} else {
  const tmpCallVal$2 = tmpChainElementCall$2.call;
  const tmpChainElementCall$5 = tmpCallVal$2.call(tmpChainElementCall$2, $, $(1));
  $(tmpChainElementCall$5);
  $(tmpChainElementCall$5);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( $ );
const b = a == null;
if (b) {
  $( undefined );
  $( undefined );
}
else {
  const c = a.call;
  const d = $( 1 );
  const e = c.call;
  const f = $dotCall( e, c, "call", a, $, d );
  $( f );
  $( f );
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
