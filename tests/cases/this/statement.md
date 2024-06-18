# Preval test case

# statement.md

> This > Statement
>
> The `this` keyword as statement should be eliminated

## Input

`````js filename=intro
function f() {
  const x = $(0);
  this;
  return x;
}
f();
f();
f();
f();
$(f());
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  const x = $(0);
  undefined;
  return x;
};
f();
f();
f();
f();
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  const x = $(0);
  return x;
};
f();
f();
f();
f();
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
$(0);
$(0);
$(0);
$(0);
const tmpCalleeParam = $(0);
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
$( 0 );
$( 0 );
$( 0 );
$( 0 );
const a = $( 0 );
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: 0
 - 4: 0
 - 5: 0
 - 6: 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
