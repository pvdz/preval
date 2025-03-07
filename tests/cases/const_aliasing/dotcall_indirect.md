# Preval test case

# dotcall_indirect.md

> Const aliasing > Dotcall indirect
>
>

## Input

`````js filename=intro
const g = function(a){ $(a); };
const obj = {f: g};
const method = obj.f;
$(1);
$(2);
$dotCall(method, obj, 'f', 10);
`````

## Settled


`````js filename=intro
$(1);
$(2);
$(10);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(2);
$(10);
`````

## Pre Normal


`````js filename=intro
const g = function ($$0) {
  let a = $$0;
  debugger;
  $(a);
};
const obj = { f: g };
const method = obj.f;
$(1);
$(2);
$dotCall(method, obj, `f`, 10);
`````

## Normalized


`````js filename=intro
const g = function ($$0) {
  let a = $$0;
  debugger;
  $(a);
  return undefined;
};
const obj = { f: g };
const method = obj.f;
$(1);
$(2);
$dotCall(method, obj, `f`, 10);
`````

## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$( 2 );
$( 10 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
