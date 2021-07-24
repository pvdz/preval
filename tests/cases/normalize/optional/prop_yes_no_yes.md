# Preval test case

# prop_yes_no_yes.md

> Normalize > Optional > Prop yes no yes
>
> Mix optional with regular member expressions

This should crash because `a?.` will pass

And then `a.b.c` is an unconditional access of `c` on `undefined`.

#TODO

## Input

`````js filename=intro
const a = {};
$(a?.b.c?.d);
`````

## Pre Normal

`````js filename=intro
const a = {};
$(a?.b.c?.d);
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
  const tmpChainElementObject$1 = tmpChainElementObject.c;
  const tmpIfTest$1 = tmpChainElementObject$1 != null;
  if (tmpIfTest$1) {
    const tmpChainElementObject$3 = tmpChainElementObject$1.d;
    tmpCalleeParam = tmpChainElementObject$3;
  } else {
  }
} else {
}
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpChainElementObject = $ObjectPrototype.b;
const tmpChainElementObject$1 = tmpChainElementObject.c;
const tmpIfTest$1 = tmpChainElementObject$1 == null;
if (tmpIfTest$1) {
  $(undefined);
} else {
  const tmpChainElementObject$3 = tmpChainElementObject$1.d;
  $(tmpChainElementObject$3);
}
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
