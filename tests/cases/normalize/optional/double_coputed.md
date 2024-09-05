# Preval test case

# double_coputed.md

> Normalize > Optional > Double coputed
>
> Order of complex expressions in double optional computed property

## Input

`````js filename=intro
let a = {x: {y: {z: 10}}};
$($(a)?.[$('x')]?.[$('y')][$('z')]);
`````

## Pre Normal


`````js filename=intro
let a = { x: { y: { z: 10 } } };
$($(a)?.[$(`x`)]?.[$(`y`)][$(`z`)]);
`````

## Normalized


`````js filename=intro
const tmpObjLitVal$1 = { z: 10 };
const tmpObjLitVal = { y: tmpObjLitVal$1 };
let a = { x: tmpObjLitVal };
const tmpCallCallee = $;
let tmpCalleeParam = undefined;
const tmpChainRootCall = $;
const tmpChainElementCall = tmpChainRootCall(a);
const tmpIfTest = tmpChainElementCall != null;
if (tmpIfTest) {
  const tmpChainRootComputed = $(`x`);
  const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
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
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
let tmpCalleeParam = undefined;
const tmpObjLitVal$1 = { z: 10 };
const tmpObjLitVal = { y: tmpObjLitVal$1 };
const a = { x: tmpObjLitVal };
const tmpChainElementCall = $(a);
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
    const tmpChainRootComputed$3 = $(`z`);
    const tmpChainElementObject$3 = tmpChainElementObject$1[tmpChainRootComputed$3];
    tmpCalleeParam = tmpChainElementObject$3;
  }
}
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
let a = undefined;
const b = { z: 10 };
const c = { y: b };
const d = { x: c };
const e = $( d );
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
    a = m;
  }
}
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '{"y":"{\\"z\\":\\"10\\"}"}' }
 - 2: 'x'
 - 3: 'y'
 - 4: 'z'
 - 5: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
