# Preval test case

# nested.md

> Expandos > Functions > Nested
>
> Basic expando stuff

## Input

`````js filename=intro
function g(a) {
  // Nested functions should be ignored for now
  function f() {
    $(a);
  }
  if ($) {
    f.foo = a;
    $(f.foo);
  }
}
g(1);
g(2);
g(3);
g(4);
`````

## Pre Normal


`````js filename=intro
let g = function ($$0) {
  let a = $$0;
  debugger;
  let f = function () {
    debugger;
    $(a);
  };
  if ($) {
    f.foo = a;
    $(f.foo);
  }
};
g(1);
g(2);
g(3);
g(4);
`````

## Normalized


`````js filename=intro
let g = function ($$0) {
  let a = $$0;
  debugger;
  let f = function () {
    debugger;
    $(a);
    return undefined;
  };
  if ($) {
    f.foo = a;
    const tmpCallCallee = $;
    const tmpCalleeParam = f.foo;
    tmpCallCallee(tmpCalleeParam);
    return undefined;
  } else {
    return undefined;
  }
};
g(1);
g(2);
g(3);
g(4);
`````

## Output


`````js filename=intro
const g /*:(number)=>undefined*/ = function ($$0) {
  const a /*:number*/ = $$0;
  debugger;
  const f /*:()=>undefined*/ = function () {
    debugger;
    $(a);
    return undefined;
  };
  if ($) {
    f.foo = a;
    const tmpCalleeParam = f.foo;
    $(tmpCalleeParam);
    return undefined;
  } else {
    return undefined;
  }
};
g(1);
g(2);
g(3);
g(4);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function($$0 ) {
  const b = c;
  debugger;
  const d = function() {
    debugger;
    $( b );
    return undefined;
  };
  if ($) {
    d.foo = b;
    const e = d.foo;
    $( e );
    return undefined;
  }
  else {
    return undefined;
  }
};
a( 1 );
a( 2 );
a( 3 );
a( 4 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 3
 - 4: 4
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
