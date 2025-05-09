# Preval test case

# auto_ident_c-opt_complex_complex.md

> Normalize > Expressions > Statement > Logic or both > Auto ident c-opt complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
$(b)?.[$("x")] || $(b)?.[$("x")];
$(a);
`````


## Settled


`````js filename=intro
let tmpIfTest /*:unknown*/ = undefined;
const b /*:object*/ = { x: 1 };
const tmpChainElementCall /*:unknown*/ = $(b);
const tmpIfTest$1 /*:boolean*/ = tmpChainElementCall == null;
if (tmpIfTest$1) {
} else {
  const tmpChainRootComputed /*:unknown*/ = $(`x`);
  tmpIfTest = tmpChainElementCall[tmpChainRootComputed];
}
const a /*:object*/ = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(a);
} else {
  const tmpChainElementCall$1 /*:unknown*/ = $(b);
  const tmpIfTest$3 /*:boolean*/ = tmpChainElementCall$1 == null;
  if (tmpIfTest$3) {
    $(a);
  } else {
    const tmpChainRootComputed$1 /*:unknown*/ = $(`x`);
    tmpChainElementCall$1[tmpChainRootComputed$1];
    $(a);
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpIfTest = undefined;
const b = { x: 1 };
const tmpChainElementCall = $(b);
if (!(tmpChainElementCall == null)) {
  const tmpChainRootComputed = $(`x`);
  tmpIfTest = tmpChainElementCall[tmpChainRootComputed];
}
const a = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(a);
} else {
  const tmpChainElementCall$1 = $(b);
  if (tmpChainElementCall$1 == null) {
    $(a);
  } else {
    const tmpChainRootComputed$1 = $(`x`);
    tmpChainElementCall$1[tmpChainRootComputed$1];
    $(a);
  }
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
  const e = $( "x" );
  a = c[ e ];
}
const f = {
  a: 999,
  b: 1000,
};
if (a) {
  $( f );
}
else {
  const g = $( b );
  const h = g == null;
  if (h) {
    $( f );
  }
  else {
    const i = $( "x" );
    g[ i ];
    $( f );
  }
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { x: '1' }
 - 2: 'x'
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
