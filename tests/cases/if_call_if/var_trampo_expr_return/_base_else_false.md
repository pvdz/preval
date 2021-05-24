# Preval test case

# _base_else_false.md

> If call if > Var trampo expr return > Base else false
>
> The if-call-if pattern is common and is probably a result from how we transform `||` and `&&`

#TODO

## Input

`````js filename=intro
function outer() {
  let x = $(0);
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
    return f();
  } else {
    x = $(2);
    return f();
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
      $('inner if', x);
      return;
    } else {
      $('inner else', x);
      return;
    }
  };
  if (x) {
    return f();
  } else {
    x = $(2);
    return f();
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
      $('inner if', x);
      return undefined;
    } else {
      $('inner else', x);
      return undefined;
    }
  };
  if (x) {
    const tmpReturnArg = f();
    return tmpReturnArg;
  } else {
    x = $(2);
    const tmpReturnArg$1 = f();
    return tmpReturnArg$1;
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
    $('inner if', x);
  } else {
    const tmpClusterSSA_x = $(2);
    if (tmpClusterSSA_x) {
      $('inner if', tmpClusterSSA_x);
    } else {
      $('inner else', tmpClusterSSA_x);
    }
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
 - 2: 2
 - 3: 'inner if', 2
 - 4: undefined, 'outer'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
