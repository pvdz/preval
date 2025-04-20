# Preval test case

# parseint_observed.md

> Try escaping > Parseint observed
>
> Note: parseInt does coerce the arg to a string so we must consider it potentially observable
> This test case exemplifies that

## Input

`````js filename=intro
while (true) {
  const x = $({toString(){$('PASS')}}); // Observable
  try {
    const y = parseInt(x)
    $(y);
  } catch {}
}
`````


## Settled


`````js filename=intro
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpCalleeParam /*:object*/ = {
    toString() {
      debugger;
      $(`PASS`);
      return undefined;
    },
  };
  const x /*:unknown*/ = $(tmpCalleeParam);
  try {
    const y /*:number*/ = $Number_parseInt(x);
    $(y);
  } catch (e) {}
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
while (true) {
  const x = $({
    toString() {
      $(`PASS`);
    },
  });
  try {
    $($Number_parseInt(x));
  } catch (e) {}
}
`````


## PST Settled
With rename=true

`````js filename=intro
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const a = { toString(  ) {
    debugger;
    $( "PASS" );
    return undefined;
  } };
  const b = $( a );
  try {
    const c = $Number_parseInt( b );
    $( c );
  }
  catch (d) {

  }
}
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Number_parseInt
- (todo) objects in isFree check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { toString: '"<function>"' }
 - 2: 'PASS'
 - 3: NaN
 - 4: { toString: '"<function>"' }
 - 5: 'PASS'
 - 6: NaN
 - 7: { toString: '"<function>"' }
 - 8: 'PASS'
 - 9: NaN
 - 10: { toString: '"<function>"' }
 - 11: 'PASS'
 - 12: NaN
 - 13: { toString: '"<function>"' }
 - 14: 'PASS'
 - 15: NaN
 - 16: { toString: '"<function>"' }
 - 17: 'PASS'
 - 18: NaN
 - 19: { toString: '"<function>"' }
 - 20: 'PASS'
 - 21: NaN
 - 22: { toString: '"<function>"' }
 - 23: 'PASS'
 - 24: NaN
 - 25: { toString: '"<function>"' }
 - 26: 'PASS'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
