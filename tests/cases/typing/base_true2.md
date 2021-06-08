# Preval test case

# base_true2.md

> Typing > Base true2
>
> We want to track the type of bindings when we can, and maybe even limit it to a particular set when feasible

#TODO

## Input

`````js filename=intro
const g = function (arg) {
  $(arg);
  $(arg);
  $(arg);
  return undefined;
};
const tmpCalleeParam = $(10);
const b = tmpCalleeParam === 10;
if (b) {
  $('a', true);
  g(true);
} else {
  $('b', false);
  g(false);
}
`````

## Pre Normal

`````js filename=intro
const g = function ($$0) {
  let arg = $$0;
  debugger;
  $(arg);
  $(arg);
  $(arg);
  return undefined;
};
const tmpCalleeParam = $(10);
const b = tmpCalleeParam === 10;
if (b) {
  $('a', true);
  g(true);
} else {
  $('b', false);
  g(false);
}
`````

## Normalized

`````js filename=intro
const g = function ($$0) {
  let arg = $$0;
  debugger;
  $(arg);
  $(arg);
  $(arg);
  return undefined;
};
const tmpCalleeParam = $(10);
const b = tmpCalleeParam === 10;
if (b) {
  $('a', true);
  g(true);
} else {
  $('b', false);
  g(false);
}
`````

## Output

`````js filename=intro
const g = function ($$0) {
  const arg = $$0;
  debugger;
  $(arg);
  $(arg);
  $(arg);
  return undefined;
};
const tmpCalleeParam = $(10);
const b = tmpCalleeParam === 10;
if (b) {
  $('a', true);
  g(true);
} else {
  $('b', false);
  g(false);
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 10
 - 2: 'a', true
 - 3: true
 - 4: true
 - 5: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same