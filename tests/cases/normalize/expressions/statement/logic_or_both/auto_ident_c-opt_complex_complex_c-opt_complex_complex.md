# Preval test case

# auto_ident_c-opt_complex_complex_c-opt_complex_complex.md

> Normalize > Expressions > Statement > Logic or both > Auto ident c-opt complex complex c-opt complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { x: { y: 1 } };

let a = { a: 999, b: 1000 };
$(b)?.[$("x")]?.[$("y")] || $(b)?.[$("x")]?.[$("y")];
$(a);
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
const tmpChainElementCall = tmpChainRootCall(b);
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
} else {
  const tmpChainRootCall$1 = $;
  const tmpChainElementCall$1 = tmpChainRootCall$1(b);
  const tmpIfTest$5 = tmpChainElementCall$1 != null;
  if (tmpIfTest$5) {
    const tmpChainRootComputed$3 = $(`x`);
    const tmpChainElementObject$3 = tmpChainElementCall$1[tmpChainRootComputed$3];
    const tmpIfTest$7 = tmpChainElementObject$3 != null;
    if (tmpIfTest$7) {
      const tmpChainRootComputed$5 = $(`y`);
      const tmpChainElementObject$5 = tmpChainElementObject$3[tmpChainRootComputed$5];
    } else {
    }
  } else {
  }
}
$(a);
`````

## Output


`````js filename=intro
const tmpObjLitVal = { y: 1 };
const b = { x: tmpObjLitVal };
const a = { a: 999, b: 1000 };
let tmpIfTest = false;
const tmpChainElementCall = $(b);
const tmpIfTest$1 = tmpChainElementCall == null;
if (tmpIfTest$1) {
} else {
  const tmpChainRootComputed = $(`x`);
  const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
  const tmpIfTest$3 = tmpChainElementObject == null;
  if (tmpIfTest$3) {
  } else {
    const tmpChainRootComputed$1 = $(`y`);
    const tmpChainElementObject$1 = tmpChainElementObject[tmpChainRootComputed$1];
    tmpIfTest = tmpChainElementObject$1;
  }
}
if (tmpIfTest) {
} else {
  const tmpChainElementCall$1 = $(b);
  const tmpIfTest$5 = tmpChainElementCall$1 == null;
  if (tmpIfTest$5) {
  } else {
    const tmpChainRootComputed$3 = $(`x`);
    const tmpChainElementObject$3 = tmpChainElementCall$1[tmpChainRootComputed$3];
    const tmpIfTest$7 = tmpChainElementObject$3 == null;
    if (tmpIfTest$7) {
    } else {
      const tmpChainRootComputed$5 = $(`y`);
      tmpChainElementObject$3[tmpChainRootComputed$5];
    }
  }
}
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { y: 1 };
const b = { x: a };
const c = {
  a: 999,
  b: 1000,
};
let d = false;
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
if (d) {

}
else {
  const l = $( b );
  const m = l == null;
  if (m) {

  }
  else {
    const n = $( "x" );
    const o = l[ n ];
    const p = o == null;
    if (p) {

    }
    else {
      const q = $( "y" );
      o[ q ];
    }
  }
}
$( c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '{"y":"1"}' }
 - 2: 'x'
 - 3: 'y'
 - 4: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
