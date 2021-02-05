# Preval test case

# double_coputed.md

> normalize > optional > double_coputed
>
> Order of complex expressions in double optional computed property

#TODO

## Input

`````js filename=intro
let a = {x: {y: {z: 10}}};
$($(a)?.[$('x')]?.[$('y')][$('z')]);
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
if (tmpChainElementCall) {
  const tmpChainRootComputed = $('x');
  const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
  if (tmpChainElementObject) {
    const tmpChainRootComputed$1 = $('y');
    const tmpChainElementObject$1 = tmpChainElementObject[tmpChainRootComputed$1];
    const tmpChainRootComputed$2 = $('z');
    const tmpChainElementObject$2 = tmpChainElementObject$1[tmpChainRootComputed$2];
    tmpCalleeParam = tmpChainElementObject$2;
  }
}
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpObjLitVal$1 = { z: 10 };
const tmpObjLitVal = { y: tmpObjLitVal$1 };
let a = { x: tmpObjLitVal };
const tmpCallCallee = $;
let tmpCalleeParam = undefined;
const tmpChainRootCall = $;
const tmpChainElementCall = tmpChainRootCall(a);
if (tmpChainElementCall) {
  const tmpChainRootComputed = $('x');
  const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
  if (tmpChainElementObject) {
    const tmpChainRootComputed$1 = $('y');
    const tmpChainElementObject$1 = tmpChainElementObject[tmpChainRootComputed$1];
    const tmpChainRootComputed$2 = $('z');
    const tmpChainElementObject$2 = tmpChainElementObject$1[tmpChainRootComputed$2];
    tmpCalleeParam = tmpChainElementObject$2;
  }
}
tmpCallCallee(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: { x: '{"y":"{\\"z\\":\\"10\\"}"}' }
 - 2: 'x'
 - 3: 'y'
 - 4: 'z'
 - 5: 10
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
