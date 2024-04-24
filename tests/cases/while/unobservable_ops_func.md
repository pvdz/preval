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
const tmpAfterLabel = function ($$0, $$1, $$2) {
  let s$4 = $$0;
  let x$2 = $$1;
  const $tmpLoopUnrollCheck$1 = $$2;
  debugger;
  if ($tmpLoopUnrollCheck$1) {
    while ($LOOP_UNROLL_9) {
      if (x$2) {
        parseExpression(lexerFlags$285, astProp$181);
        s$4 = s$4 | 10;
        x$2 = $(true);
      } else {
        break;
      }
    }
  } else {
  }
  $(s$4);
  return undefined;
};
const f = function () {
  debugger;
  const s = $(10);
  parseExpression(lexerFlags$285, astProp$181);
  const tmpSSA_s = s | 10;
  const tmpSSA_x = $(true);
  let s$1 = tmpSSA_s;
  let x$1 = tmpSSA_x;
  if (tmpSSA_x) {
    parseExpression(lexerFlags$285, astProp$181);
    s$1 = tmpSSA_s | 10;
    x$1 = $(true);
    tmpAfterLabel(s$1, x$1, true);
    return undefined;
  } else {
    tmpAfterLabel(s$1, x$1, false);
    return undefined;
  }
};
f();
$(undefined);
f();
$(undefined);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function($$0,$$1,$$2 ) {
  let b = c;
  let d = e;
  const f = g;
  debugger;
  if (f) {
    while ($LOOP_UNROLL_9) {
      if (d) {
        parseExpression( lexerFlags$285, astProp$181 );
        b = b | 10;
        d = $( true );
      }
      else {
        break;
      }
    }
  }
  $( b );
  return undefined;
};
const h = function() {
  debugger;
  const i = $( 10 );
  parseExpression( lexerFlags$285, astProp$181 );
  const j = i | 10;
  const k = $( true );
  let l = j;
  let m = k;
  if (k) {
    parseExpression( lexerFlags$285, astProp$181 );
    l = j | 10;
    m = $( true );
    a( l, m, true );
    return undefined;
  }
  else {
    a( l, m, false );
    return undefined;
  }
};
h();
$( undefined );
h();
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
