# Preval test case

# minimal.md

> regressions > infinite_loop_due_to_hoisting > minimal
>
> Minimal test case for an infinite loop at some point. The problem was hoisting triggering "changes" when there weren't any.

#TODO

## Input

`````js filename=intro
function g() {}
f(a.x === 1 ? 2 : 3);
`````

## Normalized

`````js filename=intro
function g() {}
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
function g() {}
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

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Normalized calls: Same

Final output calls: Same
