# Preval test case

# auto_ident_opt_complex.md

> Normalize > Expressions > Statement > Logic and both > Auto ident opt complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
$(b)?.x && $(b)?.x;
$(a);
`````


## Settled


`````js filename=intro
let tmpIfTest /*:unknown*/ /*ternaryConst*/ = undefined;
const b /*:object*/ = { x: 1 };
const tmpChainElementCall /*:unknown*/ = $(b);
const tmpIfTest$1 /*:boolean*/ = tmpChainElementCall == null;
if (tmpIfTest$1) {
} else {
  tmpIfTest = tmpChainElementCall.x;
}
const a /*:object*/ = { a: 999, b: 1000 };
if (tmpIfTest) {
  const tmpChainElementCall$1 /*:unknown*/ = $(b);
  const tmpIfTest$3 /*:boolean*/ = tmpChainElementCall$1 == null;
  if (tmpIfTest$3) {
    $(a);
  } else {
    tmpChainElementCall$1.x;
    $(a);
  }
} else {
  $(a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpIfTest = undefined;
const b = { x: 1 };
const tmpChainElementCall = $(b);
if (!(tmpChainElementCall == null)) {
  tmpIfTest = tmpChainElementCall.x;
}
const a = { a: 999, b: 1000 };
if (tmpIfTest) {
  const tmpChainElementCall$1 = $(b);
  if (tmpChainElementCall$1 == null) {
    $(a);
  } else {
    tmpChainElementCall$1.x;
    $(a);
  }
} else {
  $(a);
}
`````


## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
const b = { x: 1 };
const c = $( b );
const d = c == null;
if (d) {

}
else {
  a = c.x;
}
const e = {
  a: 999,
  b: 1000,
};
if (a) {
  const f = $( b );
  const g = f == null;
  if (g) {
    $( e );
  }
  else {
    f.x;
    $( e );
  }
}
else {
  $( e );
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { x: '1' }
 - 2: { x: '1' }
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
