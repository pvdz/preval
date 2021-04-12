# Preval test case

# closure_read_first.md

> Ssa > Closure read first
>
> Cannot SSA because a call to g() should affect the next call to g()

#TODO

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
    }
  };
  g();
  g();
  $();
};
if ($) {
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = f();
  tmpCallCallee$1(tmpCalleeParam$1);
}
`````

## Output

`````js filename=intro
if ($) {
  let x = 1;
  const g = function () {
    debugger;
    $(x);
    if ($) {
      const tmpCalleeParam = x + 1;
      x = $(tmpCalleeParam);
      $(x);
    }
  };
  g();
  g();
  $();
  $(undefined);
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
