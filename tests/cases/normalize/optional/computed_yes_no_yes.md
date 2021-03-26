# Preval test case

# computed_yes_no_yes.md

> Normalize > Optional > Computed yes no yes
>
> Mix optional with regular member expressions

#TODO

## Input

`````js filename=intro
const a = {b: {c: {d: 10}}};
const b = 'b', c = 'c', d = 'd';
$(a?.[b][c]?.[d]);
`````

## Pre Normal

`````js filename=intro
const a = { b: { c: { d: 10 } } };
const b = 'b',
  c = 'c',
  d = 'd';
$(a?.[b][c]?.[d]);
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
  const tmpChainRootComputed$1 = c;
  const tmpChainElementObject$1 = tmpChainElementObject[tmpChainRootComputed$1];
  const tmpIfTest$1 = tmpChainElementObject$1 != null;
  if (tmpIfTest$1) {
    const tmpChainRootComputed$3 = d;
    const tmpChainElementObject$3 = tmpChainElementObject$1[tmpChainRootComputed$3];
    tmpCalleeParam = tmpChainElementObject$3;
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
  const tmpChainElementObject$1 = tmpChainElementObject.c;
  const tmpIfTest$1 = tmpChainElementObject$1 != null;
  if (tmpIfTest$1) {
    const tmpChainElementObject$3 = tmpChainElementObject$1.d;
    tmpCalleeParam = tmpChainElementObject$3;
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

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
