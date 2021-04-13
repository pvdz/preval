# Preval test case

# arguments.md

> Function trampoline > Call only > Arguments
>
> A trampoline is a function that just calls another function, and maybe returns its return value

#TODO

## Input

`````js filename=intro
const f = function(a, b, c, d, e) {
  $(arguments);
};
f(1, 2, 3, 4, 5); // The use of `arguments` should prevent inlining this call, for now
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
  $(tmpArgumentsAny);
};
f(1, 2, 3, 4, 5);
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
  $(tmpArgumentsAny);
  return undefined;
};
f(1, 2, 3, 4, 5);
`````

## Output

`````js filename=intro
const f = function ($$0, $$1, $$2, $$3, $$4) {
  const tmpArgumentsAny = arguments;
  debugger;
  $(tmpArgumentsAny);
  return undefined;
};
f(1, 2, 3, 4, 5);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { 0: '1', 1: '2', 2: '3', 3: '4', 4: '5' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
