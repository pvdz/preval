# Preval test case

# base_args_param.md

> Function trampoline > Call return > Base args param
>
> A trampoline is a function that just calls another function, and maybe returns its return value

## Input

`````js filename=intro
const f = function(x) {
  const r = $(x);
  return r;
};
const q = f(1); // In this test, this is the call we expect to be replaced by trampoline inlining...
$(q);
`````

## Pre Normal


`````js filename=intro
const f = function ($$0) {
  let x = $$0;
  debugger;
  const r = $(x);
  return r;
};
const q = f(1);
$(q);
`````

## Normalized


`````js filename=intro
const f = function ($$0) {
  let x = $$0;
  debugger;
  const r = $(x);
  return r;
};
const q = f(1);
$(q);
`````

## Output


`````js filename=intro
const q /*:unknown*/ = $(1);
$(q);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
$( a );
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
