# Preval test case

# closure_before_trapped.md

> Ssa > Closure before trapped
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
  // g does not "escape" so we should be able to safely infer it entirely
  $(g());
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
  $(g());
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
  const tmpCallCallee = $;
  const tmpCalleeParam = g();
  tmpCallCallee(tmpCalleeParam);
  return undefined;
};
if ($) {
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = f();
  tmpCallCallee$1(tmpCalleeParam$1);
} else {
}
`````

## Output

`````js filename=intro
if ($) {
  const x = $(5);
  $(x);
  const tmpClusterSSA_x = $(10);
  $(tmpClusterSSA_x);
  $(tmpClusterSSA_x);
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
 - 5: 10
 - 6: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
