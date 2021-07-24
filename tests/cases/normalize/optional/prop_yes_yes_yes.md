# Preval test case

# prop_yes_yes_yes.md

> Normalize > Optional > Prop yes yes yes
>
> Mix optional with regular member expressions

#TODO

## Input

`````js filename=intro
const a = {};
$(a?.b?.c?.d);
`````

## Pre Normal

`````js filename=intro
const a = {};
$(a?.b?.c?.d);
`````

## Normalized

`````js filename=intro
const a = {};
const tmpCallCallee = $;
let tmpCalleeParam = undefined;
const tmpChainRootProp = a;
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainRootProp.b;
  const tmpIfTest$1 = tmpChainElementObject != null;
  if (tmpIfTest$1) {
    const tmpChainElementObject$1 = tmpChainElementObject.c;
    const tmpIfTest$3 = tmpChainElementObject$1 != null;
    if (tmpIfTest$3) {
      const tmpChainElementObject$3 = tmpChainElementObject$1.d;
      tmpCalleeParam = tmpChainElementObject$3;
    } else {
    }
  } else {
  }
} else {
}
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
let tmpCalleeParam = undefined;
const tmpChainElementObject = $ObjectPrototype.b;
const tmpIfTest$1 = tmpChainElementObject == null;
if (tmpIfTest$1) {
} else {
  const tmpChainElementObject$1 = tmpChainElementObject.c;
  const tmpIfTest$3 = tmpChainElementObject$1 == null;
  if (tmpIfTest$3) {
  } else {
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
 - 1: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
