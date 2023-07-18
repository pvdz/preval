# Preval test case

# argumentslength.md

> Function trampoline > Call only > Argumentslength
>
> A trampoline is a function that just calls another function, and maybe returns its return value

#TODO

## Input

`````js filename=intro
const f = function(a, b, c, d, e) {
  $(arguments.length);
};
f(1, 2, 3, 4, 5); // The use of `arguments.length` should prevent inlining this call, for now, although inlining the arg count probably won't take very long
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
  $(tmpPrevalAliasArgumentsLen);
};
f(1, 2, 3, 4, 5);
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
  $(tmpPrevalAliasArgumentsLen);
  return undefined;
};
f(1, 2, 3, 4, 5);
`````

## Output

`````js filename=intro
$(5);
`````

## PST Output

With rename=true

`````js filename=intro
$( 5 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 5
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
