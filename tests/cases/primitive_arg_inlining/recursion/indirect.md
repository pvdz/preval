# Preval test case

# indirect.md

> Primitive arg inlining > Recursion > Indirect
>
> Recursion problems

## Input

`````js filename=intro
function f(n) {
  return g(n);
}
function g(n) {
  return h(n+1);
}
function h(n) {
  if ($(n) > 1000) return n;
  return f(n);
}
$(f(0));
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  let n = $$0;
  debugger;
  return g(n);
};
let g = function ($$0) {
  let n$1 = $$0;
  debugger;
  return h(n$1 + 1);
};
let h = function ($$0) {
  let n$3 = $$0;
  debugger;
  if ($(n$3) > 1000) return n$3;
  return f(n$3);
};
$(f(0));
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  let n = $$0;
  debugger;
  const tmpReturnArg = g(n);
  return tmpReturnArg;
};
let g = function ($$0) {
  let n$1 = $$0;
  debugger;
  const tmpCallCallee = h;
  const tmpCalleeParam = n$1 + 1;
  const tmpReturnArg$1 = tmpCallCallee(tmpCalleeParam);
  return tmpReturnArg$1;
};
let h = function ($$0) {
  let n$3 = $$0;
  debugger;
  const tmpBinLhs = $(n$3);
  const tmpIfTest = tmpBinLhs > 1000;
  if (tmpIfTest) {
    return n$3;
  } else {
    const tmpReturnArg$3 = f(n$3);
    return tmpReturnArg$3;
  }
};
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = f(0);
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Output


`````js filename=intro
const g = function ($$0) {
  const n$1 = $$0;
  debugger;
  const tmpCalleeParam = n$1 + 1;
  const tmpBinLhs = $(tmpCalleeParam);
  const tmpIfTest = tmpBinLhs > 1000;
  if (tmpIfTest) {
    return tmpCalleeParam;
  } else {
    const tmpReturnArg$3 = g(tmpCalleeParam);
    return tmpReturnArg$3;
  }
};
const tmpCalleeParam$1 = g(0);
$(tmpCalleeParam$1);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function($$0 ) {
  const b = c;
  debugger;
  const d = b + 1;
  const e = $( d );
  const f = e > 1000;
  if (f) {
    return d;
  }
  else {
    const g = a( d );
    return g;
  }
};
const h = a( 0 );
$( h );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 3
 - 4: 4
 - 5: 5
 - 6: 6
 - 7: 7
 - 8: 8
 - 9: 9
 - 10: 10
 - 11: 11
 - 12: 12
 - 13: 13
 - 14: 14
 - 15: 15
 - 16: 16
 - 17: 17
 - 18: 18
 - 19: 19
 - 20: 20
 - 21: 21
 - 22: 22
 - 23: 23
 - 24: 24
 - 25: 25
 - 26: 26
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
