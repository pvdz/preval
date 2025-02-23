# Preval test case

# closure_read_first.md

> Ssa > Closure read first
>
> Cannot SSA because a call to g() should affect the next call to g()

## Input

`````js filename=intro
function f() {
  let x = 1;
  let g = function() {
    $(x);
    if ($) {
      x = $(x + 1);
      $(x);
    }
  }
  g();
  g();
  $();
}
if ($) $(f());
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  let x = 1;
  let g = function () {
    debugger;
    $(x);
    if ($) {
      x = $(x + 1);
      $(x);
    }
  };
  g();
  g();
  $();
};
if ($) $(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  let x = 1;
  let g = function () {
    debugger;
    $(x);
    if ($) {
      const tmpCallCallee = $;
      const tmpCalleeParam = x + 1;
      x = tmpCallCallee(tmpCalleeParam);
      $(x);
      return undefined;
    } else {
      return undefined;
    }
  };
  g();
  g();
  $();
  return undefined;
};
if ($) {
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = f();
  tmpCallCallee$1(tmpCalleeParam$1);
} else {
}
`````

## Output


`````js filename=intro
const f /*:()=>*/ = function () {
  debugger;
  let x = 1;
  const g /*:()=>*/ = function () {
    debugger;
    $(x);
    if ($) {
      const tmpCalleeParam /*:number*/ = x + 1;
      x = $(tmpCalleeParam);
      $(x);
      return undefined;
    } else {
      return undefined;
    }
  };
  g();
  g();
  $();
  return undefined;
};
if ($) {
  f();
  $(undefined);
} else {
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  let b = 1;
  const c = function() {
    debugger;
    $( b );
    if ($) {
      const d = b + 1;
      b = $( d );
      $( b );
      return undefined;
    }
    else {
      return undefined;
    }
  };
  c();
  c();
  $();
  return undefined;
};
if ($) {
  a();
  $( undefined );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 2
 - 4: 2
 - 5: 3
 - 6: 3
 - 7: 
 - 8: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
