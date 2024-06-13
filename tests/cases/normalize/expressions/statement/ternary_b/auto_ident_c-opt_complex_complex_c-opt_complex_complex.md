# Preval test case

# auto_ident_c-opt_complex_complex_c-opt_complex_complex.md

> Normalize > Expressions > Statement > Ternary b > Auto ident c-opt complex complex c-opt complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { x: { y: 1 } };

let a = { a: 999, b: 1000 };
$(1) ? $(b)?.[$("x")]?.[$("y")] : $(200);
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { x: { y: 1 } };
let a = { a: 999, b: 1000 };
$(1) ? $(b)?.[$(`x`)]?.[$(`y`)] : $(200);
$(a);
`````

## Normalized


`````js filename=intro
const tmpObjLitVal = { y: 1 };
let b = { x: tmpObjLitVal };
let a = { a: 999, b: 1000 };
const tmpIfTest = $(1);
if (tmpIfTest) {
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
    } else {
    }
  } else {
  }
} else {
  $(200);
}
$(a);
`````

## Output


`````js filename=intro
const tmpObjLitVal = { y: 1 };
const tmpIfTest = $(1);
if (tmpIfTest) {
  const b = { x: tmpObjLitVal };
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
      tmpChainElementObject[tmpChainRootComputed$1];
    }
  }
} else {
  $(200);
}
const a = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { y: 1 };
const b = $( 1 );
if (b) {
  const c = { x: a };
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
      g[ i ];
    }
  }
}
else {
  $( 200 );
}
const j = {
  a: 999,
  b: 1000,
};
$( j );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: { x: '{"y":"1"}' }
 - 3: 'x'
 - 4: 'y'
 - 5: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
