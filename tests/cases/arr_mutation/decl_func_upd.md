# Preval test case

# decl_func_upd.md

> Arr mutation > Decl func upd
>
> Testing the inlining of array mutations

## Input

`````js filename=intro
const f = function () {
  arr[0] = 1;
};
const arr = [];
$(f);
f();
$(arr);
`````

## Pre Normal

`````js filename=intro
const f = function () {
  debugger;
  arr[0] = 1;
};
const arr = [];
$(f);
f();
$(arr);
`````

## Normalized

`````js filename=intro
const f = function () {
  debugger;
  arr[0] = 1;
  return undefined;
};
const arr = [];
$(f);
f();
$(arr);
`````

## Output

`````js filename=intro
const f = function () {
  debugger;
  arr[0] = 1;
  return undefined;
};
const arr = [1];
$(f);
$(arr);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  b[0] = 1;
  return undefined;
},;
const b = [ 1,, ];
$( a );
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '<function>'
 - 2: [1]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
