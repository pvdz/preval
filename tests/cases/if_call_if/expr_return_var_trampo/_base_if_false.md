# Preval test case

# _base_if_false.md

> If call if > Expr return var trampo > Base if false
>
> The if-call-if pattern is common and is probably a result from how we transform `||` and `&&`

#TODO

## Input

`````js filename=intro
function outer() {
  let x = $(0);
  const f = function(){
    if (x) {
      return $('inner if', x);
    } else {
      return $('inner else', x);
    }
  };
  if (x) {
    x = $(2);
    f();
    return;
  } else {
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
  let x = $(0);
  const f = function () {
    debugger;
    if (x) {
      return $('inner if', x);
    } else {
      return $('inner else', x);
    }
  };
  if (x) {
    x = $(2);
    f();
    return;
  } else {
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
  let x = $(0);
  const f = function () {
    debugger;
    if (x) {
      const tmpReturnArg = $('inner if', x);
      return tmpReturnArg;
    } else {
      const tmpReturnArg$1 = $('inner else', x);
      return tmpReturnArg$1;
    }
  };
  if (x) {
    x = $(2);
    f();
    return undefined;
  } else {
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
  const x = $(0);
  if (x) {
    const tmpClusterSSA_x = $(2);
    if (tmpClusterSSA_x) {
      $('inner if', tmpClusterSSA_x);
    } else {
      $('inner else', tmpClusterSSA_x);
    }
  } else {
    $('inner else', x);
  }
  $(undefined, 'outer');
} else {
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: 'inner else', 0
 - 3: undefined, 'outer'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
