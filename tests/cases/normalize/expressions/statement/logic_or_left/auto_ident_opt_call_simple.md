# Preval test case

# auto_ident_opt_call_simple.md

> Normalize > Expressions > Statement > Logic or left > Auto ident opt call simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$?.(1) || $(100);
$(a);
`````

## Settled


`````js filename=intro
let tmpIfTest /*:unknown*/ = undefined;
const tmpIfTest$1 /*:boolean*/ = $ == null;
if (tmpIfTest$1) {
} else {
  const tmpChainElementCall /*:unknown*/ = $(1);
  tmpIfTest = tmpChainElementCall;
}
if (tmpIfTest) {
} else {
  $(100);
}
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpIfTest = undefined;
if (!($ == null)) {
  tmpIfTest = $(1);
}
if (!tmpIfTest) {
  $(100);
}
$({ a: 999, b: 1000 });
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$?.(1) || $(100);
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpIfTest = undefined;
const tmpChainRootCall = $;
const tmpIfTest$1 = tmpChainRootCall != null;
if (tmpIfTest$1) {
  const tmpChainElementCall = tmpChainRootCall(1);
  tmpIfTest = tmpChainElementCall;
} else {
}
if (tmpIfTest) {
} else {
  $(100);
}
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
const b = $ == null;
if (b) {

}
else {
  const c = $( 1 );
  a = c;
}
if (a) {

}
else {
  $( 100 );
}
const d = {
  a: 999,
  b: 1000,
};
$( d );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
