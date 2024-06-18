# Preval test case

# indirect_escape.md

> Expandos > Functions > Indirect escape
>
> This test should remind us that functions can be instantiated multiple times concurrently and that a single store for bindings will not suffice


## Input

`````js filename=intro
function g(a) {
  function f() {
    $(a, 'inner');
    return a
  }
  if ($) {
    f.foo = a;
    $(f.foo, 'init');
  }
  return function() {
    return f();
  }
}
$(g(1)(), 'outer');
$(g(2)(), 'outer');
$(g(3)(), 'outer');
$(g(4)(), 'outer');
`````

## Pre Normal


`````js filename=intro
let g = function ($$0) {
  let a = $$0;
  debugger;
  let f = function () {
    debugger;
    $(a, `inner`);
    return a;
  };
  if ($) {
    f.foo = a;
    $(f.foo, `init`);
  }
  return function () {
    debugger;
    return f();
  };
};
$(g(1)(), `outer`);
$(g(2)(), `outer`);
$(g(3)(), `outer`);
$(g(4)(), `outer`);
`````

## Normalized


`````js filename=intro
let g = function ($$0) {
  let a = $$0;
  debugger;
  let f = function () {
    debugger;
    $(a, `inner`);
    return a;
  };
  if ($) {
    f.foo = a;
    const tmpCallCallee = $;
    const tmpCalleeParam = f.foo;
    const tmpCalleeParam$1 = `init`;
    tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
  } else {
  }
  const tmpReturnArg = function () {
    debugger;
    const tmpReturnArg$1 = f();
    return tmpReturnArg$1;
  };
  return tmpReturnArg;
};
const tmpCallCallee$1 = $;
const tmpCallComplexCallee = g(1);
const tmpCalleeParam$3 = tmpCallComplexCallee();
const tmpCalleeParam$5 = `outer`;
tmpCallCallee$1(tmpCalleeParam$3, tmpCalleeParam$5);
const tmpCallCallee$3 = $;
const tmpCallComplexCallee$1 = g(2);
const tmpCalleeParam$7 = tmpCallComplexCallee$1();
const tmpCalleeParam$9 = `outer`;
tmpCallCallee$3(tmpCalleeParam$7, tmpCalleeParam$9);
const tmpCallCallee$5 = $;
const tmpCallComplexCallee$3 = g(3);
const tmpCalleeParam$11 = tmpCallComplexCallee$3();
const tmpCalleeParam$13 = `outer`;
tmpCallCallee$5(tmpCalleeParam$11, tmpCalleeParam$13);
const tmpCallCallee$7 = $;
const tmpCallComplexCallee$5 = g(4);
const tmpCalleeParam$15 = tmpCallComplexCallee$5();
const tmpCalleeParam$17 = `outer`;
tmpCallCallee$7(tmpCalleeParam$15, tmpCalleeParam$17);
`````

## Output


`````js filename=intro
const g = function ($$0) {
  const a = $$0;
  debugger;
  const f = function () {
    debugger;
    $(a, `inner`);
    return a;
  };
  if ($) {
    f.foo = a;
    const tmpCalleeParam = f.foo;
    $(tmpCalleeParam, `init`);
  } else {
  }
  const tmpReturnArg = function () {
    debugger;
    $(a, `inner`);
    return a;
  };
  return tmpReturnArg;
};
const tmpCallComplexCallee = g(1);
const tmpCalleeParam$3 = tmpCallComplexCallee();
$(tmpCalleeParam$3, `outer`);
const tmpCallComplexCallee$1 = g(2);
const tmpCalleeParam$7 = tmpCallComplexCallee$1();
$(tmpCalleeParam$7, `outer`);
const tmpCallComplexCallee$3 = g(3);
const tmpCalleeParam$11 = tmpCallComplexCallee$3();
$(tmpCalleeParam$11, `outer`);
const tmpCallComplexCallee$5 = g(4);
const tmpCalleeParam$15 = tmpCallComplexCallee$5();
$(tmpCalleeParam$15, `outer`);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function($$0 ) {
  const b = c;
  debugger;
  const d = function() {
    debugger;
    $( b, "inner" );
    return b;
  };
  if ($) {
    d.foo = b;
    const e = d.foo;
    $( e, "init" );
  }
  const f = function() {
    debugger;
    $( b, "inner" );
    return b;
  };
  return f;
};
const g = a( 1 );
const h = g();
$( h, "outer" );
const i = a( 2 );
const j = i();
$( j, "outer" );
const k = a( 3 );
const l = k();
$( l, "outer" );
const m = a( 4 );
const n = m();
$( n, "outer" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1, 'init'
 - 2: 1, 'inner'
 - 3: 1, 'outer'
 - 4: 2, 'init'
 - 5: 2, 'inner'
 - 6: 2, 'outer'
 - 7: 3, 'init'
 - 8: 3, 'inner'
 - 9: 3, 'outer'
 - 10: 4, 'init'
 - 11: 4, 'inner'
 - 12: 4, 'outer'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
