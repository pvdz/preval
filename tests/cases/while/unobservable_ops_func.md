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
  while (true) {
    if (x) {
      const nowAssignable$3 = parseExpression(lexerFlags$285, astProp$181);
      s = s | 10;
      x = $(true);
    } else {
      break;
    }
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
  const s = $(10);
  parseExpression(lexerFlags$285, astProp$181);
  let tmpClusterSSA_s = s | 10;
  const tmpClusterSSA_x = $(true);
  if (tmpClusterSSA_x) {
    parseExpression(lexerFlags$285, astProp$181);
    tmpClusterSSA_s = tmpClusterSSA_s | 10;
    let tmpClusterSSA_x$1 = $(true);
    while ($LOOP_UNROLL_9) {
      if (tmpClusterSSA_x$1) {
        parseExpression(lexerFlags$285, astProp$181);
        tmpClusterSSA_s = tmpClusterSSA_s | 10;
        tmpClusterSSA_x$1 = $(true);
      } else {
        break;
      }
    }
  } else {
  }
  $(tmpClusterSSA_s);
  return undefined;
};
f();
$(undefined);
f();
$(undefined);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  const b = $( 10 );
  parseExpression( lexerFlags$285, astProp$181 );
  let c = b | 10;
  const d = $( true );
  if (d) {
    parseExpression( lexerFlags$285, astProp$181 );
    c = c | 10;
    let e = $( true );
    while ($LOOP_UNROLL_9) {
      if (e) {
        parseExpression( lexerFlags$285, astProp$181 );
        c = c | 10;
        e = $( true );
      }
      else {
        break;
      }
    }
  }
  $( c );
  return undefined;
};
a();
$( undefined );
a();
$( undefined );
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
