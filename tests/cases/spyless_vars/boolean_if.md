# Preval test case

# boolean_if.md

> Spyless vars > Boolean if
>
> Boolean the condition

## Input

`````js filename=intro
function f(y) {
  const x = Boolean(y);
  if (y) {
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
  const x = Boolean(y);
  if (y) {
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
  const x = Boolean(y);
  if (y) {
    return y;
  } else {
    return x;
  }
};
const tmpCallCallee = f;
const tmpCalleeParam$1 = $(1);
const tmpCalleeParam = tmpCallCallee(tmpCalleeParam$1);
$(tmpCalleeParam);
`````

## Output


`````js filename=intro
const tmpCalleeParam$1 /*:unknown*/ = $(1);
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
