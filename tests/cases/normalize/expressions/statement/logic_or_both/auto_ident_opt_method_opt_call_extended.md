# Preval test case

# auto_ident_opt_method_opt_call_extended.md

> Normalize > Expressions > Statement > Logic or both > Auto ident opt method opt call extended
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { c: { d: { e: $ } } };

let a = { a: 999, b: 1000 };
b?.c.d.e?.(1) || b?.c.d.e?.(1);
$(a);
`````


## Settled


`````js filename=intro
let tmpIfTest /*:unknown*/ = undefined;
const tmpIfTest$3 /*:boolean*/ = $ == null;
const tmpObjLitVal$1 /*:object*/ = { e: $ };
if (tmpIfTest$3) {
} else {
  tmpIfTest = $dotCall($, tmpObjLitVal$1, `e`, 1);
}
const a /*:object*/ = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(a);
} else {
  const tmpChainElementObject$9 /*:unknown*/ = tmpObjLitVal$1.e;
  const tmpIfTest$7 /*:boolean*/ = tmpChainElementObject$9 == null;
  if (tmpIfTest$7) {
    $(a);
  } else {
    $dotCall(tmpChainElementObject$9, tmpObjLitVal$1, `e`, 1);
    $(a);
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpIfTest = undefined;
const tmpIfTest$3 = $ == null;
const tmpObjLitVal$1 = { e: $ };
if (!tmpIfTest$3) {
  tmpIfTest = $dotCall($, tmpObjLitVal$1, `e`, 1);
}
const a = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(a);
} else {
  const tmpChainElementObject$9 = tmpObjLitVal$1.e;
  if (tmpChainElementObject$9 == null) {
    $(a);
  } else {
    $dotCall(tmpChainElementObject$9, tmpObjLitVal$1, `e`, 1);
    $(a);
  }
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
  const e = c.e;
  const f = e == null;
  if (f) {
    $( d );
  }
  else {
    $dotCall( e, c, "e", 1 );
    $( d );
  }
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
