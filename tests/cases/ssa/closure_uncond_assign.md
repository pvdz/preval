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
      return undefined;
    };
    $();
    $(x);
    return undefined;
  };
  if ($) {
    g();
    return x;
  } else {
    return undefined;
  }
};
if ($) {
  const tmpCallCallee = $;
  const tmpCalleeParam = f();
  tmpCallCallee(tmpCalleeParam);
} else {
}
`````

## Output

`````js filename=intro
const tmpClusterSSA_x = function () {
  debugger;
  return undefined;
};
const f = function () {
  debugger;
  if ($) {
    $();
    $(tmpClusterSSA_x);
    return tmpClusterSSA_x;
  } else {
    return undefined;
  }
};
if ($) {
  const tmpCalleeParam = f();
  $(tmpCalleeParam);
} else {
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  return undefined;
},;
const b = function() {
  debugger;
  if ($) {
    $();
    $( a );
    return a;
  }
  else {
    return undefined;
  }
},;
if ($) {
  const c = b();
  $( c );
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
