# Preval test case

# delete.md

> Try escaping > Delete
>
> Typical rotation obfuscation.

## Input

`````js filename=intro
{
  const arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k'];
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    try {
      const x = arr[1];
      $(x);
      delete arr[1];
      if ($()) {
        break;
      } else {
        
      }
    } catch (P) {
      $('fail');
    }
  }
}
`````


## Settled


`````js filename=intro
const arr /*:array*/ = [`a`, `b`, `c`, `d`, `e`, `f`, `g`, `h`, `i`, `j`, `k`];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const x /*:primitive*/ = arr[1];
  try {
    $(x);
    delete arr[1];
    const tmpIfTest /*:unknown*/ = $();
    if (tmpIfTest) {
      break;
    } else {
    }
  } catch (P) {
    $(`fail`);
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const arr = [`a`, `b`, `c`, `d`, `e`, `f`, `g`, `h`, `i`, `j`, `k`];
while (true) {
  const x = arr[1];
  try {
    $(x);
    delete arr[1];
    if ($()) {
      break;
    }
  } catch (P) {
    $(`fail`);
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k" ];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const b = a[ 1 ];
  try {
    $( b );
    delete a[ 1 ];
    const c = $();
    if (c) {
      break;
    }
  }
  catch (d) {
    $( "fail" );
  }
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'b'
 - 2: 
 - 3: undefined
 - 4: 
 - 5: undefined
 - 6: 
 - 7: undefined
 - 8: 
 - 9: undefined
 - 10: 
 - 11: undefined
 - 12: 
 - 13: undefined
 - 14: 
 - 15: undefined
 - 16: 
 - 17: undefined
 - 18: 
 - 19: undefined
 - 20: 
 - 21: undefined
 - 22: 
 - 23: undefined
 - 24: 
 - 25: undefined
 - 26: 
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
