# Preval test case

# auto_ident_opt_method_call_simple.md

> Normalize > Expressions > Statement > Logic and left > Auto ident opt method call simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { c: $ };

let a = { a: 999, b: 1000 };
b?.c(1) && $(100);
$(a);
`````

## Settled


`````js filename=intro
const b /*:object*/ = { c: $ };
const tmpChainElementCall /*:unknown*/ = b.c(1);
const a /*:object*/ = { a: 999, b: 1000 };
if (tmpChainElementCall) {
  $(100);
  $(a);
} else {
  $(a);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpChainElementCall = { c: $ }.c(1);
const a = { a: 999, b: 1000 };
if (tmpChainElementCall) {
  $(100);
  $(a);
} else {
  $(a);
}
`````

## Pre Normal


`````js filename=intro
let b = { c: $ };
let a = { a: 999, b: 1000 };
b?.c(1) && $(100);
$(a);
`````

## Normalized


`````js filename=intro
let b = { c: $ };
let a = { a: 999, b: 1000 };
let tmpIfTest = undefined;
const tmpChainRootProp = b;
const tmpIfTest$1 = tmpChainRootProp != null;
if (tmpIfTest$1) {
  const tmpChainElementCall = tmpChainRootProp.c(1);
  tmpIfTest = tmpChainElementCall;
} else {
}
if (tmpIfTest) {
  $(100);
  $(a);
} else {
  $(a);
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = { c: $ };
const b = a.c( 1 );
const c = {
  a: 999,
  b: 1000,
};
if (b) {
  $( 100 );
  $( c );
}
else {
  $( c );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 100
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
