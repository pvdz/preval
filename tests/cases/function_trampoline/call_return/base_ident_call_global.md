# Preval test case

# base_ident_call_global.md

> Function trampoline > Call return > Base ident call global
>
> A trampoline is a function that just calls another function, and maybe returns its return value

#TODO

## Input

`````js filename=intro
const f = function() {
  const r = $(1);
  return r;
};
const q = f(); // In this test, this is the call we expect to be replaced by trampoline inlining...
$(q);
`````

## Pre Normal


`````js filename=intro
const f = function () {
  debugger;
  const r = $(1);
  return r;
};
const q = f();
$(q);
`````

## Normalized


`````js filename=intro
const f = function () {
  debugger;
  const r = $(1);
  return r;
};
const q = f();
$(q);
`````

## Output


`````js filename=intro
const q = $(1);
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
