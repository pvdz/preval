# Preval test case

# member_computed.md

> normalize > optional > member_computed
>
> Optional chaining fun

#TODO

## Input

`````js filename=intro
const x = 10;
$(x?.[20]);
`````

## Normalized

`````js filename=intro
const x = 10;
const tmpCallCallee = $;
let tmpCalleeParam = undefined;
const tmpChainRootProp = x;
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainRootComputed = 20;
  const tmpChainElementObject = tmpChainRootProp[tmpChainRootComputed];
  tmpCalleeParam = tmpChainElementObject;
}
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
let tmpCalleeParam = undefined;
const tmpChainElementObject = (10)[20];
tmpCalleeParam = tmpChainElementObject;
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
