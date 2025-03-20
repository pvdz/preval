# Preval test case

# var_prop.md

> Try escaping > Var prop
>
> Typical rotation obfuscation.

## Input

`````js filename=intro
{
  const arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k'];
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    try {
      const a = arr[286];
      $(a);
      if (a) {
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
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  try {
    $(undefined);
  } catch (P) {
    $(`fail`);
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
while (true) {
  try {
    $(undefined);
  } catch (P) {
    $(`fail`);
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  try {
    $( undefined );
  }
  catch (a) {
    $( "fail" );
  }
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: undefined
 - 2: undefined
 - 3: undefined
 - 4: undefined
 - 5: undefined
 - 6: undefined
 - 7: undefined
 - 8: undefined
 - 9: undefined
 - 10: undefined
 - 11: undefined
 - 12: undefined
 - 13: undefined
 - 14: undefined
 - 15: undefined
 - 16: undefined
 - 17: undefined
 - 18: undefined
 - 19: undefined
 - 20: undefined
 - 21: undefined
 - 22: undefined
 - 23: undefined
 - 24: undefined
 - 25: undefined
 - 26: undefined
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
