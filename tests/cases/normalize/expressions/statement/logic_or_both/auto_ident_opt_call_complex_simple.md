# Preval test case

# auto_ident_opt_call_complex_simple.md

> Normalize > Expressions > Statement > Logic or both > Auto ident opt call complex simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$($)?.(1) || $($)?.(1);
$(a);
`````


## Settled


`````js filename=intro
let tmpIfTest /*:unknown*/ = undefined;
const tmpChainElementCall /*:unknown*/ = $($);
const tmpIfTest$1 /*:boolean*/ = tmpChainElementCall == null;
if (tmpIfTest$1) {
} else {
  const tmpChainElementCall$1 /*:unknown*/ = $dotCall(tmpChainElementCall, $, undefined, 1);
  tmpIfTest = tmpChainElementCall$1;
}
const a /*:object*/ = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(a);
} else {
  const tmpChainElementCall$3 /*:unknown*/ = $($);
  const tmpIfTest$3 /*:boolean*/ = tmpChainElementCall$3 == null;
  if (tmpIfTest$3) {
    $(a);
  } else {
    $dotCall(tmpChainElementCall$3, $, undefined, 1);
    $(a);
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpIfTest = undefined;
const tmpChainElementCall = $($);
if (!(tmpChainElementCall == null)) {
  tmpIfTest = $dotCall(tmpChainElementCall, $, undefined, 1);
}
const a = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(a);
} else {
  const tmpChainElementCall$3 = $($);
  if (tmpChainElementCall$3 == null) {
    $(a);
  } else {
    $dotCall(tmpChainElementCall$3, $, undefined, 1);
    $(a);
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
const b = $( $ );
const c = b == null;
if (c) {

}
else {
  const d = $dotCall( b, $, undefined, 1 );
  a = d;
}
const e = {
  a: 999,
  b: 1000,
};
if (a) {
  $( e );
}
else {
  const f = $( $ );
  const g = f == null;
  if (g) {
    $( e );
  }
  else {
    $dotCall( f, $, undefined, 1 );
    $( e );
  }
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
