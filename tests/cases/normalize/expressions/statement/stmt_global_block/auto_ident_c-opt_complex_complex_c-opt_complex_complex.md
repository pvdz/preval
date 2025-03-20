# Preval test case

# auto_ident_c-opt_complex_complex_c-opt_complex_complex.md

> Normalize > Expressions > Statement > Stmt global block > Auto ident c-opt complex complex c-opt complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
{
  let b = { x: { y: 1 } };

  let a = { a: 999, b: 1000 };
  $(b)?.[$("x")]?.[$("y")];
  $(a);
}
`````


## Settled


`````js filename=intro
const tmpObjLitVal /*:object*/ = { y: 1 };
const b /*:object*/ = { x: tmpObjLitVal };
const tmpChainElementCall /*:unknown*/ = $(b);
const tmpIfTest /*:boolean*/ = tmpChainElementCall == null;
const a /*:object*/ = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(a);
} else {
  const tmpChainRootComputed /*:unknown*/ = $(`x`);
  const tmpChainElementObject /*:unknown*/ = tmpChainElementCall[tmpChainRootComputed];
  const tmpIfTest$1 /*:boolean*/ = tmpChainElementObject == null;
  if (tmpIfTest$1) {
    $(a);
  } else {
    const tmpChainRootComputed$1 /*:unknown*/ = $(`y`);
    tmpChainElementObject[tmpChainRootComputed$1];
    $(a);
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal = { y: 1 };
const tmpChainElementCall = $({ x: tmpObjLitVal });
const tmpIfTest = tmpChainElementCall == null;
const a = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(a);
} else {
  const tmpChainRootComputed = $(`x`);
  const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
  if (tmpChainElementObject == null) {
    $(a);
  } else {
    const tmpChainRootComputed$1 = $(`y`);
    tmpChainElementObject[tmpChainRootComputed$1];
    $(a);
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { y: 1 };
const b = { x: a };
const c = $( b );
const d = c == null;
const e = {
  a: 999,
  b: 1000,
};
if (d) {
  $( e );
}
else {
  const f = $( "x" );
  const g = c[ f ];
  const h = g == null;
  if (h) {
    $( e );
  }
  else {
    const i = $( "y" );
    g[ i ];
    $( e );
  }
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { x: '{"y":"1"}' }
 - 2: 'x'
 - 3: 'y'
 - 4: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
