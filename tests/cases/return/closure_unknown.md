# Preval test case

# closure_unknown.md

> Return > Closure unknown
>
> If a function returns a closure that is accessible from the caller, the closure should be outlined...

This variant sets the closure to an unpredictable value to prevent optimization :p

## Input

`````js filename=intro
function f() {
  let x = 0;
  function g() {
    x = $(x + 1);
    return x;
  }

  $(g());
  $(g());
  $(g());
}
$(f())
$(f);
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  let g = function () {
    debugger;
    x = $(x + 1);
    return x;
  };
  let x = 0;
  $(g());
  $(g());
  $(g());
};
$(f());
$(f);
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  let g = function () {
    debugger;
    const tmpCallCallee = $;
    const tmpCalleeParam = x + 1;
    x = tmpCallCallee(tmpCalleeParam);
    return x;
  };
  let x = 0;
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = g();
  tmpCallCallee$1(tmpCalleeParam$1);
  const tmpCallCallee$3 = $;
  const tmpCalleeParam$3 = g();
  tmpCallCallee$3(tmpCalleeParam$3);
  const tmpCallCallee$5 = $;
  const tmpCalleeParam$5 = g();
  tmpCallCallee$5(tmpCalleeParam$5);
  return undefined;
};
const tmpCallCallee$7 = $;
const tmpCalleeParam$7 = f();
tmpCallCallee$7(tmpCalleeParam$7);
$(f);
`````

## Output


`````js filename=intro
const f /*:()=>*/ = function () {
  debugger;
  const g /*:()=>*/ = function () {
    debugger;
    const tmpCalleeParam = x + 1;
    x = $(tmpCalleeParam);
    return undefined;
  };
  let x = 0;
  g();
  $(x);
  g();
  $(x);
  g();
  $(x);
  return undefined;
};
f();
$(undefined);
$(f);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  const b = function() {
    debugger;
    const c = d + 1;
    d = $( c );
    return undefined;
  };
  let d = 0;
  b();
  $( d );
  b();
  $( d );
  b();
  $( d );
  return undefined;
};
a();
$( undefined );
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 2
 - 4: 2
 - 5: 3
 - 6: 3
 - 7: undefined
 - 8: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
