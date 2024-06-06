# Preval test case

# argumentslength.md

> Function trampoline > Call return > Argumentslength
>
> A trampoline is a function that just calls another function, and maybe returns its return value

#TODO

## Input

`````js filename=intro
const f = function(a, b, c, d, e) {
  const r = $(arguments.length);
  return r;
};
const q = f(1, 2, 3, 4, 5); // The use of `arguments.length` should prevent inlining this call, for now, although inlining the arg count probably won't take very long
$(q);
`````

## Pre Normal


`````js filename=intro
const f = function ($$0, $$1, $$2, $$3, $$4) {
  const tmpPrevalAliasArgumentsLen = arguments.length;
  let a = $$0;
  let b = $$1;
  let c = $$2;
  let d = $$3;
  let e = $$4;
  debugger;
  const r = $(tmpPrevalAliasArgumentsLen);
  return r;
};
const q = f(1, 2, 3, 4, 5);
$(q);
`````

## Normalized


`````js filename=intro
const f = function ($$0, $$1, $$2, $$3, $$4) {
  const tmpPrevalAliasArgumentsLen = arguments.length;
  let a = $$0;
  let b = $$1;
  let c = $$2;
  let d = $$3;
  let e = $$4;
  debugger;
  const r = $(tmpPrevalAliasArgumentsLen);
  return r;
};
const q = f(1, 2, 3, 4, 5);
$(q);
`````

## Output


`````js filename=intro
const r$1 = $(5);
$(r$1);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 5 );
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 5
 - 2: 5
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
