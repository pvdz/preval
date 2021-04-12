# Preval test case

# closure_uncond_assign.md

> Ssa > Closure uncond assign
>
> Can SSA because all reads in g happen after an unconditional assign

#TODO

## Input

`````js filename=intro
function f() {
  let x = undefined;
  let g = function() {
    x = function(){};
    $();
    $(x);
  }
  if ($) {
    g();
    return x;
  }
}
if ($) $(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  let x = undefined;
  let g = function () {
    debugger;
    x = function () {
      debugger;
    };
    $();
    $(x);
  };
  if ($) {
    g();
    return x;
  }
};
if ($) $(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  let x = undefined;
  let g = function () {
    debugger;
    x = function () {
      debugger;
    };
    $();
    $(x);
  };
  if ($) {
    g();
    return x;
  }
};
if ($) {
  const tmpCallCallee = $;
  const tmpCalleeParam = f();
  tmpCallCallee(tmpCalleeParam);
}
`````

## Output

`````js filename=intro
const tmpSSA_x = function () {
  debugger;
};
const f = function () {
  debugger;
  if ($) {
    $();
    $(tmpSSA_x);
    return tmpSSA_x;
  }
};
if ($) {
  const tmpCalleeParam = f();
  $(tmpCalleeParam);
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 
 - 2: '<function>'
 - 3: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
