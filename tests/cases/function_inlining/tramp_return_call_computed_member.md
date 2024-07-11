# Preval test case

# tramp_return_call_computed_member.md

> Function inlining > Tramp return call computed member
>
> A function returning the call to another function

## Input

`````js filename=intro
const toString = $('toString');
const g = function() {
  const y = String[toString]();
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
const toString = $(`toString`);
const g = function () {
  debugger;
  const y = String[toString]();
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
const toString = $(`toString`);
const g = function () {
  debugger;
  const y = String[toString]();
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
const toString = $(`toString`);
const r = String[toString]();
$(r);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( "toString" );
const b = String[ a ]();
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'toString'
 - 2: 'function() { [native code] }'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
