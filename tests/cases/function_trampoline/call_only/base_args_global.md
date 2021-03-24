# Preval test case

# base_args_global.md

> Function trampoline > Call only > Base args global
>
> A trampoline is a function that just calls another function, and maybe returns its return value

#TODO

## Input

`````js filename=intro
const x = $(1);
const f = function() {
  $(x);
};
f(); // In this test, this is the call we expect to be replaced by trampoline inlining...
`````

## Pre Normal

`````js filename=intro
const x = $(1);
const f = function () {
  debugger;
  $(x);
};
f();
`````

## Normalized

`````js filename=intro
const x = $(1);
const f = function () {
  debugger;
  $(x);
};
f();
`````

## Output

`````js filename=intro
const x = $(1);
$(x);
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