# Preval test case

# decl_write_read_closure.md

> Ssa > Decl write read closure
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
    x = 20;
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
  if ($) {
    let x = 5;
    const g = function () {
      debugger;
      if ($) x = 10;
    };
    x = 20;
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
    x = 20;
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
if ($) {
  $(10);
} else {
}
`````

## PST Output

With rename=true

`````js filename=intro
if ($) {
  $( 10 );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
