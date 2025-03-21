# Preval test case

# while_unconditional_break.md

> While > While unconditional break
>
> A loop where the body unconditionally breaks is not a loop

## Input

`````js filename=intro
// If a while(true) body ends with a break, and it does not 
// continue anywhere else, then the while(true) can be dropped, right...
let x = 1;
$(x);
A: {
  while (true) {
    $finally: {
      try {
        $(x);   // x=1 (while does not loop)
        x = 2;
        break $finally;
      } catch (_) {
      }
    }
    $(x);
    x = 3;
    break A;
  }
  $(x);    // unreachable
  x = 4;   // unreachable
}
$(x);
`````


## Settled


`````js filename=intro
let x /*:number*/ = 1;
$(1);
try {
  $(1);
  x = 2;
} catch (_) {}
$(x);
$(3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let x = 1;
$(1);
try {
  $(1);
  x = 2;
} catch (_) {}
$(x);
$(3);
`````


## PST Settled
With rename=true

`````js filename=intro
let a = 1;
$( 1 );
try {
  $( 1 );
  a = 2;
}
catch (b) {

}
$( a );
$( 3 );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 2
 - 4: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
