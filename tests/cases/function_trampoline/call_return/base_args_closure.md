# Preval test case

# base_args_closure.md

> Function trampoline > Call return > Base args closure
>
> A trampoline is a function that just calls another function, and maybe returns its return value

## Input

`````js filename=intro
const f = function() {
  const x = $(1);
  const g = function() {
    const r = $(x);
    return r;
  };
  const q = g(); // In this test, this is the call we expect to be replaced by trampoline inlining...
  $(q);
};
f();
`````

## Pre Normal


`````js filename=intro
const f = function () {
  debugger;
  const x = $(1);
  const g = function () {
    debugger;
    const r = $(x);
    return r;
  };
  const q = g();
  $(q);
};
f();
`````

## Normalized


`````js filename=intro
const f = function () {
  debugger;
  const x = $(1);
  const g = function () {
    debugger;
    const r = $(x);
    return r;
  };
  const q = g();
  $(q);
  return undefined;
};
f();
`````

## Output


`````js filename=intro
const x /*:unknown*/ = $(1);
const q /*:unknown*/ = $(x);
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
