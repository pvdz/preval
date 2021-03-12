# Preval test case

# minimal.md

> Regressions > Infinite loop due to hoisting > Minimal
>
> Minimal test case for an infinite loop at some point. The problem was hoisting triggering "changes" when there weren't any.

#TODO

## Input

`````js filename=intro
const a = {x: 1};

function f() {}
f(a.x === 1 ? 2 : 3);
`````

## Normalized

`````js filename=intro
let f = function () {};
const a = { x: 1 };
const tmpCallCallee = f;
let tmpCalleeParam = undefined;
const tmpBinLhs = a.x;
const tmpIfTest = tmpBinLhs === 1;
if (tmpIfTest) {
  tmpCalleeParam = 2;
} else {
  tmpCalleeParam = 3;
}
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const a = { x: 1 };
a.x;
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
