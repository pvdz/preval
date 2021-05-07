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

## Pre Normal

`````js filename=intro
let a = undefined;
let x = undefined;
a.b?.(x.y);
`````

## Normalized

`````js filename=intro
let a = undefined;
let x = undefined;
const tmpChainRootProp = a;
const tmpChainElementObject = tmpChainRootProp.b;
const tmpIfTest = tmpChainElementObject != null;
if (tmpIfTest) {
  const tmpCallCallee = $dotCall;
  const tmpCalleeParam = tmpChainElementObject;
  const tmpCalleeParam$1 = tmpChainRootProp;
  const tmpCalleeParam$3 = x.y;
  const tmpChainElementCall = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$3);
} else {
}
`````

## Output

`````js filename=intro
undefined.b;
throw '[Preval]: Can not reach here';
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
