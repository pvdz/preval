# Preval test case

# prop_no_no_yes.md

> Normalize > Optional > Prop no no yes
>
> Mix optional with regular member expressions

## Input

`````js filename=intro
const a = {};
$(a.b.c?.d);
`````

## Pre Normal


`````js filename=intro
const a = {};
$(a.b.c?.d);
`````

## Normalized


`````js filename=intro
const a = {};
const tmpCallCallee = $;
let tmpCalleeParam = undefined;
const tmpChainRootProp = a;
const tmpChainElementObject = tmpChainRootProp.b;
const tmpChainElementObject$1 = tmpChainElementObject.c;
const tmpIfTest = tmpChainElementObject$1 != null;
if (tmpIfTest) {
  const tmpChainElementObject$3 = tmpChainElementObject$1.d;
  tmpCalleeParam = tmpChainElementObject$3;
} else {
}
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
const tmpChainElementObject = $ObjectPrototype.b;
const tmpChainElementObject$1 = tmpChainElementObject.c;
const tmpIfTest = tmpChainElementObject$1 == null;
if (tmpIfTest) {
  $(undefined);
} else {
  const tmpChainElementObject$3 = tmpChainElementObject$1.d;
  $(tmpChainElementObject$3);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $ObjectPrototype.b;
const b = a.c;
const c = b == null;
if (c) {
  $( undefined );
}
else {
  const d = b.d;
  $( d );
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
