# Preval test case

# array_closure_risky.md

> Function self assign closure alias > Array closure risky
>
> This is targeting a specific trick used by certain obfuscators.
> In this case the array that's being closed uses a value that is not available until right before the call
> It showcases the need for moving the first part of the function to right before the first call
> rather than just moving it before the function itself.

## Input

`````js filename=intro
var a = function() {
  const arr = [1, x, 3];
  a = function(){
    return arr;
  };
  return a();
}
const x = 2;
$(a()); // In this case the function can be collapsed immediately
var b = a;
$(b());
// Reference check (should be different closure)
$(a() === b());
// Reference check (should be same closure)
$(a() === a());
`````

## Pre Normal


`````js filename=intro
let a = undefined;
let b = undefined;
a = function () {
  debugger;
  const arr = [1, x, 3];
  a = function () {
    debugger;
    return arr;
  };
  return a();
};
const x = 2;
$(a());
b = a;
$(b());
$(a() === b());
$(a() === a());
`````

## Normalized


`````js filename=intro
let a = undefined;
let b = undefined;
a = function () {
  debugger;
  const arr = [1, x, 3];
  a = function () {
    debugger;
    return arr;
  };
  const tmpReturnArg = a();
  return tmpReturnArg;
};
const x = 2;
const tmpCallCallee = $;
const tmpCalleeParam = a();
tmpCallCallee(tmpCalleeParam);
b = a;
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = b();
tmpCallCallee$1(tmpCalleeParam$1);
const tmpCallCallee$3 = $;
const tmpBinBothLhs = a();
const tmpBinBothRhs = b();
const tmpCalleeParam$3 = tmpBinBothLhs === tmpBinBothRhs;
tmpCallCallee$3(tmpCalleeParam$3);
const tmpCallCallee$5 = $;
const tmpBinBothLhs$1 = a();
const tmpBinBothRhs$1 = a();
const tmpCalleeParam$5 = tmpBinBothLhs$1 === tmpBinBothRhs$1;
tmpCallCallee$5(tmpCalleeParam$5);
`````

## Output


`````js filename=intro
const arr = [1, 2, 3];
$(arr);
$(arr);
const tmpCalleeParam$3 = arr === arr;
$(tmpCalleeParam$3);
const tmpCalleeParam$5 = arr === arr;
$(tmpCalleeParam$5);
`````

## PST Output

With rename=true

`````js filename=intro
const a = [ 1, 2, 3 ];
$( a );
$( a );
const b = a === a;
$( b );
const c = a === a;
$( c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: [1, 2, 3]
 - 2: [1, 2, 3]
 - 3: true
 - 4: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same