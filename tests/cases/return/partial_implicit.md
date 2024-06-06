# Preval test case

# partial_implicit.md

> Return > Partial implicit
>
> After normalization the implicit return will be explicit as well.

We won't be able to inline it.

#TODO

## Input

`````js filename=intro
function f() {
  if ($) {
    $(100);
    return 10;
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
    return 10;
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
    return 10;
  } else {
    return undefined;
  }
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = f();
tmpCallCallee$1(tmpCalleeParam$1);
const tmpCallCallee$3 = $;
const tmpCalleeParam$3 = f();
tmpCallCallee$3(tmpCalleeParam$3);
`````

## Output


`````js filename=intro
const f = function () {
  debugger;
  if ($) {
    $(100);
    return 10;
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

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  if ($) {
    $( 100 );
    return 10;
  }
  else {
    return undefined;
  }
};
const b = a();
$( b );
const c = a();
$( c );
const d = a();
$( d );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 10
 - 3: 100
 - 4: 10
 - 5: 100
 - 6: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
