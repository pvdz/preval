# Preval test case

# id_recursive.md

> Normalize > Function > Expr > Id recursive
>
> Function recursion by referencing a function expr id

## Input

`````js filename=intro
const f = function r(n) {
  if (n > 100) return 10;
  return r(n + 1);
};
const a = $(10);
const x = f(a);
$(x);
`````

## Pre Normal


`````js filename=intro
const f = function r($$0) {
  let n = $$0;
  debugger;
  if (n > 100) return 10;
  return r(n + 1);
};
const a = $(10);
const x = f(a);
$(x);
`````

## Normalized


`````js filename=intro
const r = function ($$0) {
  let n = $$0;
  debugger;
  const tmpIfTest = n > 100;
  if (tmpIfTest) {
    return 10;
  } else {
    const tmpCallCallee = r;
    const tmpCalleeParam = n + 1;
    const tmpReturnArg = tmpCallCallee(tmpCalleeParam);
    return tmpReturnArg;
  }
};
const f = r;
const a = $(10);
const x = f(a);
$(x);
`````

## Output


`````js filename=intro
const r /*:(unknown)=>*/ = function ($$0) {
  const n = $$0;
  debugger;
  const tmpIfTest /*:boolean*/ = n > 100;
  if (tmpIfTest) {
    return 10;
  } else {
    const tmpCalleeParam = n + 1;
    const tmpReturnArg = r(tmpCalleeParam);
    return tmpReturnArg;
  }
};
const a = $(10);
const x = r(a);
$(x);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function($$0 ) {
  const b = c;
  debugger;
  const d = b > 100;
  if (d) {
    return 10;
  }
  else {
    const e = b + 1;
    const f = a( e );
    return f;
  }
};
const g = $( 10 );
const h = a( g );
$( h );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 10
 - 2: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
