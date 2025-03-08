# Preval test case

# auto_ident_opt_call_simple.md

> Normalize > Expressions > Assignments > Let > Auto ident opt call simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let xyz = (a = $?.(1));
$(xyz);
$(a);
`````

## Settled


`````js filename=intro
let a /*:unknown*/ = undefined;
const tmpIfTest /*:boolean*/ = $ == null;
if (tmpIfTest) {
  $(undefined);
} else {
  const tmpChainElementCall /*:unknown*/ = $(1);
  a = tmpChainElementCall;
  $(tmpChainElementCall);
}
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = undefined;
if ($ == null) {
  $(undefined);
} else {
  const tmpChainElementCall = $(1);
  a = tmpChainElementCall;
  $(tmpChainElementCall);
}
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
let xyz = (a = $?.(1));
$(xyz);
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
let xyz = a;
$(a);
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
const b = $ == null;
if (b) {
  $( undefined );
}
else {
  const c = $( 1 );
  a = c;
  $( c );
}
$( a );
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
