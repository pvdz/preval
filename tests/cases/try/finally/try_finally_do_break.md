# Preval test case

# try_finally_do_break.md

> Try > Finally > Try finally do break
>
> Finally transform checks

## Input

`````js filename=intro
do {
  try {
    $(1);
  } finally {
    $(2);
    break;
  }
} while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE)
$(3);
`````


## Settled


`````js filename=intro
try {
  $(1);
} catch ($finalImplicit) {}
$(2);
$(3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
try {
  $(1);
} catch ($finalImplicit) {}
$(2);
$(3);
`````


## PST Settled
With rename=true

`````js filename=intro
try {
  $( 1 );
}
catch (a) {

}
$( 2 );
$( 3 );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
