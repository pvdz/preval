# Preval test case

# param_to_catch.md

> Static arg ops > Assignment > Param to catch
>
> 

## Input

`````js filename=intro
try {
  $();
} catch (e) {
  const f = function(a, b) {
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
  const f = function ($$0, $$1) {
    let a = $$0;
    let b = $$1;
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
  const f = function ($$0, $$1) {
    let a = $$0;
    let b = $$1;
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
  const f = function ($$0) {
    const a = $$0;
    debugger;
    e = a;
    $(`filler`);
    $(`more filler`);
    return undefined;
  };
  f(1);
  $(undefined);
  f(3);
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
  const b = function($$0 ) {
    const c = d;
    debugger;
    a = c;
    $( "filler" );
    $( "more filler" );
    return undefined;
  };
  b( 1 );
  $( undefined );
  b( 3 );
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
