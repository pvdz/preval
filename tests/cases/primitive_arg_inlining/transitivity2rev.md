# Preval test case

# transitivity2rev.md

> Primitive arg inlining > Transitivity2rev
>
> Second attempt at trying to proc cloning cache

## Input

`````js filename=intro
function f(a, b) {
  return $(a, b);
}
function g(b) {
  return $(f(1, b));
}
$(g(2)); 
$(f(1, 2)); // Should ultimately reuse the cloned func from the prev call
`````

## Pre Normal


`````js filename=intro
let f = function ($$0, $$1) {
  let a = $$0;
  let b = $$1;
  debugger;
  return $(a, b);
};
let g = function ($$0) {
  let b$1 = $$0;
  debugger;
  return $(f(1, b$1));
};
$(g(2));
$(f(1, 2));
`````

## Normalized


`````js filename=intro
let f = function ($$0, $$1) {
  let a = $$0;
  let b = $$1;
  debugger;
  const tmpReturnArg = $(a, b);
  return tmpReturnArg;
};
let g = function ($$0) {
  let b$1 = $$0;
  debugger;
  const tmpCallCallee = $;
  const tmpCalleeParam = f(1, b$1);
  const tmpReturnArg$1 = tmpCallCallee(tmpCalleeParam);
  return tmpReturnArg$1;
};
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = g(2);
tmpCallCallee$1(tmpCalleeParam$1);
const tmpCallCallee$3 = $;
const tmpCalleeParam$3 = f(1, 2);
tmpCallCallee$3(tmpCalleeParam$3);
`````

## Output


`````js filename=intro
const tmpCalleeParam = $(1, 2);
const tmpReturnArg$1 = $(tmpCalleeParam);
$(tmpReturnArg$1);
const tmpCalleeParam$3 = $(1, 2);
$(tmpCalleeParam$3);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1, 2 );
const b = $( a );
$( b );
const c = $( 1, 2 );
$( c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1, 2
 - 2: 1
 - 3: 1
 - 4: 1, 2
 - 5: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
