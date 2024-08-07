# Preval test case

# immutable_global.md

> Array reads > Immutable global
>
> As long as a global array can't mutate, array elements can be inlined

## Input

`````js filename=intro
const arr = [1, 2, 3];
function f(){
  $(arr[0], arr[1], arr[2], arr[3]);
  return arr[2];
}
$(f());
$(f);
$(arr[1]);
$(arr.length);
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  $(arr[0], arr[1], arr[2], arr[3]);
  return arr[2];
};
const arr = [1, 2, 3];
$(f());
$(f);
$(arr[1]);
$(arr.length);
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  const tmpCallCallee = $;
  const tmpCalleeParam = arr[0];
  const tmpCalleeParam$1 = arr[1];
  const tmpCalleeParam$3 = arr[2];
  const tmpCalleeParam$5 = arr[3];
  tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$3, tmpCalleeParam$5);
  const tmpReturnArg = arr[2];
  return tmpReturnArg;
};
const arr = [1, 2, 3];
const tmpCallCallee$1 = $;
const tmpCalleeParam$7 = f();
tmpCallCallee$1(tmpCalleeParam$7);
$(f);
const tmpCallCallee$3 = $;
const tmpCalleeParam$9 = arr[1];
tmpCallCallee$3(tmpCalleeParam$9);
const tmpCallCallee$5 = $;
const tmpCalleeParam$11 = arr.length;
tmpCallCallee$5(tmpCalleeParam$11);
`````

## Output


`````js filename=intro
const f = function () {
  debugger;
  $(1, 2, 3, undefined);
  return 3;
};
$(1, 2, 3, undefined);
$(3);
$(f);
$(2);
$(3);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  $( 1, 2, 3, undefined );
  return 3;
};
$( 1, 2, 3, undefined );
$( 3 );
$( a );
$( 2 );
$( 3 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1, 2, 3, undefined
 - 2: 3
 - 3: '<function>'
 - 4: 2
 - 5: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
