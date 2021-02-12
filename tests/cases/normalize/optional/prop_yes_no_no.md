# Preval test case

# prop_yes_no_no.md

> normalize > optional > prop_yes_no_no
>
> Mix optional with regular member expressions

#TODO

## Input

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
if (tmpChainRootProp) {
  const tmpChainElementObject = tmpChainRootProp.b;
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
const tmpChainRootProp = a;
if (tmpChainRootProp) {
  const tmpChainElementObject = tmpChainRootProp.b;
  const tmpChainElementObject$1 = tmpChainElementObject.c;
  const tmpChainElementObject$2 = tmpChainElementObject$1.d;
  tmpCalleeParam = tmpChainElementObject$2;
}
$(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Normalized calls: Same

Final output calls: Same
