# Preval test case

# double_coputed_call.md

> Normalize > Optional > Double coputed call
>
> Order of complex expressions in double optional computed property

## Input

`````js filename=intro
let a = {x: {y: {z: $}}};
$($(a)?.[$('x')]?.[$('y')][$('z')])?.(100);
`````

## Pre Normal


`````js filename=intro
let a = { x: { y: { z: $ } } };
$($(a)?.[$(`x`)]?.[$(`y`)][$(`z`)])?.(100);
`````

## Normalized


`````js filename=intro
const tmpObjLitVal$1 = { z: $ };
const tmpObjLitVal = { y: tmpObjLitVal$1 };
let a = { x: tmpObjLitVal };
const tmpChainRootCall = $;
const tmpCallCallee = tmpChainRootCall;
let tmpCalleeParam = undefined;
const tmpChainRootCall$1 = $;
const tmpChainElementCall$3 = tmpChainRootCall$1(a);
const tmpIfTest = tmpChainElementCall$3 != null;
if (tmpIfTest) {
  const tmpChainRootComputed = $(`x`);
  const tmpChainElementObject = tmpChainElementCall$3[tmpChainRootComputed];
  const tmpIfTest$1 = tmpChainElementObject != null;
  if (tmpIfTest$1) {
    const tmpChainRootComputed$1 = $(`y`);
    const tmpChainElementObject$1 = tmpChainElementObject[tmpChainRootComputed$1];
    const tmpChainRootComputed$3 = $(`z`);
    const tmpChainElementObject$3 = tmpChainElementObject$1[tmpChainRootComputed$3];
    tmpCalleeParam = tmpChainElementObject$3;
  } else {
  }
} else {
}
const tmpChainElementCall = tmpCallCallee(tmpCalleeParam);
const tmpIfTest$3 = tmpChainElementCall != null;
if (tmpIfTest$3) {
  const tmpChainElementCall$1 = $dotCall(tmpChainElementCall, tmpChainRootCall, 100);
} else {
}
`````

## Output


`````js filename=intro
const tmpObjLitVal$1 = { z: $ };
const tmpObjLitVal = { y: tmpObjLitVal$1 };
const a = { x: tmpObjLitVal };
let tmpCalleeParam = undefined;
const tmpChainElementCall$3 = $(a);
const tmpIfTest = tmpChainElementCall$3 == null;
if (tmpIfTest) {
} else {
  const tmpChainRootComputed = $(`x`);
  const tmpChainElementObject = tmpChainElementCall$3[tmpChainRootComputed];
  const tmpIfTest$1 = tmpChainElementObject == null;
  if (tmpIfTest$1) {
  } else {
    const tmpChainRootComputed$1 = $(`y`);
    const tmpChainElementObject$1 = tmpChainElementObject[tmpChainRootComputed$1];
    const tmpChainRootComputed$3 = $(`z`);
    const tmpChainElementObject$3 = tmpChainElementObject$1[tmpChainRootComputed$3];
    tmpCalleeParam = tmpChainElementObject$3;
  }
}
const tmpChainElementCall = $(tmpCalleeParam);
const tmpIfTest$3 = tmpChainElementCall == null;
if (tmpIfTest$3) {
} else {
  $dotCall(tmpChainElementCall, $, 100);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = { z: $ };
const b = { y: a };
const c = { x: b };
let d = undefined;
const e = $( c );
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
    const l = $( "z" );
    const m = k[ l ];
    d = m;
  }
}
const n = $( d );
const o = n == null;
if (o) {

}
else {
  $dotCall( n, $, 100 );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '{"y":"{\\"z\\":\\"\\\\\\"<$>\\\\\\"\\"}"}' }
 - 2: 'x'
 - 3: 'y'
 - 4: 'z'
 - 5: '<$>'
 - 6: 100
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
