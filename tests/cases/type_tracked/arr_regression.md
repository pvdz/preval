# Preval test case

# arr_regression.md

> Type tracked > Arr regression
>
> Some kind of strange regression caused the dual-typed array to be considered a mono-typeof number.

## Input

`````js filename=intro
const dual_data_arr = [0, `PASS`];
// Note: the loop prevent(ed) the array from being inlined.
// Somehow, mustBeType for the array contents ended up as number, rather than string|number
// so the === must fail in that case. But that's obviously incorrect.
while (true) {
  $('PASS' === dual_data_arr[1]);
}
`````


## Settled


`````js filename=intro
while ($LOOP_NO_UNROLLS_LEFT) {
  $(false);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
while (true) {
  $(false);
}
`````


## PST Settled
With rename=true

`````js filename=intro
while ($LOOP_NO_UNROLLS_LEFT) {
  $( false );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const dual_data_arr = [0, `PASS`];
while (true) {
  const tmpBinBothLhs = `PASS`;
  const tmpBinBothRhs = dual_data_arr[1];
  let tmpCalleeParam = tmpBinBothLhs === tmpBinBothRhs;
  $(tmpCalleeParam);
}
`````


## Todos triggered


- (todo) do we want to support ArrayExpression as expression statement in free loops?


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - 2: true
 - 3: true
 - 4: true
 - 5: true
 - 6: true
 - 7: true
 - 8: true
 - 9: true
 - 10: true
 - 11: true
 - 12: true
 - 13: true
 - 14: true
 - 15: true
 - 16: true
 - 17: true
 - 18: true
 - 19: true
 - 20: true
 - 21: true
 - 22: true
 - 23: true
 - 24: true
 - 25: true
 - 26: true
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: BAD!!
 - !1: false
 - !2: false
 - !3: false
 - !4: false
 - !5: false
 - !6: false
 - !7: false
 - !8: false
 - !9: false
 - !10: false
 - !11: false
 - !12: false
 - !13: false
 - !14: false
 - !15: false
 - !16: false
 - !17: false
 - !18: false
 - !19: false
 - !20: false
 - !21: false
 - !22: false
 - !23: false
 - !24: false
 - !25: false
 - !26: false
 -  eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Denormalized calls: BAD!!
 - !1: false
 - !2: false
 - !3: false
 - !4: false
 - !5: false
 - !6: false
 - !7: false
 - !8: false
 - !9: false
 - !10: false
 - !11: false
 - !12: false
 - !13: false
 - !14: false
 - !15: false
 - !16: false
 - !17: false
 - !18: false
 - !19: false
 - !20: false
 - !21: false
 - !22: false
 - !23: false
 - !24: false
 - !25: false
 - !26: false
 -  eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')
