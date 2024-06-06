# Preval test case

# auto_ident_c-opt_complex_complex_c-opt_complex_complex.md

> Normalize > Expressions > Statement > Return > Auto ident c-opt complex complex c-opt complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { x: { y: 1 } };

let a = { a: 999, b: 1000 };
function f() {
  return $(b)?.[$("x")]?.[$("y")];
}
$(f());
$(a);
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  return $(b)?.[$(`x`)]?.[$(`y`)];
};
let b = { x: { y: 1 } };
let a = { a: 999, b: 1000 };
$(f());
$(a);
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  let tmpReturnArg = undefined;
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
      tmpReturnArg = tmpChainElementObject$1;
      return tmpReturnArg;
    } else {
      return tmpReturnArg;
    }
  } else {
    return tmpReturnArg;
  }
};
const tmpObjLitVal = { y: 1 };
let b = { x: tmpObjLitVal };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output


`````js filename=intro
const f = function () {
  debugger;
  const tmpChainElementCall = $(b);
  const tmpIfTest = tmpChainElementCall == null;
  if (tmpIfTest) {
    return undefined;
  } else {
    const tmpChainRootComputed = $(`x`);
    const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
    const tmpIfTest$1 = tmpChainElementObject == null;
    if (tmpIfTest$1) {
      return undefined;
    } else {
      const tmpChainRootComputed$1 = $(`y`);
      const tmpChainElementObject$1 = tmpChainElementObject[tmpChainRootComputed$1];
      return tmpChainElementObject$1;
    }
  }
};
const tmpObjLitVal = { y: 1 };
const b = { x: tmpObjLitVal };
const a = { a: 999, b: 1000 };
const tmpCalleeParam = f();
$(tmpCalleeParam);
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  const b = $( c );
  const d = b == null;
  if (d) {
    return undefined;
  }
  else {
    const e = $( "x" );
    const f = b[ e ];
    const g = f == null;
    if (g) {
      return undefined;
    }
    else {
      const h = $( "y" );
      const i = f[ h ];
      return i;
    }
  }
};
const j = { y: 1 };
const c = { x: j };
const k = {
a: 999,
b: 1000
;
const l = a();
$( l );
$( k );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '{"y":"1"}' }
 - 2: 'x'
 - 3: 'y'
 - 4: 1
 - 5: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
