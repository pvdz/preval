# Preval test case

# member_opt_expr_call_complex_arg.md

> Expr order > Member opt expr call complex arg
>
> Spread should normalize itself

This should throw. There was a regression where `x.y` was read before `a.b` (but the evaluation order ought to read `a.b` first)

#TODO

## Input

`````js filename=intro
var a, x;
a?.b(x.y);
$(a, x);
`````

## Pre Normal

`````js filename=intro
let a = undefined;
let x = undefined;
a?.b(x.y);
$(a, x);
`````

## Normalized

`````js filename=intro
let a = undefined;
let x = undefined;
const tmpChainRootProp = a;
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainRootProp.b;
  const tmpCallObj = tmpChainElementObject;
  const tmpCallVal = tmpCallObj.call;
  const tmpCalleeParam = tmpChainRootProp;
  const tmpCalleeParam$1 = x.y;
  const tmpChainElementCall = tmpCallVal.call(tmpCallObj, tmpCalleeParam, tmpCalleeParam$1);
} else {
}
$(a, x);
`````

## Output

`````js filename=intro
$(undefined, undefined);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: undefined, undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
