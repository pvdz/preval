# Preval test case

# base.md

> Recursive funcs > Base
>
>

## Input

`````js filename=intro
function f() {
  $(f());
}
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  $(f());
};
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  const tmpCallCallee = $;
  const tmpCalleeParam = f();
  tmpCallCallee(tmpCalleeParam);
  return undefined;
};
`````

## Output


`````js filename=intro
const f = function () {
  debugger;
  f();
  $(undefined);
  return undefined;
};
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  a();
  $( undefined );
  return undefined;
};
`````

## Denormalized

(This ought to be the final result)


`````js filename=intro
const f = function () {
  f();
  $(undefined);
};
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
