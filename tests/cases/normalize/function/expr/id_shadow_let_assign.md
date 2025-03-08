# Preval test case

# id_shadow_let_assign.md

> Normalize > Function > Expr > Id shadow let assign
>
> Function recursion by referencing a function expr id

## Input

`````js filename=intro
const f = function r() {
  let r = 20; // Ignored. r is read-only but the write fails silently.
  r = 30;
  $(typeof r);
  return r;
};
const x = f();
$(x, typeof f);
`````

## Settled


`````js filename=intro
$(`number`);
$(30, `function`);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`number`);
$(30, `function`);
`````

## Pre Normal


`````js filename=intro
const f = function r() {
  debugger;
  let r$1 = 20;
  r$1 = 30;
  $(typeof r$1);
  return r$1;
};
const x = f();
$(x, typeof f);
`````

## Normalized


`````js filename=intro
const r = function () {
  debugger;
  let r$1 = 20;
  r$1 = 30;
  const tmpCalleeParam = typeof r$1;
  $(tmpCalleeParam);
  return r$1;
};
const f = r;
const x = r();
const tmpCalleeParam$1 = x;
const tmpCalleeParam$3 = typeof f;
$(tmpCalleeParam$1, tmpCalleeParam$3);
`````

## PST Settled
With rename=true

`````js filename=intro
$( "number" );
$( 30, "function" );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'number'
 - 2: 30, 'function'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
