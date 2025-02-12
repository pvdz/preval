# Preval test case

# base_unary.md

> Static arg ops > Base unary
>
> When the first line of a function operates on an arg and the func is only called, outline the operation.

## Input

`````js filename=intro
function f(a, b, c) {
  $(~a);
  $(a, b, c);
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
  $(~a);
  $(a, b, c);
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
  const tmpCalleeParam = ~a;
  tmpCallCallee(tmpCalleeParam);
  $(a, b, c);
  return undefined;
};
f(1, 2, 3);
f(4, 2, 5);
f(6, 2, 7);
f(8, 2, 9);
`````

## Output


`````js filename=intro
const f /*:(number, number, number)=>undefined*/ = function ($$0, $$1, $$2) {
  const a /*:number*/ = $$0;
  const c /*:number*/ = $$1;
  const tmpOutlinedParam /*:number*/ = $$2;
  debugger;
  $(tmpOutlinedParam);
  $(a, 2, c);
  return undefined;
};
f(1, 3, -2);
f(4, 5, -5);
f(6, 7, -7);
f(8, 9, -9);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function($$0,$$1,$$2 ) {
  const b = $$0;
  const c = $$1;
  const d = $$2;
  debugger;
  $( d );
  $( b, 2, c );
  return undefined;
};
a( 1, 3, -2 );
a( 4, 5, -5 );
a( 6, 7, -7 );
a( 8, 9, -9 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: -2
 - 2: 1, 2, 3
 - 3: -5
 - 4: 4, 2, 5
 - 5: -7
 - 6: 6, 2, 7
 - 7: -9
 - 8: 8, 2, 9
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
