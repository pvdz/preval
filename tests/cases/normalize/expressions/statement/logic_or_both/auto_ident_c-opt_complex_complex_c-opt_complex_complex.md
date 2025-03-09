# Preval test case

# auto_ident_c-opt_complex_complex_c-opt_complex_complex.md

> Normalize > Expressions > Statement > Logic or both > Auto ident c-opt complex complex c-opt complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { x: { y: 1 } };

let a = { a: 999, b: 1000 };
$(b)?.[$("x")]?.[$("y")] || $(b)?.[$("x")]?.[$("y")];
$(a);
`````

## Settled


`````js filename=intro
let tmpIfTest /*:unknown*/ = undefined;
const tmpObjLitVal /*:object*/ = { y: 1 };
const b /*:object*/ = { x: tmpObjLitVal };
const tmpChainElementCall /*:unknown*/ = $(b);
const tmpIfTest$1 /*:boolean*/ = tmpChainElementCall == null;
if (tmpIfTest$1) {
} else {
  const tmpChainRootComputed /*:unknown*/ = $(`x`);
  const tmpChainElementObject /*:unknown*/ = tmpChainElementCall[tmpChainRootComputed];
  const tmpIfTest$3 /*:boolean*/ = tmpChainElementObject == null;
  if (tmpIfTest$3) {
  } else {
    const tmpChainRootComputed$1 /*:unknown*/ = $(`y`);
    const tmpChainElementObject$1 /*:unknown*/ = tmpChainElementObject[tmpChainRootComputed$1];
    tmpIfTest = tmpChainElementObject$1;
  }
}
const a /*:object*/ = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(a);
} else {
  const tmpChainElementCall$1 /*:unknown*/ = $(b);
  const tmpIfTest$5 /*:boolean*/ = tmpChainElementCall$1 == null;
  if (tmpIfTest$5) {
    $(a);
  } else {
    const tmpChainRootComputed$3 /*:unknown*/ = $(`x`);
    const tmpChainElementObject$3 /*:unknown*/ = tmpChainElementCall$1[tmpChainRootComputed$3];
    const tmpIfTest$7 /*:boolean*/ = tmpChainElementObject$3 == null;
    if (tmpIfTest$7) {
      $(a);
    } else {
      const tmpChainRootComputed$5 /*:unknown*/ = $(`y`);
      tmpChainElementObject$3[tmpChainRootComputed$5];
      $(a);
    }
  }
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpIfTest = undefined;
const tmpObjLitVal = { y: 1 };
const b = { x: tmpObjLitVal };
const tmpChainElementCall = $(b);
if (!(tmpChainElementCall == null)) {
  const tmpChainRootComputed = $(`x`);
  const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
  if (!(tmpChainElementObject == null)) {
    const tmpChainRootComputed$1 = $(`y`);
    tmpIfTest = tmpChainElementObject[tmpChainRootComputed$1];
  }
}
const a = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(a);
} else {
  const tmpChainElementCall$1 = $(b);
  if (tmpChainElementCall$1 == null) {
    $(a);
  } else {
    const tmpChainRootComputed$3 = $(`x`);
    const tmpChainElementObject$3 = tmpChainElementCall$1[tmpChainRootComputed$3];
    if (tmpChainElementObject$3 == null) {
      $(a);
    } else {
      const tmpChainRootComputed$5 = $(`y`);
      tmpChainElementObject$3[tmpChainRootComputed$5];
      $(a);
    }
  }
}
`````

## Pre Normal


`````js filename=intro
let b = { x: { y: 1 } };
let a = { a: 999, b: 1000 };
$(b)?.[$(`x`)]?.[$(`y`)] || $(b)?.[$(`x`)]?.[$(`y`)];
$(a);
`````

## Normalized


`````js filename=intro
const tmpObjLitVal = { y: 1 };
let b = { x: tmpObjLitVal };
let a = { a: 999, b: 1000 };
let tmpIfTest = undefined;
const tmpChainRootCall = $;
const tmpChainElementCall = $(b);
const tmpIfTest$1 = tmpChainElementCall != null;
if (tmpIfTest$1) {
  const tmpChainRootComputed = $(`x`);
  const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
  const tmpIfTest$3 = tmpChainElementObject != null;
  if (tmpIfTest$3) {
    const tmpChainRootComputed$1 = $(`y`);
    const tmpChainElementObject$1 = tmpChainElementObject[tmpChainRootComputed$1];
    tmpIfTest = tmpChainElementObject$1;
  } else {
  }
} else {
}
if (tmpIfTest) {
  $(a);
} else {
  const tmpChainRootCall$1 = $;
  const tmpChainElementCall$1 = $(b);
  const tmpIfTest$5 = tmpChainElementCall$1 != null;
  if (tmpIfTest$5) {
    const tmpChainRootComputed$3 = $(`x`);
    const tmpChainElementObject$3 = tmpChainElementCall$1[tmpChainRootComputed$3];
    const tmpIfTest$7 = tmpChainElementObject$3 != null;
    if (tmpIfTest$7) {
      const tmpChainRootComputed$5 = $(`y`);
      const tmpChainElementObject$5 = tmpChainElementObject$3[tmpChainRootComputed$5];
      $(a);
    } else {
      $(a);
    }
  } else {
    $(a);
  }
}
`````

## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
const b = { y: 1 };
const c = { x: b };
const d = $( c );
const e = d == null;
if (e) {

}
else {
  const f = $( "x" );
  const g = d[ f ];
  const h = g == null;
  if (h) {

  }
  else {
    const i = $( "y" );
    const j = g[ i ];
    a = j;
  }
}
const k = {
  a: 999,
  b: 1000,
};
if (a) {
  $( k );
}
else {
  const l = $( c );
  const m = l == null;
  if (m) {
    $( k );
  }
  else {
    const n = $( "x" );
    const o = l[ n ];
    const p = o == null;
    if (p) {
      $( k );
    }
    else {
      const q = $( "y" );
      o[ q ];
      $( k );
    }
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
