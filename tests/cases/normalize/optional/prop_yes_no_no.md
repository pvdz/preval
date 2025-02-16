# Preval test case

# prop_yes_no_no.md

> Normalize > Optional > Prop yes no no
>
> Mix optional with regular member expressions

## Input

`````js filename=intro
const a = {};
$(a?.b.c.d);
`````

## Pre Normal


`````js filename=intro
const a = {};
$(a?.b.c.d);
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
  const tmpChainElementObject$3 = tmpChainElementObject$1.d;
  tmpCalleeParam = tmpChainElementObject$3;
} else {
}
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
const tmpChainElementObject = $Object_prototype.b;
const tmpChainElementObject$1 = tmpChainElementObject.c;
const tmpChainElementObject$3 = tmpChainElementObject$1.d;
$(tmpChainElementObject$3);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $Object_prototype.b;
const b = a.c;
const c = b.d;
$( c );
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
