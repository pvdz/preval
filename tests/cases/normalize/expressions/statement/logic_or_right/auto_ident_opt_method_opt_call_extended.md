# Preval test case

# auto_ident_opt_method_opt_call_extended.md

> Normalize > Expressions > Statement > Logic or right > Auto ident opt method opt call extended
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { c: { d: { e: $ } } };

let a = { a: 999, b: 1000 };
$(100) || b?.c.d.e?.(1);
$(a);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(100);
const a /*:object*/ = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(a);
} else {
  const tmpIfTest$3 /*:boolean*/ = $ == null;
  if (tmpIfTest$3) {
    $(a);
  } else {
    const tmpObjLitVal$1 /*:object*/ = { e: $ };
    $dotCall($, tmpObjLitVal$1, `e`, 1);
    $(a);
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpIfTest = $(100);
const a = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(a);
} else {
  if ($ == null) {
    $(a);
  } else {
    $dotCall($, { e: $ }, `e`, 1);
    $(a);
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
const b = {
  a: 999,
  b: 1000,
};
if (a) {
  $( b );
}
else {
  const c = $ == null;
  if (c) {
    $( b );
  }
  else {
    const d = { e: $ };
    $dotCall( $, d, "e", 1 );
    $( b );
  }
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
