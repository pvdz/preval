# Preval test case

# looped_infi.md

> Array reads > Looped infi
>
> Inlining array properties

## Input

`````js filename=intro
const arr = [1, 2, 3];
while($LOOP_NO_UNROLLS_LEFT) {
  ++arr[0];
  $(arr[0]);
}
`````


## Settled


`````js filename=intro
const tmpFree /*:(primitive)=>number*/ = function $free($$0) {
  const tmpUpdVal /*:primitive*/ = $$0;
  debugger;
  const tmpUpdNum /*:number*/ = $coerce(tmpUpdVal, `number`);
  const tmpRet /*:number*/ = tmpUpdNum + 1;
  return tmpRet;
};
const arr /*:array*/ /*truthy*/ = [1, 2, 3];
while ($LOOP_NO_UNROLLS_LEFT) {
  const tmpUpdVal$1 /*:primitive*/ = arr[0];
  const tmpUpdInc /*:number*/ = $frfr(tmpFree, tmpUpdVal$1);
  arr[0] = tmpUpdInc;
  $(tmpUpdInc);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpFree = function $free(tmpUpdVal) {
  const tmpRet = Number(tmpUpdVal) + 1;
  return tmpRet;
};
const arr = [1, 2, 3];
while (true) {
  const tmpUpdInc = tmpFree(arr[0]);
  arr[0] = tmpUpdInc;
  $(tmpUpdInc);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function b($$0 ) {
  const c = $$0;
  debugger;
  const d = $coerce( c, "number" );
  const e = d + 1;
  return e;
};
const f = [ 1, 2, 3 ];
while ($LOOP_NO_UNROLLS_LEFT) {
  const g = f[ 0 ];
  const h = i( a, g );
  f[0] = h;
  $( h );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const arr = [1, 2, 3];
while ($LOOP_NO_UNROLLS_LEFT) {
  const tmpUpdObj = arr;
  const tmpUpdProp = 0;
  const tmpUpdVal = tmpUpdObj[tmpUpdProp];
  const tmpUpdNum = $coerce(tmpUpdVal, `number`);
  const tmpUpdInc = tmpUpdNum + 1;
  tmpUpdObj[tmpUpdProp] = tmpUpdInc;
  let tmpCalleeParam = arr[0];
  $(tmpCalleeParam);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2
 - 2: 3
 - 3: 4
 - 4: 5
 - 5: 6
 - 6: 7
 - 7: 8
 - 8: 9
 - 9: 10
 - 10: 11
 - 11: 12
 - 12: 13
 - 13: 14
 - 14: 15
 - 15: 16
 - 16: 17
 - 17: 18
 - 18: 19
 - 19: 20
 - 20: 21
 - 21: 22
 - 22: 23
 - 23: 24
 - 24: 25
 - 25: 26
 - 26: 27
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
