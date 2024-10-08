# Preval test case

# decl_recursive.md

> Ssa > Decl recursive
>
> A recursive function that is then replaced with another value (why would you do this, I dunno)

## Input

`````js filename=intro
function f() {
  let g = function (x) {
    if (x) {
      g($(false));
      return $(100);
    }
  };
  g = g($(true));
}
if ($) f();
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  let g = function ($$0) {
    let x = $$0;
    debugger;
    if (x) {
      g($(false));
      return $(100);
    }
  };
  g = g($(true));
};
if ($) f();
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  let g = function ($$0) {
    let x = $$0;
    debugger;
    if (x) {
      const tmpCallCallee = g;
      const tmpCalleeParam = $(false);
      tmpCallCallee(tmpCalleeParam);
      const tmpReturnArg = $(100);
      return tmpReturnArg;
    } else {
      return undefined;
    }
  };
  const tmpCallCallee$1 = g;
  const tmpCalleeParam$1 = $(true);
  g = tmpCallCallee$1(tmpCalleeParam$1);
  return undefined;
};
if ($) {
  f();
} else {
}
`````

## Output


`````js filename=intro
if ($) {
  let g /*:(unknown)=>*/ = function ($$0) {
    const x = $$0;
    debugger;
    if (x) {
      const tmpCallCallee = g;
      const tmpCalleeParam = $(false);
      tmpCallCallee(tmpCalleeParam);
      const tmpReturnArg = $(100);
      return tmpReturnArg;
    } else {
      return undefined;
    }
  };
  const tmpCallCallee$1 = g;
  const tmpCalleeParam$1 = $(true);
  g = tmpCallCallee$1(tmpCalleeParam$1);
} else {
}
`````

## PST Output

With rename=true

`````js filename=intro
if ($) {
  let a = function($$0 ) {
    const b = c;
    debugger;
    if (b) {
      const d = a;
      const e = $( false );
      d( e );
      const f = $( 100 );
      return f;
    }
    else {
      return undefined;
    }
  };
  const g = a;
  const h = $( true );
  a = g( h );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - 2: false
 - 3: 100
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
