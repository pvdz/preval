# Preval test case

# auto_ident_c-opt_complex_complex_c-opt_complex_complex.md

> Normalize > Expressions > Assignments > Arr element > Auto ident c-opt complex complex c-opt complex complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: { y: 1 } };

let a = { a: 999, b: 1000 };
$((a = $(b)?.[$("x")]?.[$("y")]) + (a = $(b)?.[$("x")]?.[$("y")]));
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { x: { y: 1 } };
let a = { a: 999, b: 1000 };
$((a = $(b)?.[$(`x`)]?.[$(`y`)]) + (a = $(b)?.[$(`x`)]?.[$(`y`)]));
$(a);
`````

## Normalized


`````js filename=intro
const tmpObjLitVal = { y: 1 };
let b = { x: tmpObjLitVal };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
a = undefined;
const tmpChainRootCall = $;
const tmpChainElementCall = tmpChainRootCall(b);
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
let tmpBinBothLhs = a;
a = undefined;
const tmpChainRootCall$1 = $;
const tmpChainElementCall$1 = tmpChainRootCall$1(b);
const tmpIfTest$3 = tmpChainElementCall$1 != null;
if (tmpIfTest$3) {
  const tmpChainRootComputed$3 = $(`x`);
  const tmpChainElementObject$3 = tmpChainElementCall$1[tmpChainRootComputed$3];
  const tmpIfTest$5 = tmpChainElementObject$3 != null;
  if (tmpIfTest$5) {
    const tmpChainRootComputed$5 = $(`y`);
    const tmpChainElementObject$5 = tmpChainElementObject$3[tmpChainRootComputed$5];
    a = tmpChainElementObject$5;
  } else {
  }
} else {
}
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output


`````js filename=intro
const tmpObjLitVal /*:object*/ = { y: 1 };
const b /*:object*/ = { x: tmpObjLitVal };
const tmpChainElementCall = $(b);
const tmpIfTest /*:boolean*/ = tmpChainElementCall == null;
if (tmpIfTest) {
} else {
  const tmpChainRootComputed = $(`x`);
  const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
  const tmpIfTest$1 /*:boolean*/ = tmpChainElementObject == null;
  if (tmpIfTest$1) {
  } else {
    const tmpChainRootComputed$1 = $(`y`);
    tmpChainElementObject[tmpChainRootComputed$1];
  }
}
let tmpClusterSSA_a = undefined;
const tmpChainElementCall$1 = $(b);
const tmpIfTest$3 /*:boolean*/ = tmpChainElementCall$1 == null;
if (tmpIfTest$3) {
} else {
  const tmpChainRootComputed$3 = $(`x`);
  const tmpChainElementObject$3 = tmpChainElementCall$1[tmpChainRootComputed$3];
  const tmpIfTest$5 /*:boolean*/ = tmpChainElementObject$3 == null;
  if (tmpIfTest$5) {
  } else {
    const tmpChainRootComputed$5 = $(`y`);
    const tmpChainElementObject$5 = tmpChainElementObject$3[tmpChainRootComputed$5];
    tmpClusterSSA_a = tmpChainElementObject$5;
  }
}
const tmpCalleeParam /*:primitive*/ = tmpClusterSSA_a + tmpClusterSSA_a;
$(tmpCalleeParam);
$(tmpClusterSSA_a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { y: 1 };
const b = { x: a };
const c = $( b );
const d = c == null;
if (d) {

}
else {
  const e = $( "x" );
  const f = c[ e ];
  const g = f == null;
  if (g) {

  }
  else {
    const h = $( "y" );
    f[ h ];
  }
}
let i = undefined;
const j = $( b );
const k = j == null;
if (k) {

}
else {
  const l = $( "x" );
  const m = j[ l ];
  const n = m == null;
  if (n) {

  }
  else {
    const o = $( "y" );
    const p = m[ o ];
    i = p;
  }
}
const q = i + i;
$( q );
$( i );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '{"y":"1"}' }
 - 2: 'x'
 - 3: 'y'
 - 4: { x: '{"y":"1"}' }
 - 5: 'x'
 - 6: 'y'
 - 7: 2
 - 8: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
