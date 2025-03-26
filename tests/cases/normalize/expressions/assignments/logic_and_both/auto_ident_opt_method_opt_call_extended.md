# Preval test case

# auto_ident_opt_method_opt_call_extended.md

> Normalize > Expressions > Assignments > Logic and both > Auto ident opt method opt call extended
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: { d: { e: $ } } };

let a = { a: 999, b: 1000 };
$((a = b?.c.d.e?.(1)) && (a = b?.c.d.e?.(1)));
$(a);
`````


## Settled


`````js filename=intro
let a /*:unknown*/ = undefined;
const tmpIfTest$1 /*:boolean*/ = $ == null;
const tmpObjLitVal$1 /*:object*/ = { e: $ };
if (tmpIfTest$1) {
} else {
  const tmpChainElementCall /*:unknown*/ = $dotCall($, tmpObjLitVal$1, `e`, 1);
  a = tmpChainElementCall;
}
if (a) {
  const tmpChainElementObject$9 /*:unknown*/ = tmpObjLitVal$1.e;
  const tmpIfTest$5 /*:boolean*/ = tmpChainElementObject$9 == null;
  if (tmpIfTest$5) {
    $(undefined);
    $(undefined);
  } else {
    const tmpChainElementCall$1 /*:unknown*/ = $dotCall(tmpChainElementObject$9, tmpObjLitVal$1, `e`, 1);
    $(tmpChainElementCall$1);
    $(tmpChainElementCall$1);
  }
} else {
  $(a);
  $(a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = undefined;
const tmpIfTest$1 = $ == null;
const tmpObjLitVal$1 = { e: $ };
if (!tmpIfTest$1) {
  a = $dotCall($, tmpObjLitVal$1, `e`, 1);
}
if (a) {
  const tmpChainElementObject$9 = tmpObjLitVal$1.e;
  if (tmpChainElementObject$9 == null) {
    $(undefined);
    $(undefined);
  } else {
    const tmpChainElementCall$1 = $dotCall(tmpChainElementObject$9, tmpObjLitVal$1, `e`, 1);
    $(tmpChainElementCall$1);
    $(tmpChainElementCall$1);
  }
} else {
  $(a);
  $(a);
}
`````


## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
const b = $ == null;
const c = { e: $ };
if (b) {

}
else {
  const d = $dotCall( $, c, "e", 1 );
  a = d;
}
if (a) {
  const e = c.e;
  const f = e == null;
  if (f) {
    $( undefined );
    $( undefined );
  }
  else {
    const g = $dotCall( e, c, "e", 1 );
    $( g );
    $( g );
  }
}
else {
  $( a );
  $( a );
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
