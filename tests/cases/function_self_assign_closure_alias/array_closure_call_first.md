# Preval test case

# array_closure_call_first.md

> Function self assign closure alias > Array closure call first
>
> This is targeting a specific trick used by certain obfuscators.
> In this case the outer function replaces itself with a closure for an array it creates.
> But as long as the array is not mutated nor reference checked, the values should be safe to access.
> The difference when calling it immediately is that we don't need to worry about the unique reference
> of the thing being closed. It'll always return the same value. Versus otherwise we have to be
> careful to maintain the semantics of always returning a unique reference.

Becomes something like

var a = function() {
  return arr;
}
const arr = [1, 2, 3];
$(a()); // In this case the function can be collapsed immediately

## Input

`````js filename=intro
var a = function() {
  const arr = [1, 2, 3];
  a = function(){
    return arr;
  };
  return a();
}
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
  const arr = [1, 2, 3];
  a = function () {
    debugger;
    return arr;
  };
  return a();
};
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
  const arr = [1, 2, 3];
  a = function () {
    debugger;
    return arr;
  };
  const tmpReturnArg = a();
  return tmpReturnArg;
};
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
const arr /*:array*/ = [1, 2, 3];
$(arr);
$(arr);
$(true);
$(true);
`````

## PST Output

With rename=true

`````js filename=intro
const a = [ 1, 2, 3 ];
$( a );
$( a );
$( true );
$( true );
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
