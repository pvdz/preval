# Preval test case

# identical_return_minus_infinity.md

> Normalize > If > Identical return minus infinity
>
> If both branches just return undefined then the if is redundant

This is an artifact that can happen during normalization

#TODO

## Input

`````js filename=intro
const foo = $();
function f() {
  if ($) {
    return -Infinity;
  } else {
    return -Infinity;
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
    return -Infinity;
  } else {
    return -Infinity;
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
  return -Infinity;
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
  $(-Infinity);
} else {
}
`````

## PST Output

With rename=true

`````js filename=intro
$();
if ($) {
  $( -Infinity );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 
 - 2: -Infinity
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
