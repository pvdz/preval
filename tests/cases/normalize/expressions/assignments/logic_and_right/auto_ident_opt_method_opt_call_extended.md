# Preval test case

# auto_ident_opt_method_opt_call_extended.md

> Normalize > Expressions > Assignments > Logic and right > Auto ident opt method opt call extended
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: { d: { e: $ } } };

let a = { a: 999, b: 1000 };
$($(100) && (a = b?.c.d.e?.(1)));
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(100);
if (tmpCalleeParam) {
  const tmpIfTest$1 /*:boolean*/ = $ == null;
  if (tmpIfTest$1) {
    $(undefined);
    $(undefined);
  } else {
    const tmpObjLitVal$1 /*:object*/ = { e: $ };
    const tmpChainElementCall /*:unknown*/ = $dotCall($, tmpObjLitVal$1, `e`, 1);
    $(tmpChainElementCall);
    $(tmpChainElementCall);
  }
} else {
  $(tmpCalleeParam);
  const a /*:object*/ = { a: 999, b: 1000 };
  $(a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCalleeParam = $(100);
if (tmpCalleeParam) {
  if ($ == null) {
    $(undefined);
    $(undefined);
  } else {
    const tmpChainElementCall = $dotCall($, { e: $ }, `e`, 1);
    $(tmpChainElementCall);
    $(tmpChainElementCall);
  }
} else {
  $(tmpCalleeParam);
  $({ a: 999, b: 1000 });
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
if (a) {
  const b = $ == null;
  if (b) {
    $( undefined );
    $( undefined );
  }
  else {
    const c = { e: $ };
    const d = $dotCall( $, c, "e", 1 );
    $( d );
    $( d );
  }
}
else {
  $( a );
  const e = {
    a: 999,
    b: 1000,
  };
  $( e );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: 1
 - 3: 1
 - 4: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
