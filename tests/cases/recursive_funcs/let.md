# Preval test case

# let.md

> Recursive funcs > Let
>
>

## Input

`````js filename=intro
let f = function() {
  $(f());
}
f = function() {
  $(f());
}
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  $(f());
};
f = function () {
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
f = function () {
  debugger;
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = f();
  tmpCallCallee$1(tmpCalleeParam$1);
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
