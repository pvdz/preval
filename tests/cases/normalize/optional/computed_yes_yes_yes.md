# Preval test case

# computed_yes_yes_yes.md

> normalize > optional > computed_yes_yes_yes
>
> Mix optional with regular member expressions

#TODO

## Input

`````js filename=intro
const a = {b: {c: {d: 10}}};
const b = 'b', c = 'c', d = 'd';
$(a?.[b]?.[c]?.[d]);
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
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainRootComputed = b;
  const tmpChainElementObject = tmpChainRootProp[tmpChainRootComputed];
  const tmpIfTest$1 = tmpChainElementObject != null;
  if (tmpIfTest$1) {
    const tmpChainRootComputed$1 = c;
    const tmpChainElementObject$1 = tmpChainElementObject[tmpChainRootComputed$1];
    const tmpIfTest$2 = tmpChainElementObject$1 != null;
    if (tmpIfTest$2) {
      const tmpChainRootComputed$2 = d;
      const tmpChainElementObject$2 = tmpChainElementObject$1[tmpChainRootComputed$2];
      tmpCalleeParam = tmpChainElementObject$2;
    }
  }
}
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpObjLitVal$1 = { d: 10 };
const tmpObjLitVal = { c: tmpObjLitVal$1 };
const a = { b: tmpObjLitVal };
let tmpCalleeParam = undefined;
const tmpIfTest = a != null;
if (tmpIfTest) {
  const tmpChainElementObject = a.b;
  const tmpIfTest$1 = tmpChainElementObject != null;
  if (tmpIfTest$1) {
    const tmpChainElementObject$1 = tmpChainElementObject.c;
    const tmpIfTest$2 = tmpChainElementObject$1 != null;
    if (tmpIfTest$2) {
      const tmpChainElementObject$2 = tmpChainElementObject$1.d;
      tmpCalleeParam = tmpChainElementObject$2;
    }
  }
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
