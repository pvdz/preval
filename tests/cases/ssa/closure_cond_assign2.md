# Preval test case

# closure_cond_assign2.md

> Ssa > Closure cond assign2
>
> Cannot SSA because g(true) g(false) should not have the same value for x

Regression; x was ending up an implicit global

## Input

`````js filename=intro
function f() {
  let x = 0;
  let g = function(t) {
    if (t) {
      x = x + 1;
    }
    $(x);
    $();
  }
  g(true);
  g(false);
  g(true);
  g(false);
  g(false);
  g(true);
  g(true);
}
if ($) $(f());
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  let x = 0;
  let g = function ($$0) {
    let t = $$0;
    debugger;
    if (t) {
      x = x + 1;
    }
    $(x);
    $();
  };
  g(true);
  g(false);
  g(true);
  g(false);
  g(false);
  g(true);
  g(true);
};
if ($) $(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  let x = 0;
  let g = function ($$0) {
    let t = $$0;
    debugger;
    if (t) {
      x = x + 1;
    } else {
    }
    $(x);
    $();
    return undefined;
  };
  g(true);
  g(false);
  g(true);
  g(false);
  g(false);
  g(true);
  g(true);
  return undefined;
};
if ($) {
  const tmpCalleeParam = f();
  $(tmpCalleeParam);
} else {
}
`````

## Output


`````js filename=intro
if ($) {
  let x /*:number*/ = 0;
  const g /*:(boolean)=>undefined*/ = function ($$0) {
    const t /*:boolean*/ = $$0;
    debugger;
    if (t) {
      x = x + 1;
      $(x);
    } else {
      $(x);
    }
    $();
    return undefined;
  };
  g(true);
  g(false);
  g(true);
  g(false);
  g(false);
  g(true);
  g(true);
  $(undefined);
} else {
}
`````

## PST Output

With rename=true

`````js filename=intro
if ($) {
  let a = 0;
  const b = function($$0 ) {
    const c = $$0;
    debugger;
    if (c) {
      a = a + 1;
      $( a );
    }
    else {
      $( a );
    }
    $();
    return undefined;
  };
  b( true );
  b( false );
  b( true );
  b( false );
  b( false );
  b( true );
  b( true );
  $( undefined );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 
 - 3: 1
 - 4: 
 - 5: 2
 - 6: 
 - 7: 2
 - 8: 
 - 9: 2
 - 10: 
 - 11: 3
 - 12: 
 - 13: 4
 - 14: 
 - 15: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
