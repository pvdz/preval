# Preval test case

# array_closure.md

> Function self assign closure alias > Array closure
>
> This is targeting a specific trick used by certain obfuscators.
> In this case the outer function replaces itself with a closure for an array it creates.
> But as long as the array is not mutated nor reference checked, the values should be safe to access.

## Input

`````js filename=intro
var a = function() {
  const arr = [1, 2, 3];
  a = function(){
    return arr;
  };
  return a();
}
var b = a;
$(a());
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
  const arr = [1, 2, 3];
  a = function () {
    debugger;
    return arr;
  };
  return a();
};
b = a;
$(a());
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
  const arr = [1, 2, 3];
  a = function () {
    debugger;
    return arr;
  };
  const tmpReturnArg = a();
  return tmpReturnArg;
};
b = a;
const tmpCallCallee = $;
const tmpCalleeParam = a();
tmpCallCallee(tmpCalleeParam);
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
let a = function () {
  debugger;
  const arr /*:array*/ = [1, 2, 3];
  a = function () {
    debugger;
    return arr;
  };
  const tmpReturnArg = a();
  return tmpReturnArg;
};
const b = a;
const tmpCalleeParam = a();
$(tmpCalleeParam);
const tmpCalleeParam$1 = b();
$(tmpCalleeParam$1);
const tmpBinBothLhs = a();
const tmpBinBothRhs = b();
const tmpCalleeParam$3 /*:boolean*/ = tmpBinBothLhs === tmpBinBothRhs;
$(tmpCalleeParam$3);
const tmpBinBothLhs$1 = a();
const tmpBinBothRhs$1 = a();
const tmpCalleeParam$5 /*:boolean*/ = tmpBinBothLhs$1 === tmpBinBothRhs$1;
$(tmpCalleeParam$5);
`````

## PST Output

With rename=true

`````js filename=intro
let a = function() {
  debugger;
  const b = [ 1, 2, 3 ];
  a = function() {
    debugger;
    return b;
  };
  const c = a();
  return c;
};
const d = a;
const e = a();
$( e );
const f = d();
$( f );
const g = a();
const h = d();
const i = g === h;
$( i );
const j = a();
const k = a();
const l = j === k;
$( l );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: [1, 2, 3]
 - 2: [1, 2, 3]
 - 3: false
 - 4: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
