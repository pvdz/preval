# Preval test case

# unused_param_last.md

> Rest > Param > Unused > Unused param last
>
> A function with a spread param that we know will not receive any args should be an empty array

#TODO

## Input

`````js filename=intro
function f(a, b, ...rest) {
  return $(a, b, 'fwep');
}
f($spy(), $spy());
`````

## Pre Normal


`````js filename=intro
let f = function ($$0, $$1, ...$$2) {
  let a = $$0;
  let b = $$1;
  let rest = $$2;
  debugger;
  return $(a, b, `fwep`);
};
f($spy(), $spy());
`````

## Normalized


`````js filename=intro
let f = function ($$0, $$1, ...$$2) {
  let a = $$0;
  let b = $$1;
  let rest = $$2;
  debugger;
  const tmpReturnArg = $(a, b, `fwep`);
  return tmpReturnArg;
};
const tmpCallCallee = f;
const tmpCalleeParam = $spy();
const tmpCalleeParam$1 = $spy();
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
`````

## Output


`````js filename=intro
const tmpCalleeParam = $spy();
const tmpCalleeParam$1 = $spy();
$(tmpCalleeParam, tmpCalleeParam$1, `fwep`);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $spy();
const b = $spy();
$( a, b, "fwep" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'Creating spy', 1, 0, ['spy', 12345]
 - 2: 'Creating spy', 2, 0, ['spy', 12345]
 - 3: '<spy[1]>', '<spy[2]>', 'fwep'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
