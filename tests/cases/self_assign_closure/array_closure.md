# Preval test case

# array_closure.md

> Self assign closure > Array closure
>
> This is targeting a specific trick used by certain obfuscators.
> In this case the outer function replaces itself with a closure for an array it creates.
> But as long as the function is only ever called, this can be inlined into a global ref.

## Input

`````js filename=intro
var a = function() {
  const arr = [1, 2, 3];
  a = function(){
    return arr;
  };
  return a();
}
$(a());
$(a() === a());
`````

## Pre Normal


`````js filename=intro
let a = undefined;
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
$(a() === a());
`````

## Normalized


`````js filename=intro
let a = undefined;
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
const tmpCallCallee$1 = $;
const tmpBinBothLhs = a();
const tmpBinBothRhs = a();
const tmpCalleeParam$1 = tmpBinBothLhs === tmpBinBothRhs;
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Output


`````js filename=intro
const a = [1, 2, 3];
$(a);
$(true);
`````

## PST Output

With rename=true

`````js filename=intro
const a = [ 1, 2, 3 ];
$( a );
$( true );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: [1, 2, 3]
 - 2: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
