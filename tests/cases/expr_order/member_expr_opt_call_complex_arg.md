# Preval test case

# member_expr_opt_call_complex_arg.md

> Expr order > Member expr opt call complex arg
>
> Spread should normalize itself

This should throw. There was a regression where `x.y` was read before `a.b` (but the evaluation order ought to read `a.b` first)

#TODO

## Input

`````js filename=intro
var a, x;
a.b?.(x.y);
`````

## Normalized

`````js filename=intro
var a;
var x;
const tmpChainRootProp = a;
const tmpChainElementObject = tmpChainRootProp.b;
const tmpIfTest = tmpChainElementObject != null;
if (tmpIfTest) {
  const tmpCallObj = tmpChainElementObject;
  const tmpCallVal = tmpCallObj.call;
  const tmpCalleeParam = tmpChainRootProp;
  const tmpCalleeParam$1 = x.y;
  const tmpChainElementCall = tmpCallVal.call(tmpCallObj, tmpCalleeParam, tmpCalleeParam$1);
}
`````

## Output

`````js filename=intro
const tmpChainElementObject = undefined.b;
const tmpIfTest = tmpChainElementObject != null;
if (tmpIfTest) {
  const tmpCallVal = tmpChainElementObject.call;
  const tmpCalleeParam$1 = undefined.y;
  tmpCallVal.call(tmpChainElementObject, undefined, tmpCalleeParam$1);
}
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Normalized calls: Same

Final output calls: Same
