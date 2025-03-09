# Preval test case

# auto_ident_opt_call_simple.md

> Normalize > Expressions > Assignments > Logic or right > Auto ident opt call simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$($(100) || (a = $?.(1)));
$(a);
`````

## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(100);
if (tmpCalleeParam) {
  $(tmpCalleeParam);
  const a /*:object*/ = { a: 999, b: 1000 };
  $(a);
} else {
  const tmpIfTest /*:boolean*/ = $ == null;
  if (tmpIfTest) {
    $(undefined);
    $(undefined);
  } else {
    const tmpChainElementCall /*:unknown*/ = $(1);
    $(tmpChainElementCall);
    $(tmpChainElementCall);
  }
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCalleeParam = $(100);
if (tmpCalleeParam) {
  $(tmpCalleeParam);
  $({ a: 999, b: 1000 });
} else {
  if ($ == null) {
    $(undefined);
    $(undefined);
  } else {
    const tmpChainElementCall = $(1);
    $(tmpChainElementCall);
    $(tmpChainElementCall);
  }
}
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$($(100) || (a = $?.(1)));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpCalleeParam = $(100);
if (tmpCalleeParam) {
  $(tmpCalleeParam);
  $(a);
} else {
  let tmpNestedComplexRhs = undefined;
  const tmpChainRootCall = $;
  const tmpIfTest = tmpChainRootCall != null;
  if (tmpIfTest) {
    const tmpChainElementCall = tmpChainRootCall(1);
    tmpNestedComplexRhs = tmpChainElementCall;
  } else {
  }
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
  $(a);
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
if (a) {
  $( a );
  const b = {
    a: 999,
    b: 1000,
  };
  $( b );
}
else {
  const c = $ == null;
  if (c) {
    $( undefined );
    $( undefined );
  }
  else {
    const d = $( 1 );
    $( d );
    $( d );
  }
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 100
 - 2: 100
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
