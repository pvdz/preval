# Preval test case

# base_args_global.md

> Function trampoline > Call return > Base args global
>
> A trampoline is a function that just calls another function, and maybe returns its return value

#TODO

## Input

`````js filename=intro
const x = $(1);
const f = function() {
  const r = $(x);
  return r;
};
const q = f(); // In this test, this is the call we expect to be replaced by trampoline inlining...
$(q);
`````

## Pre Normal

`````js filename=intro
const x = $(1);
const f = function () {
  debugger;
  const r = $(x);
  return r;
};
const q = f();
$(q);
`````

## Normalized

`````js filename=intro
const x = $(1);
const f = function () {
  debugger;
  const r = $(x);
  return r;
};
const q = f();
$(q);
`````

## Output

`````js filename=intro
const x = $(1);
const q = $(x);
$(q);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( a );
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
