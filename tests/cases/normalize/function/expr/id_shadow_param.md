# Preval test case

# id_shadow_param.md

> Normalize > Function > Expr > Id shadow param
>
> Function recursion by referencing a function expr id

## Input

`````js filename=intro
const f = function r(r) {
  $(typeof r);
  return r;
};
const x = f(10);
$(x, typeof f);
`````

## Settled


`````js filename=intro
$(`number`);
$(10, `function`);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`number`);
$(10, `function`);
`````

## Pre Normal


`````js filename=intro
const f = function r$1($$0) {
  let r$1 = $$0;
  debugger;
  $(typeof r$1);
  return r$1;
};
const x = f(10);
$(x, typeof f);
`````

## Normalized


`````js filename=intro
const r$1 = function ($$0) {
  let r$2 = $$0;
  debugger;
  const tmpCalleeParam = typeof r$2;
  $(tmpCalleeParam);
  return r$2;
};
const f = r$1;
const x = f(10);
const tmpCalleeParam$1 = x;
const tmpCalleeParam$3 = typeof f;
$(tmpCalleeParam$1, tmpCalleeParam$3);
`````

## PST Settled
With rename=true

`````js filename=intro
$( "number" );
$( 10, "function" );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'number'
 - 2: 10, 'function'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
