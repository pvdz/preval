# Preval test case

# member_prop.md

> normalize > optional > member_prop
>
> Optional chaining fun

#TODO

## Input

`````js filename=intro
const x = 10;
$(x?.length);
`````

## Normalized

`````js filename=intro
const x = 10;
const tmpCallCallee = $;
let tmpCalleeParam = undefined;
const tmpChainRootProp = x;
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainRootProp.length;
  tmpCalleeParam = tmpChainElementObject;
}
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
let tmpCalleeParam = undefined;
const tmpIfTest = 10 != null;
if (tmpIfTest) {
  const tmpChainElementObject = (10).length;
  tmpCalleeParam = tmpChainElementObject;
}
$(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
