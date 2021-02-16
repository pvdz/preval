# Preval test case

# computed_no_no_yes.md

> normalize > optional > computed_no_no_yes
>
> Mix optional with regular member expressions

#TODO

## Input

`````js filename=intro
const a = {b: {c: {d: 10}}};
const b = 'b', c = 'c', d = 'd';
$(a[b][c]?.[d]);
`````

## Normalized

`````js filename=intro
const tmpObjLitVal$1 = { d: 10 };
const tmpObjLitVal = { c: tmpObjLitVal$1 };
const a = { b: tmpObjLitVal };
const b = 'b';
const c = 'c';
const d = 'd';
const tmpCallCallee = $;
let tmpCalleeParam = undefined;
const tmpChainRootProp = a;
const tmpChainRootComputed = b;
const tmpChainElementObject = tmpChainRootProp[tmpChainRootComputed];
const tmpChainRootComputed$1 = c;
const tmpChainElementObject$1 = tmpChainElementObject[tmpChainRootComputed$1];
const tmpIfTest = tmpChainElementObject$1 != null;
if (tmpIfTest) {
  const tmpChainRootComputed$2 = d;
  const tmpChainElementObject$2 = tmpChainElementObject$1[tmpChainRootComputed$2];
  tmpCalleeParam = tmpChainElementObject$2;
}
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpObjLitVal$1 = { d: 10 };
const tmpObjLitVal = { c: tmpObjLitVal$1 };
const a = { b: tmpObjLitVal };
let tmpCalleeParam = undefined;
const tmpChainElementObject = a.b;
const tmpChainElementObject$1 = tmpChainElementObject.c;
const tmpIfTest = tmpChainElementObject$1 != null;
if (tmpIfTest) {
  const tmpChainElementObject$2 = tmpChainElementObject$1.d;
  tmpCalleeParam = tmpChainElementObject$2;
}
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 10
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
