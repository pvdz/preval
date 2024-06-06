# Preval test case

# call_second_param.md

> Function trampoline > Call only > Call second param
>
> A trampoline is a function that just calls another function, and maybe returns its return value

#TODO

## Input

`````js filename=intro
const f = function(a, b, c, d, e) {
  $(c);
};
f(1, 2, 3, 4, 5); // This should end up being $(3)
`````

## Pre Normal


`````js filename=intro
const f = function ($$0, $$1, $$2, $$3, $$4) {
  let a = $$0;
  let b = $$1;
  let c = $$2;
  let d = $$3;
  let e = $$4;
  debugger;
  $(c);
};
f(1, 2, 3, 4, 5);
`````

## Normalized


`````js filename=intro
const f = function ($$0, $$1, $$2, $$3, $$4) {
  let a = $$0;
  let b = $$1;
  let c = $$2;
  let d = $$3;
  let e = $$4;
  debugger;
  $(c);
  return undefined;
};
f(1, 2, 3, 4, 5);
`````

## Output


`````js filename=intro
$(3);
`````

## PST Output

With rename=true

`````js filename=intro
$( 3 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
