# Preval test case

# id_shadow_var.md

> Normalize > Function > Expr > Id shadow var
>
> Function recursion by referencing a function expr id

## Input

`````js filename=intro
const f = function r() {
  var r = 20; // Ignored. r is read-only but the write fails silently.
  $(typeof r);
  return r;
};
const x = f();
$(x, typeof f);
`````

## Settled


`````js filename=intro
$(`number`);
$(20, `function`);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`number`);
$(20, `function`);
`````

## Pre Normal


`````js filename=intro
const f = function r$1() {
  debugger;
  let r$1 = undefined;
  r$1 = 20;
  $(typeof r$1);
  return r$1;
};
const x = f();
$(x, typeof f);
`````

## Normalized


`````js filename=intro
const r$1 = function () {
  debugger;
  let r$2 = undefined;
  r$2 = 20;
  const tmpCalleeParam = typeof r$2;
  $(tmpCalleeParam);
  return r$2;
};
const f = r$1;
const x = r$1();
const tmpCalleeParam$1 = x;
const tmpCalleeParam$3 = typeof f;
$(tmpCalleeParam$1, tmpCalleeParam$3);
`````

## PST Settled
With rename=true

`````js filename=intro
$( "number" );
$( 20, "function" );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'number'
 - 2: 20, 'function'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
