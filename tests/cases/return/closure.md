# Preval test case

# closure.md

> Return > Closure
>
> If a function returns a closure that is accessible from the caller, the closure should be outlined...

## Input

`````js filename=intro
function f() {
  let x = 0;
  function g() {
    ++x;
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
    ++x;
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
    x = x + 1;
    return x;
  };
  let x = 0;
  const tmpCallCallee = $;
  const tmpCalleeParam = g();
  tmpCallCallee(tmpCalleeParam);
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = g();
  tmpCallCallee$1(tmpCalleeParam$1);
  const tmpCallCallee$3 = $;
  const tmpCalleeParam$3 = g();
  tmpCallCallee$3(tmpCalleeParam$3);
  return undefined;
};
const tmpCallCallee$5 = $;
const tmpCalleeParam$5 = f();
tmpCallCallee$5(tmpCalleeParam$5);
$(f);
`````

## Output


`````js filename=intro
const f /*:()=>*/ = function () {
  debugger;
  $(1);
  $(2);
  $(3);
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
  $( 1 );
  $( 2 );
  $( 3 );
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
 - 2: 2
 - 3: 3
 - 4: undefined
 - 5: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
