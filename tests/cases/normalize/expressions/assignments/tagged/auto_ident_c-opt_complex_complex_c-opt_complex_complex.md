# Preval test case

# auto_ident_c-opt_complex_complex_c-opt_complex_complex.md

> Normalize > Expressions > Assignments > Tagged > Auto ident c-opt complex complex c-opt complex complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: { y: 1 } };

let a = { a: 999, b: 1000 };
$`before ${(a = $(b)?.[$("x")]?.[$("y")])} after`;
$(a);
`````

## Settled


`````js filename=intro
const tmpObjLitVal /*:object*/ = { y: 1 };
const b /*:object*/ = { x: tmpObjLitVal };
const tmpChainElementCall /*:unknown*/ = $(b);
const tmpIfTest /*:boolean*/ = tmpChainElementCall == null;
const tmpCalleeParam /*:array*/ = [`before `, ` after`];
if (tmpIfTest) {
  $(tmpCalleeParam, undefined);
  $(undefined);
} else {
  const tmpChainRootComputed /*:unknown*/ = $(`x`);
  const tmpChainElementObject /*:unknown*/ = tmpChainElementCall[tmpChainRootComputed];
  const tmpIfTest$1 /*:boolean*/ = tmpChainElementObject == null;
  if (tmpIfTest$1) {
    $(tmpCalleeParam, undefined);
    $(undefined);
  } else {
    const tmpChainRootComputed$1 /*:unknown*/ = $(`y`);
    const tmpChainElementObject$1 /*:unknown*/ = tmpChainElementObject[tmpChainRootComputed$1];
    $(tmpCalleeParam, tmpChainElementObject$1);
    $(tmpChainElementObject$1);
  }
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal = { y: 1 };
const tmpChainElementCall = $({ x: tmpObjLitVal });
const tmpIfTest = tmpChainElementCall == null;
const tmpCalleeParam = [`before `, ` after`];
if (tmpIfTest) {
  $(tmpCalleeParam, undefined);
  $(undefined);
} else {
  const tmpChainRootComputed = $(`x`);
  const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
  if (tmpChainElementObject == null) {
    $(tmpCalleeParam, undefined);
    $(undefined);
  } else {
    const tmpChainRootComputed$1 = $(`y`);
    const tmpChainElementObject$1 = tmpChainElementObject[tmpChainRootComputed$1];
    $(tmpCalleeParam, tmpChainElementObject$1);
    $(tmpChainElementObject$1);
  }
}
`````

## Pre Normal


`````js filename=intro
let b = { x: { y: 1 } };
let a = { a: 999, b: 1000 };
$([`before `, ` after`], (a = $(b)?.[$(`x`)]?.[$(`y`)]));
$(a);
`````

## Normalized


`````js filename=intro
const tmpObjLitVal = { y: 1 };
let b = { x: tmpObjLitVal };
let a = { a: 999, b: 1000 };
const tmpCalleeParam = [`before `, ` after`];
a = undefined;
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
    a = tmpChainElementObject$1;
  } else {
  }
} else {
}
let tmpCalleeParam$1 = a;
$(tmpCalleeParam, a);
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = { y: 1 };
const b = { x: a };
const c = $( b );
const d = c == null;
const e = [ "before ", " after" ];
if (d) {
  $( e, undefined );
  $( undefined );
}
else {
  const f = $( "x" );
  const g = c[ f ];
  const h = g == null;
  if (h) {
    $( e, undefined );
    $( undefined );
  }
  else {
    const i = $( "y" );
    const j = g[ i ];
    $( e, j );
    $( j );
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
 - 4: ['before ', ' after'], 1
 - 5: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
