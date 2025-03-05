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
  const tmpCalleeParam = f();
  $(tmpCalleeParam);
  return undefined;
};
`````

## Output


`````js filename=intro
const f /*:()=>unknown*/ = function () {
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

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
