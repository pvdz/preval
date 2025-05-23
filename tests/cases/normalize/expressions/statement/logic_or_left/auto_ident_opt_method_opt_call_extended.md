# Preval test case

# auto_ident_opt_method_opt_call_extended.md

> Normalize > Expressions > Statement > Logic or left > Auto ident opt method opt call extended
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { c: { d: { e: $ } } };

let a = { a: 999, b: 1000 };
b?.c.d.e?.(1) || $(100);
$(a);
`````


## Settled


`````js filename=intro
let tmpIfTest /*:unknown*/ /*ternaryConst*/ = undefined;
const tmpIfTest$3 /*:boolean*/ = $ == null;
if (tmpIfTest$3) {
} else {
  const tmpObjLitVal$1 /*:object*/ = { e: $ };
  tmpIfTest = $dotCall($, tmpObjLitVal$1, `e`, 1);
}
const a /*:object*/ = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(a);
} else {
  $(100);
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
  $(a);
} else {
  $(100);
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
  a = $dotCall( $, c, "e", 1 );
}
const d = {
  a: 999,
  b: 1000,
};
if (a) {
  $( d );
}
else {
  $( 100 );
  $( d );
}
`````


## Todos triggered


None


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
