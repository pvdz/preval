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

## Settled


`````js filename=intro
const a /*:array*/ = [1, 2, 3];
$(a);
$(true);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$([1, 2, 3]);
$(true);
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
const tmpCalleeParam = a();
$(tmpCalleeParam);
const tmpBinBothLhs = a();
const tmpBinBothRhs = a();
const tmpCalleeParam$1 = tmpBinBothLhs === tmpBinBothRhs;
$(tmpCalleeParam$1);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = [ 1, 2, 3 ];
$( a );
$( true );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: [1, 2, 3]
 - 2: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
