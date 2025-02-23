# Preval test case

# decl_write_read_closure_reversed.md

> Ssa > Decl write read closure reversed
>
> Trying to punch a hole into the existing algo because I think it's broken

## Input

`````js filename=intro
function f() {
  if ($) { // Prevent normalization from inlining the func immediately
    let x = 5;
    const g = function(){
      if ($) x = 10;
    };
    g();
    if ($) x = 20;
    return x;
  }
}
if ($) $(f());
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  if ($) {
    let x = 5;
    const g = function () {
      debugger;
      if ($) x = 10;
    };
    g();
    if ($) x = 20;
    return x;
  }
};
if ($) $(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  if ($) {
    let x = 5;
    const g = function () {
      debugger;
      if ($) {
        x = 10;
        return undefined;
      } else {
        return undefined;
      }
    };
    g();
    if ($) {
      x = 20;
      return x;
    } else {
      return x;
    }
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
if ($) {
  let tmpCalleeParam /*:unknown*/ = undefined;
  if ($) {
    let x /*:number*/ = 5;
    if ($) {
      x = 10;
    } else {
    }
    if ($) {
      tmpCalleeParam = 20;
    } else {
      tmpCalleeParam = x;
    }
  } else {
  }
  $(tmpCalleeParam);
} else {
}
`````

## PST Output

With rename=true

`````js filename=intro
if ($) {
  let a = undefined;
  if ($) {
    let b = 5;
    if ($) {
      b = 10;
    }
    if ($) {
      a = 20;
    }
    else {
      a = b;
    }
  }
  $( a );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 20
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
