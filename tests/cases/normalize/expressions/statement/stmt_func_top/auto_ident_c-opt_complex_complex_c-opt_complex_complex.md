# Preval test case

# auto_ident_c-opt_complex_complex_c-opt_complex_complex.md

> Normalize > Expressions > Statement > Stmt func top > Auto ident c-opt complex complex c-opt complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
function f() {
  let b = { x: { y: 1 } };

  let a = { a: 999, b: 1000 };
  $(b)?.[$("x")]?.[$("y")];
  $(a);
}
$(f());
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
  $(undefined);
} else {
  const tmpChainRootComputed /*:unknown*/ = $(`x`);
  const tmpChainElementObject /*:unknown*/ = tmpChainElementCall[tmpChainRootComputed];
  const tmpIfTest$1 /*:boolean*/ = tmpChainElementObject == null;
  if (tmpIfTest$1) {
    $(a);
    $(undefined);
  } else {
    const tmpChainRootComputed$1 /*:unknown*/ = $(`y`);
    tmpChainElementObject[tmpChainRootComputed$1];
    $(a);
    $(undefined);
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
  $(undefined);
} else {
  const tmpChainRootComputed = $(`x`);
  const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
  if (tmpChainElementObject == null) {
    $(a);
    $(undefined);
  } else {
    const tmpChainRootComputed$1 = $(`y`);
    tmpChainElementObject[tmpChainRootComputed$1];
    $(a);
    $(undefined);
  }
}
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  let b = { x: { y: 1 } };
  let a = { a: 999, b: 1000 };
  $(b)?.[$(`x`)]?.[$(`y`)];
  $(a);
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  const tmpObjLitVal = { y: 1 };
  let b = { x: tmpObjLitVal };
  let a = { a: 999, b: 1000 };
  const tmpChainRootCall = $;
  const tmpChainElementCall = $(b);
  const tmpIfTest = tmpChainElementCall != null;
  if (tmpIfTest) {
    const tmpChainRootComputed = $(`x`);
    const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
    const tmpIfTest$1 = tmpChainElementObject != null;
    if (tmpIfTest$1) {
      const tmpChainRootComputed$1 = $(`y`);
      const tmpChainElementObject$1 = tmpChainElementObject[tmpChainRootComputed$1];
      $(a);
      return undefined;
    } else {
      $(a);
      return undefined;
    }
  } else {
    $(a);
    return undefined;
  }
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
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
  $( undefined );
}
else {
  const f = $( "x" );
  const g = c[ f ];
  const h = g == null;
  if (h) {
    $( e );
    $( undefined );
  }
  else {
    const i = $( "y" );
    g[ i ];
    $( e );
    $( undefined );
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
 - 5: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
