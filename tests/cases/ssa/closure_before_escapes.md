# Preval test case

# closure_before_escapes.md

> Ssa > Closure before escapes
>
> Contrived example

The closure prevents SSA if the function that contains it "escapes"

#TODO

## Input

`````js filename=intro
function f() {
  const g = function() {
    return x;
  };
  let x = $(5);
  $(x);
  x = $(10);
  $(x);
  // "escaped" because preval can no longer guarantee anything
  $(g);
}
if ($) $(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  const g = function () {
    debugger;
    return x;
  };
  let x = $(5);
  $(x);
  x = $(10);
  $(x);
  $(g);
};
if ($) $(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  const g = function () {
    debugger;
    return x;
  };
  let x = $(5);
  $(x);
  x = $(10);
  $(x);
  $(g);
  return undefined;
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
  const g = function () {
    debugger;
    return x;
  };
  let x = $(5);
  $(x);
  x = $(10);
  $(x);
  $(g);
  $(undefined);
} else {
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 5
 - 2: 5
 - 3: 10
 - 4: 10
 - 5: '<function>'
 - 6: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same