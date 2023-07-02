# Preval test case

# the_case.md

> Assign hoisting > The case
>
> Abstraction of a real world pattern that I was trying to solve with this transform

#TODO

## Input

`````js filename=intro
function f(func) {
  // I want a,b,c to be turned into constants but they are blocked by the functions referring to them.
  let a = undefined;
  let b = undefined
  let c = undefined;
  const f = function(){ 
    if ($) $(a);
  }
  const g = function(){ 
    if ($) $(b);
  }
  const h = function(){ 
    if ($) $(c);
  }
  a = func(1);
  b = func(2);
  c = func(3);
  if ($) {
    f();
    g();
    h();
    return [a, b, c];
  }
}

if ($) $(f($));
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  let func = $$0;
  debugger;
  let a = undefined;
  let b = undefined;
  let c = undefined;
  const f$1 = function () {
    debugger;
    if ($) $(a);
  };
  const g = function () {
    debugger;
    if ($) $(b);
  };
  const h = function () {
    debugger;
    if ($) $(c);
  };
  a = func(1);
  b = func(2);
  c = func(3);
  if ($) {
    f$1();
    g();
    h();
    return [a, b, c];
  }
};
if ($) $(f($));
`````

## Normalized

`````js filename=intro
let f = function ($$0) {
  let func = $$0;
  debugger;
  let a = undefined;
  let b = undefined;
  let c = undefined;
  const f$1 = function () {
    debugger;
    if ($) {
      $(a);
      return undefined;
    } else {
      return undefined;
    }
  };
  const g = function () {
    debugger;
    if ($) {
      $(b);
      return undefined;
    } else {
      return undefined;
    }
  };
  const h = function () {
    debugger;
    if ($) {
      $(c);
      return undefined;
    } else {
      return undefined;
    }
  };
  a = func(1);
  b = func(2);
  c = func(3);
  if ($) {
    f$1();
    g();
    h();
    const tmpReturnArg = [a, b, c];
    return tmpReturnArg;
  } else {
    return undefined;
  }
};
if ($) {
  const tmpCallCallee = $;
  const tmpCalleeParam = f($);
  tmpCallCallee(tmpCalleeParam);
} else {
}
`````

## Output

`````js filename=intro
const f = function ($$0, $$1, $$2) {
  const tmpOutlinedParam = $$0;
  const tmpOutlinedParam$1 = $$1;
  const tmpOutlinedParam$2 = $$2;
  debugger;
  if ($) {
    $(tmpOutlinedParam);
    if ($) {
      $(tmpOutlinedParam$1);
      if ($) {
        $(tmpOutlinedParam$2);
      } else {
      }
    } else {
    }
    const tmpReturnArg = [tmpOutlinedParam, tmpOutlinedParam$1, tmpOutlinedParam$2];
    return tmpReturnArg;
  } else {
    return undefined;
  }
};
if ($) {
  const tmpSaooB = $(1);
  const tmpSaooB$1 = $(2);
  const tmpSaooB$2 = $(3);
  const tmpCalleeParam = f(tmpSaooB, tmpSaooB$1, tmpSaooB$2);
  $(tmpCalleeParam);
} else {
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 3
 - 4: 1
 - 5: 2
 - 6: 3
 - 7: [1, 2, 3]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
