# Preval test case

# call_arg.md

> normalize > spread > call_arg
>
> Spread should normalize itself

This should throw. There was a regression where `x.y` was read before `a.b` (but the evaluation order ought to read `a.b` first)

#TODO

## Input

`````js filename=intro
var a, x;
a?.b(x.y);
`````

## Normalized

`````js filename=intro
var a;
var x;
const tmpChainRootProp = a;
if (tmpChainRootProp) {
  const tmpChainElementObject = tmpChainRootProp.b;
  const tmpCallObj = tmpChainElementObject;
  const tmpCallVal = tmpCallObj.call;
  const tmpCalleeParam = tmpChainRootProp;
  const tmpCalleeParam$1 = x.y;
  const tmpChainElementCall = tmpCallVal.call(tmpCallObj, tmpCalleeParam, tmpCalleeParam$1);
}
`````

## Output

`````js filename=intro
var a;
var x;
const tmpChainRootProp = a;
if (tmpChainRootProp) {
  const tmpChainElementObject = tmpChainRootProp.b;
  const tmpCallVal = tmpChainElementObject.call;
  const tmpCalleeParam$1 = x.y;
  const tmpChainElementCall = tmpCallVal.call(tmpChainElementObject, tmpChainRootProp, tmpCalleeParam$1);
}
`````

## Result

Should call `$` with:
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
