# Preval test case

# dupe_binding.md

> Primitive arg inlining > Dupe binding
>
> If we're going to clone functions to inline them then we're going to run into problems with functions with bindings because their name won't be unique...

This should do something like a 
```js
function f(a, b) {
  $(a, b);
  return a;
}
function f_prime(a, b) {
  $(100, b);
  return 100;
}
$(f($(1), $(2)), 'outer1');
$(f(100, $(200)), 'outer2');
```

After which the `b` identifier is no longer a unique binding.

This is easy to fix for the example but harder to fix for a generic clone.

#TODO

## Input

`````js filename=intro
function f(a, b) {
  $(a, b);
  return a;
}
$(f($(1), $(2)), 'outer1');
$(f(100, $(200)), 'outer2');
`````

## Pre Normal

`````js filename=intro
let f = function ($$0, $$1) {
  let a = $$0;
  let b = $$1;
  debugger;
  $(a, b);
  return a;
};
$(f($(1), $(2)), `outer1`);
$(f(100, $(200)), `outer2`);
`````

## Normalized

`````js filename=intro
let f = function ($$0, $$1) {
  let a = $$0;
  let b = $$1;
  debugger;
  $(a, b);
  return a;
};
const tmpCallCallee = $;
const tmpCallCallee$1 = f;
const tmpCalleeParam$3 = $(1);
const tmpCalleeParam$5 = $(2);
const tmpCalleeParam = tmpCallCallee$1(tmpCalleeParam$3, tmpCalleeParam$5);
const tmpCalleeParam$1 = `outer1`;
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
const tmpCallCallee$3 = $;
const tmpCallCallee$5 = f;
const tmpCalleeParam$11 = 100;
const tmpCalleeParam$13 = $(200);
const tmpCalleeParam$7 = tmpCallCallee$5(tmpCalleeParam$11, tmpCalleeParam$13);
const tmpCalleeParam$9 = `outer2`;
tmpCallCallee$3(tmpCalleeParam$7, tmpCalleeParam$9);
`````

## Output

`````js filename=intro
const tmpCalleeParam$3 = $(1);
const tmpCalleeParam$5 = $(2);
$(tmpCalleeParam$3, tmpCalleeParam$5);
$(tmpCalleeParam$3, `outer1`);
const tmpCalleeParam$13 = $(200);
$(100, tmpCalleeParam$13);
$(100, `outer2`);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 2 );
$( a, b );
$( a, "outer1" );
const c = $( 200 );
$( 100, c );
$( 100, "outer2" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 1, 2
 - 4: 1, 'outer1'
 - 5: 200
 - 6: 100, 200
 - 7: 100, 'outer2'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
