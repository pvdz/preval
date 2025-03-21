# Preval test case

# infin_reg.md

> Unroll loop with true > Infin reg
>
> This regression was infinitely looping
>
> This starts as `for (let i=-1; i>-5; ++i) $(i);`

## Input

`````js filename=intro
$(-1);
$(0);
$(1);
$(2);
let i = 3;
let tst = true;
while (tst) {
  $(i);
  i = i + 1;
  tst = i > -5;
}
`````


## Settled


`````js filename=intro
$(-1);
$(0);
$(1);
$(2);
$(3);
$(4);
$(5);
$(6);
$(7);
$(8);
$(9);
$(10);
$(11);
$(12);
$(13);
let tmpClusterSSA_i$2 /*:number*/ = 14;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(tmpClusterSSA_i$2);
  tmpClusterSSA_i$2 = tmpClusterSSA_i$2 + 1;
  const tmpClusterSSA_tst$1 /*:boolean*/ = tmpClusterSSA_i$2 > -5;
  if (tmpClusterSSA_tst$1) {
  } else {
    break;
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(-1);
$(0);
$(1);
$(2);
$(3);
$(4);
$(5);
$(6);
$(7);
$(8);
$(9);
$(10);
$(11);
$(12);
$(13);
let tmpClusterSSA_i$2 = 14;
while (true) {
  $(tmpClusterSSA_i$2);
  tmpClusterSSA_i$2 = tmpClusterSSA_i$2 + 1;
  if (!(tmpClusterSSA_i$2 > -5)) {
    break;
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
$( -1 );
$( 0 );
$( 1 );
$( 2 );
$( 3 );
$( 4 );
$( 5 );
$( 6 );
$( 7 );
$( 8 );
$( 9 );
$( 10 );
$( 11 );
$( 12 );
$( 13 );
let a = 14;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( a );
  a = a + 1;
  const b = a > -5;
  if (b) {

  }
  else {
    break;
  }
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: -1
 - 2: 0
 - 3: 1
 - 4: 2
 - 5: 3
 - 6: 4
 - 7: 5
 - 8: 6
 - 9: 7
 - 10: 8
 - 11: 9
 - 12: 10
 - 13: 11
 - 14: 12
 - 15: 13
 - 16: 14
 - 17: 15
 - 18: 16
 - 19: 17
 - 20: 18
 - 21: 19
 - 22: 20
 - 23: 21
 - 24: 22
 - 25: 23
 - 26: 24
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
