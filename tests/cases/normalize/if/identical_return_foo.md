# Preval test case

# identical_return_foo.md

> Normalize > If > Identical return foo
>
> If both branches just return undefined then the if is redundant

This is an artifact that can happen during normalization

#TODO

## Input

`````js filename=intro
const foo = $();
function f() {
  if ($) {
    return foo;
  } else {
    return foo;
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
    return foo;
  } else {
    return foo;
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
  return foo;
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
const g = function () {
  debugger;
  if ($) {
    return foo;
  } else {
    return undefined;
  }
};
const foo = $();
if ($) {
  const tmpCalleeParam = g();
  $(tmpCalleeParam);
} else {
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
