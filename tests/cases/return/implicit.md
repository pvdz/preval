# Preval test case

# implicit.md

> Return > Implicit
>
> After normalization it's no longer implicit

## Input

`````js filename=intro
function f() {
  if ($) {
    $(100);
  }
}
$(f());
$(f());
$(f());
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  if ($) {
    $(100);
  }
};
$(f());
$(f());
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  if ($) {
    $(100);
    return undefined;
  } else {
    return undefined;
  }
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
const tmpCalleeParam$1 = f();
$(tmpCalleeParam$1);
const tmpCalleeParam$3 = f();
$(tmpCalleeParam$3);
`````

## Output


`````js filename=intro
const f /*:()=>unknown*/ = function () {
  debugger;
  if ($) {
    $(100);
    return undefined;
  } else {
    return undefined;
  }
};
f();
$(undefined);
f();
$(undefined);
f();
$(undefined);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  if ($) {
    $( 100 );
    return undefined;
  }
  else {
    return undefined;
  }
};
a();
$( undefined );
a();
$( undefined );
a();
$( undefined );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: undefined
 - 3: 100
 - 4: undefined
 - 5: 100
 - 6: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
