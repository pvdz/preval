# Preval test case

# regression2.md

> While > Regression2
>
> Tracking a regression from Tenko

## Input

`````js filename=intro
  let cTmp = $(1);
  let cTail = 'fail';
  let n = 0;
  while (true) {
    n = n + 1;
    const tmpIfTest = n < 2;
    if (tmpIfTest) {
      cTail = 'pass';
      cTmp = $(3);
    } else {
      cTmp = cTail;
      break;
    }
  }
  $(cTmp);
`````


## Settled


`````js filename=intro
$(1);
$(3);
$(`pass`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(3);
$(`pass`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$( 3 );
$( "pass" );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 3
 - 3: 'pass'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
