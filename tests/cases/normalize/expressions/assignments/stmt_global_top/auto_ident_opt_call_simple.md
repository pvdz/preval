# Preval test case

# auto_ident_opt_call_simple.md

> Normalize > Expressions > Assignments > Stmt global top > Auto ident opt call simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
a = $?.(1);
$(a);
`````

## Settled


`````js filename=intro
const tmpIfTest /*:boolean*/ = $ == null;
if (tmpIfTest) {
  $(undefined);
} else {
  const tmpChainElementCall /*:unknown*/ = $(1);
  $(tmpChainElementCall);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($ == null) {
  $(undefined);
} else {
  $($(1));
}
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
a = $?.(1);
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
  $(tmpChainElementCall);
} else {
  $(a);
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $ == null;
if (a) {
  $( undefined );
}
else {
  const b = $( 1 );
  $( b );
}
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
