# Preval test case

# tramp_return_call_ident.md

> Function inlining > Tramp return call ident
>
> A function returning the call to another function

## Input

`````js filename=intro
const g = function() {
  const y = $(10);
  return y;
};
const f = function() {
  const x = g();
  return x;
};
const r = f();
$(r);
`````

## Pre Normal


`````js filename=intro
const g = function () {
  debugger;
  const y = $(10);
  return y;
};
const f = function () {
  debugger;
  const x = g();
  return x;
};
const r = f();
$(r);
`````

## Normalized


`````js filename=intro
const g = function () {
  debugger;
  const y = $(10);
  return y;
};
const f = function () {
  debugger;
  const x = g();
  return x;
};
const r = f();
$(r);
`````

## Output


`````js filename=intro
const r /*:unknown*/ = $(10);
$(r);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 10 );
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 10
 - 2: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
