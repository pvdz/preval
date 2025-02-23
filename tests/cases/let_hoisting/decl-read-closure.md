# Preval test case

# decl-read-closure.md

> Let hoisting > Decl-read-closure
>
> This case has a ref following the decl in the same scope

## Input

`````js filename=intro
function f() {
    let x = $;
    const g = function(){
      if ($) {
        x = $(2);
        $(x);
      }
    };
    if (x) {
      g();
    }
}
if ($) f();
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  let x = $;
  const g = function () {
    debugger;
    if ($) {
      x = $(2);
      $(x);
    }
  };
  if (x) {
    g();
  }
};
if ($) f();
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  let x = $;
  const g = function () {
    debugger;
    if ($) {
      x = $(2);
      $(x);
      return undefined;
    } else {
      return undefined;
    }
  };
  if (x) {
    g();
    return undefined;
  } else {
    return undefined;
  }
};
if ($) {
  f();
} else {
}
`````

## Output


`````js filename=intro
if ($) {
  const tmpClusterSSA_tmpssa2_x /*:unknown*/ = $(2);
  $(tmpClusterSSA_tmpssa2_x);
} else {
}
`````

## PST Output

With rename=true

`````js filename=intro
if ($) {
  const a = $( 2 );
  $( a );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - 2: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
