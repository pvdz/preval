# Preval test case

# string_coercion_edge_cases.md

> String fusing > Ai > String coercion edge cases
>
> Test edge cases with string coercion and type handling

## Input

`````js filename=intro
const num = 42;
const bool = true;
const str = String($("test"));
const result = num + str + bool;
$(result);
`````


## Settled


`````js filename=intro
const tmpFree /*:(string)=>string*/ = function $free($$0) {
  const str$1 /*:string*/ = $$0;
  debugger;
  const tmpBinLhs /*:string*/ = 42 + str$1;
  const tmpRet /*:string*/ = tmpBinLhs + true;
  return tmpRet;
};
const tmpCalleeParam /*:unknown*/ = $(`test`);
const str /*:string*/ = $coerce(tmpCalleeParam, `string`);
const result /*:string*/ = $frfr(tmpFree, str);
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpFree = function $free(str$1) {
  const tmpRet = 42 + str$1 + true;
  return tmpRet;
};
$(tmpFree(String($(`test`))));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function $free($$0 ) {
  const b = $$0;
  debugger;
  const c = 42 + b;
  const d = c + true;
  return d;
};
const e = $( "test" );
const f = $coerce( e, "string" );
const g = h( a, f );
$( g );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const num = 42;
const bool = true;
let tmpCalleeParam = $(`test`);
const str = $coerce(tmpCalleeParam, `string`);
const tmpBinLhs = num + str;
const result = tmpBinLhs + bool;
$(result);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'test'
 - 2: '42testtrue'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
