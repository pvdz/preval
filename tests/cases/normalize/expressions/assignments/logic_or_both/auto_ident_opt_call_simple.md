# Preval test case

# auto_ident_opt_call_simple.md

> Normalize > Expressions > Assignments > Logic or both > Auto ident opt call simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = $?.(1)) || (a = $?.(1)));
$(a);
`````

## Settled


`````js filename=intro
let a /*:unknown*/ = undefined;
let tmpCalleeParam /*:unknown*/ = undefined;
const tmpIfTest /*:boolean*/ = $ == null;
if (tmpIfTest) {
} else {
  const tmpChainElementCall /*:unknown*/ = $(1);
  a = tmpChainElementCall;
  tmpCalleeParam = tmpChainElementCall;
}
if (a) {
  $(tmpCalleeParam);
  $(a);
} else {
  const tmpIfTest$1 /*:boolean*/ = $ == null;
  if (tmpIfTest$1) {
    $(undefined);
    $(undefined);
  } else {
    const tmpChainElementCall$1 /*:unknown*/ = $(1);
    $(tmpChainElementCall$1);
    $(tmpChainElementCall$1);
  }
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = undefined;
let tmpCalleeParam = undefined;
if (!($ == null)) {
  const tmpChainElementCall = $(1);
  a = tmpChainElementCall;
  tmpCalleeParam = tmpChainElementCall;
}
if (a) {
  $(tmpCalleeParam);
  $(a);
} else {
  if ($ == null) {
    $(undefined);
    $(undefined);
  } else {
    const tmpChainElementCall$1 = $(1);
    $(tmpChainElementCall$1);
    $(tmpChainElementCall$1);
  }
}
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = $?.(1)) || (a = $?.(1)));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
a = undefined;
const tmpChainRootCall = $;
const tmpIfTest = tmpChainRootCall != null;
if (tmpIfTest) {
  const tmpChainElementCall = tmpChainRootCall(1);
  a = tmpChainElementCall;
} else {
}
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  $(tmpCalleeParam);
  $(a);
} else {
  let tmpNestedComplexRhs = undefined;
  const tmpChainRootCall$1 = $;
  const tmpIfTest$1 = tmpChainRootCall$1 != null;
  if (tmpIfTest$1) {
    const tmpChainElementCall$1 = tmpChainRootCall$1(1);
    tmpNestedComplexRhs = tmpChainElementCall$1;
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
let a = undefined;
let b = undefined;
const c = $ == null;
if (c) {

}
else {
  const d = $( 1 );
  a = d;
  b = d;
}
if (a) {
  $( b );
  $( a );
}
else {
  const e = $ == null;
  if (e) {
    $( undefined );
    $( undefined );
  }
  else {
    const f = $( 1 );
    $( f );
    $( f );
  }
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
