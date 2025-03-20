# Preval test case

# auto_ident_opt_method_opt_call_extended.md

> Normalize > Expressions > Statement > Label > Auto ident opt method opt call extended
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { c: { d: { e: $ } } };

let a = { a: 999, b: 1000 };
label: b?.c.d.e?.(1);
$(a);
`````


## Settled


`````js filename=intro
const tmpIfTest$1 /*:boolean*/ = $ == null;
const a /*:object*/ = { a: 999, b: 1000 };
if (tmpIfTest$1) {
  $(a);
} else {
  const tmpObjLitVal$1 /*:object*/ = { e: $ };
  $dotCall($, tmpObjLitVal$1, `e`, 1);
  $(a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpIfTest$1 = $ == null;
const a = { a: 999, b: 1000 };
if (tmpIfTest$1) {
  $(a);
} else {
  $dotCall($, { e: $ }, `e`, 1);
  $(a);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $ == null;
const b = {
  a: 999,
  b: 1000,
};
if (a) {
  $( b );
}
else {
  const c = { e: $ };
  $dotCall( $, c, "e", 1 );
  $( b );
}
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
