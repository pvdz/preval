# Preval test case

# base.md

> Undotcall > Base
>
> Undo the "damage" done by dot call when we can detect it not to be necessary. We assert that $dotCall used to be a method call before so if the args are safe to inline, we can undo this step now. It was necessary for safe normalization purposes.

#TODO

## Input

`````js filename=intro
// Undo the "damage" done by dot call when we can detect it not to be necessary. We assert that $dotCall used to be a method call before so if the args are safe to inline, we can undo this step now. It was necessary for safe normalization purposes.
const pre = [1, 2, 3];
const map = pre.map;
const f = function(item) {
  $('hello', item);
  return item + 1;
};
const arr = $dotCall(map, pre, f); // Turn this back into `pre.map(f);`
$(arr);
`````

## Pre Normal

`````js filename=intro
const pre = [1, 2, 3];
const map = pre.map;
const f = function ($$0) {
  let item = $$0;
  debugger;
  $(`hello`, item);
  return item + 1;
};
const arr = $dotCall(map, pre, f);
$(arr);
`````

## Normalized

`````js filename=intro
const pre = [1, 2, 3];
const map = pre.map;
const f = function ($$0) {
  let item = $$0;
  debugger;
  $(`hello`, item);
  const tmpReturnArg = item + 1;
  return tmpReturnArg;
};
const arr = $dotCall(map, pre, f);
$(arr);
`````

## Output

`````js filename=intro
const pre = [1, 2, 3];
const map = pre.map;
const f = function ($$0) {
  const item = $$0;
  debugger;
  $(`hello`, item);
  const tmpReturnArg = item + 1;
  return tmpReturnArg;
};
const arr = $dotCall(map, pre, f);
$(arr);
`````

## PST Output

With rename=true

`````js filename=intro
const a = [ 1, 2, 3 ];
const b = a.map;
const c = function($$0 ) {
  const d = e;
  debugger;
  $( "hello", d );
  const f = d + 1;
  return f;
};
const g = $dotCall( b, a, c );
$( g );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'hello', 1
 - 2: 'hello', 2
 - 3: 'hello', 3
 - 4: [2, 3, 4]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
