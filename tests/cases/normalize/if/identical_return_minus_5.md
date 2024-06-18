# Preval test case

# identical_return_minus_5.md

> Normalize > If > Identical return minus 5
>
> If both branches just return undefined then the if is redundant

This is an artifact that can happen during normalization

## Input

`````js filename=intro
const foo = $();
function f() {
  if ($) {
    return -5;
  } else {
    return -5;
  }
}
function g() {
  if ($) return f();
}
if ($) $(g());
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  if ($) {
    return -5;
  } else {
    return -5;
  }
};
let g = function () {
  debugger;
  if ($) return f();
};
const foo = $();
if ($) $(g());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  return -5;
};
let g = function () {
  debugger;
  if ($) {
    const tmpReturnArg = f();
    return tmpReturnArg;
  } else {
    return undefined;
  }
};
const foo = $();
if ($) {
  const tmpCallCallee = $;
  const tmpCalleeParam = g();
  tmpCallCallee(tmpCalleeParam);
} else {
}
`````

## Output


`````js filename=intro
$();
if ($) {
  $(-5);
} else {
}
`````

## PST Output

With rename=true

`````js filename=intro
$();
if ($) {
  $( -5 );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 
 - 2: -5
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
