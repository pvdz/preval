# Preval test case

# boolean_if_danger.md

> Spyless vars > Boolean if danger
>
> Boolean the condition

The problem is that there may be a spy that may be affected by moving a var decl. So it's very non-trivial.

#TODO

## Input

`````js filename=intro
function f(y) {
  const g = function(){ 
    return x;
  };
  const x = Boolean(y);
  if (y) {
    g(); // Oops. x is indirectly referenced so if we move the decl this call will TDZ up.
    return y;
  } else {
    return x;
  }
}
$(f($(1)));
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  let y = $$0;
  debugger;
  const g = function () {
    debugger;
    return x;
  };
  const x = Boolean(y);
  if (y) {
    g();
    return y;
  } else {
    return x;
  }
};
$(f($(1)));
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  let y = $$0;
  debugger;
  const g = function () {
    debugger;
    return x;
  };
  const x = Boolean(y);
  if (y) {
    g();
    return y;
  } else {
    return x;
  }
};
const tmpCallCallee = $;
const tmpCallCallee$1 = f;
const tmpCalleeParam$1 = $(1);
const tmpCalleeParam = tmpCallCallee$1(tmpCalleeParam$1);
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
const tmpCalleeParam$1 = $(1);
if (tmpCalleeParam$1) {
  $(tmpCalleeParam$1);
} else {
  $(false);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {
  $( a );
}
else {
  $( false );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
