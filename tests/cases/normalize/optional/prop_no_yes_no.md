# Preval test case

# prop_no_yes_no.md

> Normalize > Optional > Prop no yes no
>
> Mix optional with regular member expressions

#TODO

## Input

`````js filename=intro
const a = {};
$(a.b?.c.d);
`````

## Pre Normal

`````js filename=intro
const a = {};
$(a.b?.c.d);
`````

## Normalized

`````js filename=intro
const a = {};
const tmpCallCallee = $;
let tmpCalleeParam = undefined;
const tmpChainRootProp = a;
const tmpChainElementObject = tmpChainRootProp.b;
const tmpIfTest = tmpChainElementObject != null;
if (tmpIfTest) {
  const tmpChainElementObject$1 = tmpChainElementObject.c;
  const tmpChainElementObject$2 = tmpChainElementObject$1.d;
  tmpCalleeParam = tmpChainElementObject$2;
}
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const a = {};
let tmpCalleeParam = undefined;
const tmpChainElementObject = a.b;
const tmpIfTest = tmpChainElementObject != null;
if (tmpIfTest) {
  const tmpChainElementObject$1 = tmpChainElementObject.c;
  const tmpChainElementObject$2 = tmpChainElementObject$1.d;
  tmpCalleeParam = tmpChainElementObject$2;
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
