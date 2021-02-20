# Preval test case

# member_expr_call_complex_arg.md

> Expr order > Member expr call complex arg
>
> Spread should normalize itself

This should throw. There was a regression where `x.y` was read before `a.b` (but the evaluation order ought to read `a.b` first)

```js
a.b(x.y)

tmp = a
tmp = tmp.b
tmp2 = x.y
tmp.call(a, tmp2)

```

#TODO

## Input

`````js filename=intro
var a, x;
a.b(x.y);
`````

## Normalized

`````js filename=intro
var a;
var x;
const tmpCallObj = a;
const tmpCallVal = tmpCallObj.b;
const tmpCalleeParam = x.y;
tmpCallVal.call(tmpCallObj, tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpCallVal = undefined.b;
const tmpCalleeParam = undefined.y;
tmpCallVal.call(undefined, tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Normalized calls: Same

Final output calls: Same
