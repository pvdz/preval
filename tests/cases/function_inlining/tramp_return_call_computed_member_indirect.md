# Preval test case

# tramp_return_call_computed_member_indirect.md

> Function inlining > Tramp return call computed member indirect
>
> A function returning the call to another function

#TODO

## Input

`````js filename=intro
const toString = $('toString');
const g = function(o, p) {
  const y = o[p]();
  return y;
};
const f = function(m, n) {
  const x = g(m, n);
  return x;
};
const r = f(String, toString);
$(r);
`````

## Pre Normal


`````js filename=intro
const toString = $(`toString`);
const g = function ($$0, $$1) {
  let o = $$0;
  let p = $$1;
  debugger;
  const y = o[p]();
  return y;
};
const f = function ($$0, $$1) {
  let m = $$0;
  let n = $$1;
  debugger;
  const x = g(m, n);
  return x;
};
const r = f(String, toString);
$(r);
`````

## Normalized


`````js filename=intro
const toString = $(`toString`);
const g = function ($$0, $$1) {
  let o = $$0;
  let p = $$1;
  debugger;
  const y = o[p]();
  return y;
};
const f = function ($$0, $$1) {
  let m = $$0;
  let n = $$1;
  debugger;
  const x = g(m, n);
  return x;
};
const r = f(String, toString);
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
const b = String[ a ]()};
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
