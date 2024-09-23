# Preval test case

# closure_to_catch.md

> Static arg ops > Assignment > Closure to catch
>
>

## Input

`````js filename=intro
try {
  $();
} catch (e) {
  let a = $();
  const f = function() {
    e = a;
    $('filler');
    $('more filler');
    return
  }
  $(f(1, 2));
  $(f(3, 4));
}
`````

## Pre Normal


`````js filename=intro
try {
  $();
} catch (e) {
  let a = $();
  const f = function () {
    debugger;
    e = a;
    $(`filler`);
    $(`more filler`);
    return;
  };
  $(f(1, 2));
  $(f(3, 4));
}
`````

## Normalized


`````js filename=intro
try {
  $();
} catch (e) {
  let a = $();
  const f = function () {
    debugger;
    e = a;
    $(`filler`);
    $(`more filler`);
    return undefined;
  };
  const tmpCallCallee = $;
  const tmpCalleeParam = f(1, 2);
  tmpCallCallee(tmpCalleeParam);
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = f(3, 4);
  tmpCallCallee$1(tmpCalleeParam$1);
}
`````

## Output


`````js filename=intro
try {
  $();
} catch (e) {
  const a = $();
  const f /*:()=>undefined*/ = function () {
    debugger;
    e = a;
    $(`filler`);
    $(`more filler`);
    return undefined;
  };
  f();
  $(undefined);
  f();
  $(undefined);
}
`````

## PST Output

With rename=true

`````js filename=intro
try {
  $();
}
catch (a) {
  const b = $();
  const c = function() {
    debugger;
    a = b;
    $( "filler" );
    $( "more filler" );
    return undefined;
  };
  c();
  $( undefined );
  c();
  $( undefined );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
