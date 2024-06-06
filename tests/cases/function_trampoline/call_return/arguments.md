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
  const tmpPrevalAliasArgumentsAny = arguments;
  let a = $$0;
  let b = $$1;
  let c = $$2;
  let d = $$3;
  let e = $$4;
  debugger;
  const r = $(tmpPrevalAliasArgumentsAny);
  return r;
};
const q = f(1, 2, 3, 4, 5);
$(q);
`````

## Normalized


`````js filename=intro
const f = function ($$0, $$1, $$2, $$3, $$4) {
  const tmpPrevalAliasArgumentsAny = arguments;
  let a = $$0;
  let b = $$1;
  let c = $$2;
  let d = $$3;
  let e = $$4;
  debugger;
  const r = $(tmpPrevalAliasArgumentsAny);
  return r;
};
const q = f(1, 2, 3, 4, 5);
$(q);
`````

## Output


`````js filename=intro
const f = function ($$0, $$1, $$2, $$3, $$4) {
  const tmpPrevalAliasArgumentsAny = arguments;
  debugger;
  const r = $(tmpPrevalAliasArgumentsAny);
  return r;
};
const q = f(1, 2, 3, 4, 5);
$(q);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function($$0,$$1,$$2,$$3,$$4 ) {
  const b = c;
  debugger;
  const d = $( b );
  return d;
};
const e = a( 1, 2, 3, 4, 5 );
$( e );
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
