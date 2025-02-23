# Preval test case

# decl_recursive_second_attempt.md

> Ssa > Decl recursive second attempt
>
> A recursive function that is then replaced with another value (why would you do this, I dunno)

## Input

`````js filename=intro
const T = $(true);
const F = $(false);
function f() {
  let g = function (x) {
    if (x) {
      g(F);
      return $(100);
    }
  };
  // The idea is that if `g` above is SSA'd then the name would change. But if the name changes then
  // the reference is no longer accessible.
  g = g(T);
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
      g(F);
      return $(100);
    }
  };
  g = g(T);
};
const T = $(true);
const F = $(false);
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
      g(F);
      const tmpReturnArg = $(100);
      return tmpReturnArg;
    } else {
      return undefined;
    }
  };
  g = g(T);
  return undefined;
};
const T = $(true);
const F = $(false);
if ($) {
  f();
} else {
}
`````

## Output


`````js filename=intro
const f /*:()=>undefined*/ = function () {
  debugger;
  let g /*:(unknown)=>*/ = function ($$0) {
    const x /*:unknown*/ = $$0;
    debugger;
    if (x) {
      g(F);
      const tmpReturnArg /*:unknown*/ = $(100);
      return tmpReturnArg;
    } else {
      return undefined;
    }
  };
  g = g(T);
  return undefined;
};
const T /*:unknown*/ = $(true);
const F /*:unknown*/ = $(false);
if ($) {
  f();
} else {
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  let b = function($$0 ) {
    const c = $$0;
    debugger;
    if (c) {
      b( d );
      const e = $( 100 );
      return e;
    }
    else {
      return undefined;
    }
  };
  b = b( f );
  return undefined;
};
const f = $( true );
const d = $( false );
if ($) {
  a();
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
