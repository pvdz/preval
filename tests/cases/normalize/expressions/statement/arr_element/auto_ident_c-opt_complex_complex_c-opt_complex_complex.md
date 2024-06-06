# Preval test case

# auto_ident_c-opt_complex_complex_c-opt_complex_complex.md

> Normalize > Expressions > Statement > Arr element > Auto ident c-opt complex complex c-opt complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { x: { y: 1 } };

let a = { a: 999, b: 1000 };
$(b)?.[$("x")]?.[$("y")] + $(b)?.[$("x")]?.[$("y")];
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { x: { y: 1 } };
let a = { a: 999, b: 1000 };
$(b)?.[$(`x`)]?.[$(`y`)] + $(b)?.[$(`x`)]?.[$(`y`)];
$(a);
`````

## Normalized


`````js filename=intro
const tmpObjLitVal = { y: 1 };
let b = { x: tmpObjLitVal };
let a = { a: 999, b: 1000 };
let tmpBinBothLhs = undefined;
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
    tmpBinBothLhs = tmpChainElementObject$1;
  } else {
  }
} else {
}
let tmpBinBothRhs = undefined;
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
    tmpBinBothRhs = tmpChainElementObject$5;
  } else {
  }
} else {
}
tmpBinBothLhs + tmpBinBothRhs;
$(a);
`````

## Output


`````js filename=intro
const tmpObjLitVal = { y: 1 };
const b = { x: tmpObjLitVal };
const a = { a: 999, b: 1000 };
let tmpBinBothLhs = undefined;
const tmpChainElementCall = $(b);
const tmpIfTest = tmpChainElementCall == null;
if (tmpIfTest) {
} else {
  const tmpChainRootComputed = $(`x`);
  const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
  const tmpIfTest$1 = tmpChainElementObject == null;
  if (tmpIfTest$1) {
  } else {
    const tmpChainRootComputed$1 = $(`y`);
    const tmpChainElementObject$1 = tmpChainElementObject[tmpChainRootComputed$1];
    tmpBinBothLhs = tmpChainElementObject$1;
  }
}
let tmpBinBothRhs = undefined;
const tmpChainElementCall$1 = $(b);
const tmpIfTest$3 = tmpChainElementCall$1 == null;
if (tmpIfTest$3) {
} else {
  const tmpChainRootComputed$3 = $(`x`);
  const tmpChainElementObject$3 = tmpChainElementCall$1[tmpChainRootComputed$3];
  const tmpIfTest$5 = tmpChainElementObject$3 == null;
  if (tmpIfTest$5) {
  } else {
    const tmpChainRootComputed$5 = $(`y`);
    const tmpChainElementObject$5 = tmpChainElementObject$3[tmpChainRootComputed$5];
    tmpBinBothRhs = tmpChainElementObject$5;
  }
}
tmpBinBothLhs + tmpBinBothRhs;
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { y: 1 };
const b = { x: a };
const c = {
a: 999,
b: 1000
;
let d = undefined;
const e = $( b );
const f = e == null;
if (f) {

}
else {
  const g = $( "x" );
  const h = e[ g ];
  const i = h == null;
  if (i) {

  }
  else {
    const j = $( "y" );
    const k = h[ j ];
    d = k;
  }
}
let l = undefined;
const m = $( b );
const n = m == null;
if (n) {

}
else {
  const o = $( "x" );
  const p = m[ o ];
  const q = p == null;
  if (q) {

  }
  else {
    const r = $( "y" );
    const s = p[ r ];
    l = s;
  }
}
d + l;
$( c );
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
 - 7: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
