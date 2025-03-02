# Preval test case

# catch_to_closure.md

> Static arg ops > Assignment > Catch to closure
>
>

## Input

`````js filename=intro
try {
  $();
} catch (e) {
  let a = $(1);
  const f = function() {
    a = e;
    $('filler');
    $('more filler');
    return
  }
  $(f(1, 2));
  $(f(3, 4));
  $(a);
}
`````

## Pre Normal


`````js filename=intro
try {
  $();
} catch (e) {
  let a = $(1);
  const f = function () {
    debugger;
    a = e;
    $(`filler`);
    $(`more filler`);
    return;
  };
  $(f(1, 2));
  $(f(3, 4));
  $(a);
}
`````

## Normalized


`````js filename=intro
try {
  $();
} catch (e) {
  let a = $(1);
  const f = function () {
    debugger;
    a = e;
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
  $(a);
}
`````

## Output


`````js filename=intro
try {
  $();
} catch (e) {
  let a /*:unknown*/ = $(1);
  const f /*:()=>undefined*/ = function () {
    debugger;
    a = e;
    $(`filler`);
    $(`more filler`);
    return undefined;
  };
  f();
  $(undefined);
  f();
  $(undefined);
  $(a);
}
`````

## PST Output

With rename=true

`````js filename=intro
try {
  $();
}
catch (a) {
  let b = $( 1 );
  const c = function() {
    debugger;
    b = a;
    $( "filler" );
    $( "more filler" );
    return undefined;
  };
  c();
  $( undefined );
  c();
  $( undefined );
  $( b );
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
