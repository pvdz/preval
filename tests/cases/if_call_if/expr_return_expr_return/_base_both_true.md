# Preval test case

# _base_both_true.md

> If call if > Expr return expr return > Base both true
>
> The if-call-if pattern is common and is probably a result from how we transform `||` and `&&`

#TODO

## Input

`````js filename=intro
function outer() {
  let x = $(1);
  const f = function(){
    if (x) {
      $('inner if', x);
      return;
    } else {
      $('inner else', x);
      return;
    }
  };
  if (x) {
    x = $(2);
    f();
    return;
  } else {
    x = false;
    f();
    return;
  }
}
if ($) $(outer(), 'outer');
`````

## Pre Normal

`````js filename=intro
let outer = function () {
  debugger;
  let x = $(1);
  const f = function () {
    debugger;
    if (x) {
      $('inner if', x);
      return;
    } else {
      $('inner else', x);
      return;
    }
  };
  if (x) {
    x = $(2);
    f();
    return;
  } else {
    x = false;
    f();
    return;
  }
};
if ($) $(outer(), 'outer');
`````

## Normalized

`````js filename=intro
let outer = function () {
  debugger;
  let x = $(1);
  const f = function () {
    debugger;
    if (x) {
      $('inner if', x);
      return undefined;
    } else {
      $('inner else', x);
      return undefined;
    }
  };
  if (x) {
    x = $(2);
    f();
    return undefined;
  } else {
    x = false;
    f();
    return undefined;
  }
};
if ($) {
  const tmpCallCallee = $;
  const tmpCalleeParam = outer();
  const tmpCalleeParam$1 = 'outer';
  tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
} else {
}
`````

## Output

`````js filename=intro
if ($) {
  const x = $(1);
  if (x) {
    const tmpClusterSSA_x = $(2);
    if (tmpClusterSSA_x) {
      $('inner if', tmpClusterSSA_x);
    } else {
      $('inner else', tmpClusterSSA_x);
    }
  } else {
    $('inner else', false);
  }
  $(undefined, 'outer');
} else {
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 'inner if', 2
 - 4: undefined, 'outer'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
