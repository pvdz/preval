# Preval test case

# arguments.md

> Function trampoline > Call return > Arguments
>
> A trampoline is a function that just calls another function, and maybe returns its return value

#TODO

## Input

`````js filename=intro
const f = function(a, b, c, d, e) {
  const r = $(arguments);
  return r;
};
const q = f(1, 2, 3, 4, 5); // The use of `arguments` should prevent inlining this call, for now
$(q);
`````

## Pre Normal

`````js filename=intro
const f = function ($$0, $$1, $$2, $$3, $$4) {
  const tmpArgumentsAny = arguments;
  let a = $$0;
  let b = $$1;
  let c = $$2;
  let d = $$3;
  let e = $$4;
  debugger;
  const r = $(tmpArgumentsAny);
  return r;
};
const q = f(1, 2, 3, 4, 5);
$(q);
`````

## Normalized

`````js filename=intro
const f = function ($$0, $$1, $$2, $$3, $$4) {
  const tmpArgumentsAny = arguments;
  let a = $$0;
  let b = $$1;
  let c = $$2;
  let d = $$3;
  let e = $$4;
  debugger;
  const r = $(tmpArgumentsAny);
  return r;
};
const q = f(1, 2, 3, 4, 5);
$(q);
`````

## Output

`````js filename=intro
const f = function ($$0, $$1, $$2, $$3, $$4) {
  const tmpArgumentsAny = arguments;
  debugger;
  const r = $(tmpArgumentsAny);
  return r;
};
const q = f(1, 2, 3, 4, 5);
$(q);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { 0: '1', 1: '2', 2: '3', 3: '4', 4: '5' }
 - 2: { 0: '1', 1: '2', 2: '3', 3: '4', 4: '5' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same