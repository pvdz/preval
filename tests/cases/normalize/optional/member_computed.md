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
if (tmpChainRootProp) {
  const tmpChainRootComputed = 20;
  const tmpChainElementObject = tmpChainRootProp[tmpChainRootComputed];
  tmpCalleeParam = tmpChainElementObject;
}
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
