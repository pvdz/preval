# Preval test case

# base_binary_left.md

> Static arg ops > Base binary left
>
> When the first line of a function operates on an arg and the func is only called, outline the operation.

## Input

`````js filename=intro
function f(a, b, c) {
  $(a + $(1));
}
f(1, 2, 3);
f(4, 2, 5);
f(6, 2, 7);
f(8, 2, 9);
`````

## Pre Normal


`````js filename=intro
let f = function ($$0, $$1, $$2) {
  let a = $$0;
  let b = $$1;
  let c = $$2;
  debugger;
  $(a + $(1));
};
f(1, 2, 3);
f(4, 2, 5);
f(6, 2, 7);
f(8, 2, 9);
`````

## Normalized


`````js filename=intro
let f = function ($$0, $$1, $$2) {
  let a = $$0;
  let b = $$1;
  let c = $$2;
  debugger;
  const tmpCallCallee = $;
  const tmpBinBothLhs = a;
  const tmpBinBothRhs = $(1);
  const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
  tmpCallCallee(tmpCalleeParam);
  return undefined;
};
f(1, 2, 3);
f(4, 2, 5);
f(6, 2, 7);
f(8, 2, 9);
`````

## Output


`````js filename=intro
const f /*:(number)=>*/ = function ($$0) {
  const a /*:number*/ = $$0;
  debugger;
  const tmpBinBothRhs = $(1);
  const tmpCalleeParam = a + tmpBinBothRhs;
  $(tmpCalleeParam);
  return undefined;
};
f(1);
f(4);
f(6);
f(8);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function($$0 ) {
  const b = c;
  debugger;
  const d = $( 1 );
  const e = b + d;
  $( e );
  return undefined;
};
a( 1 );
a( 4 );
a( 6 );
a( 8 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 1
 - 4: 5
 - 5: 1
 - 6: 7
 - 7: 1
 - 8: 9
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
