# Preval test case

# double_coputed.md

> normalize > optional > double_coputed
>
> Order of complex expressions in double optional computed property

#TODO

## Input

`````js filename=intro
let a = {x: {y: {z: $}}};
$($(a)?.[$('x')]?.[$('y')][$('z')])?.(100);
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
const tmpChainElementCall$2 = tmpChainRootCall$1(a);
if (tmpChainElementCall$2) {
  const tmpChainRootComputed = $('x');
  const tmpChainElementObject = tmpChainElementCall$2[tmpChainRootComputed];
  if (tmpChainElementObject) {
    const tmpChainRootComputed$1 = $('y');
    const tmpChainElementObject$1 = tmpChainElementObject[tmpChainRootComputed$1];
    const tmpChainRootComputed$2 = $('z');
    const tmpChainElementObject$2 = tmpChainElementObject$1[tmpChainRootComputed$2];
    tmpCalleeParam = tmpChainElementObject$2;
  }
}
const tmpChainElementCall = tmpCallCallee(tmpCalleeParam);
if (tmpChainElementCall) {
  const tmpChainElementCall$1 = tmpChainElementCall.call(tmpChainRootCall, 100);
}
`````

## Output

`````js filename=intro
const tmpObjLitVal$1 = { z: $ };
const tmpObjLitVal = { y: tmpObjLitVal$1 };
let a = { x: tmpObjLitVal };
let tmpCalleeParam = undefined;
const tmpChainElementCall$2 = $(a);
if (tmpChainElementCall$2) {
  const tmpChainRootComputed = $('x');
  const tmpChainElementObject = tmpChainElementCall$2[tmpChainRootComputed];
  if (tmpChainElementObject) {
    const tmpChainRootComputed$1 = $('y');
    const tmpChainElementObject$1 = tmpChainElementObject[tmpChainRootComputed$1];
    const tmpChainRootComputed$2 = $('z');
    const tmpChainElementObject$2 = tmpChainElementObject$1[tmpChainRootComputed$2];
    tmpCalleeParam = tmpChainElementObject$2;
  }
}
const tmpChainElementCall = $(tmpCalleeParam);
if (tmpChainElementCall) {
  const tmpChainElementCall$1 = tmpChainElementCall.call($, 100);
}
`````

## Result

Should call `$` with:
 - 1: { x: '{"y":"{\\"z\\":\\"\\\\\\"<$>\\\\\\"\\"}"}' }
 - 2: 'x'
 - 3: 'y'
 - 4: 'z'
 - 5: '<$>'
 - 6: 100
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same