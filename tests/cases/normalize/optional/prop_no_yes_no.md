# Preval test case

# prop_no_yes_no.md

> normalize > optional > prop_no_yes_no
>
> Mix optional with regular member expressions

#TODO

## Input

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
if (tmpChainElementObject) {
  const tmpChainElementObject$1 = tmpChainElementObject.c;
  const tmpChainElementObject$2 = tmpChainElementObject$1.d;
  tmpCalleeParam = tmpChainElementObject$2;
}
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const a = {};
const tmpCallCallee = $;
let tmpCalleeParam = undefined;
const tmpChainRootProp = a;
const tmpChainElementObject = tmpChainRootProp.b;
if (tmpChainElementObject) {
  const tmpChainElementObject$1 = tmpChainElementObject.c;
  const tmpChainElementObject$2 = tmpChainElementObject$1.d;
  tmpCalleeParam = tmpChainElementObject$2;
}
tmpCallCallee(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
