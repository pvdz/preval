# Preval test case

# unobservable_ops_func.md

> While > Unobservable ops func
>
> A static operation that can not be observed inside the loop and is not depended on the loop count should be moved out.

#TODO

## Input

`````js filename=intro
function f() {
  let s = $(10);
  let x = true;
  while (x) {
    const nowAssignable$3 = parseExpression(lexerFlags$285, astProp$181);
    s = s | 10; // This line can be moved outward since `s` can not be observed
    x = $(true);
  }
  $(s);
}
$(f());
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  let s = $(10);
  let x = true;
  while (x) {
    const nowAssignable$3 = parseExpression(lexerFlags$285, astProp$181);
    s = s | 10;
    x = $(true);
  }
  $(s);
};
$(f());
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  let s = $(10);
  let x = true;
  while (x) {
    const nowAssignable$3 = parseExpression(lexerFlags$285, astProp$181);
    s = s | 10;
    x = $(true);
  }
  $(s);
  return undefined;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = f();
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Output

`````js filename=intro
const f = function () {
  debugger;
  let s = $(10);
  let x = true;
  while (x) {
    parseExpression(lexerFlags$285, astProp$181);
    s = s | 10;
    x = $(true);
  }
  $(s);
  return undefined;
};
f();
$(undefined);
f();
$(undefined);
`````

## Globals

BAD@! Found 3 implicit global bindings:

parseExpression, lexerFlags$285, astProp$181

## Result

Should call `$` with:
 - 1: 10
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same