# Preval test case

# var_shadow_problem.md

> Function promo > Var shadow problem
>
> In this case a closure reference was also bound inside the function. Our algorithm must make sure not to get confused by this.

The algorithm was indiscriminately finding all references and bindings inside a function and cross referencing them. But it should be more aware of lexical binding boundaries inside the function as well.

#TODO

## Input

`````js filename=intro
function f() {
  let x = $(1);
  function g() {
    function h() {
      // This binding may lead to the outer reference of x to be considered local rather than closure
      const x = $();
      if ($) $(x, 'keep me inner local');
    }
    if ($) {
      $(x, 'keep me a closure');
      h();
    }
  }
  if ($) {
    g();
    $(x, 'keep me outer local')
  }
}
if ($) f();
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  let g = function () {
    debugger;
    let h = function () {
      debugger;
      const x$1 = $();
      if ($) $(x$1, 'keep me inner local');
    };
    if ($) {
      $(x, 'keep me a closure');
      h();
    }
  };
  let x = $(1);
  if ($) {
    g();
    $(x, 'keep me outer local');
  }
};
if ($) f();
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  let g = function () {
    debugger;
    let h = function () {
      debugger;
      const x$1 = $();
      if ($) {
        $(x$1, 'keep me inner local');
      } else {
      }
    };
    if ($) {
      $(x, 'keep me a closure');
      h();
    } else {
    }
  };
  let x = $(1);
  if ($) {
    g();
    $(x, 'keep me outer local');
  } else {
  }
};
if ($) {
  f();
} else {
}
`````

## Output

`````js filename=intro
const h = function () {
  debugger;
  const x$1 = $();
  if ($) {
    $(x$1, 'keep me inner local');
  } else {
  }
};
const f = function () {
  debugger;
  const g = function () {
    debugger;
    if ($) {
      $(x, 'keep me a closure');
      h();
    } else {
    }
  };
  const x = $(1);
  if ($) {
    g();
    $(x, 'keep me outer local');
  } else {
  }
};
if ($) {
  f();
} else {
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1, 'keep me a closure'
 - 3: 
 - 4: undefined, 'keep me inner local'
 - 5: 1, 'keep me outer local'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
