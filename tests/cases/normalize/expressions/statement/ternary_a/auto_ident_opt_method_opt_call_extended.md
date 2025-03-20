# Preval test case

# auto_ident_opt_method_opt_call_extended.md

> Normalize > Expressions > Statement > Ternary a > Auto ident opt method opt call extended
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { c: { d: { e: $ } } };

let a = { a: 999, b: 1000 };
b?.c.d.e?.(1) ? $(100) : $(200);
$(a);
`````


## Settled


`````js filename=intro
let tmpIfTest /*:unknown*/ = undefined;
const tmpIfTest$3 /*:boolean*/ = $ == null;
if (tmpIfTest$3) {
} else {
  const tmpObjLitVal$1 /*:object*/ = { e: $ };
  const tmpChainElementCall /*:unknown*/ = $dotCall($, tmpObjLitVal$1, `e`, 1);
  tmpIfTest = tmpChainElementCall;
}
const a /*:object*/ = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(100);
  $(a);
} else {
  $(200);
  $(a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpIfTest = undefined;
if (!($ == null)) {
  tmpIfTest = $dotCall($, { e: $ }, `e`, 1);
}
const a = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(100);
  $(a);
} else {
  $(200);
  $(a);
}
`````


## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
const b = $ == null;
if (b) {

}
else {
  const c = { e: $ };
  const d = $dotCall( $, c, "e", 1 );
  a = d;
}
const e = {
  a: 999,
  b: 1000,
};
if (a) {
  $( 100 );
  $( e );
}
else {
  $( 200 );
  $( e );
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
