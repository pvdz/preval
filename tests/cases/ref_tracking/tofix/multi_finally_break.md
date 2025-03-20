# Preval test case

# multi_finally_break.md

> Ref tracking > Tofix > Multi finally break
>
>

## Input

`````js filename=intro
let x = 1;
foo: {
  try {
    try { 
      x = 2;
      break foo;
    } finally {
      x = 3 
    }
  } finally {
    x = 4
  }
}
$(x); // x=4
`````


## Settled


`````js filename=intro
$(4);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(4);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 4 );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 4
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
