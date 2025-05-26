# Preval test case

# if_fold_ternary_const_hard_72.md

> If test merging > If fold ternary const hard 72
>
> Hard Case 72: Scenario D - controlIf.then is empty, y=false in else

## Input

`````js filename=intro
let x = $(true);
let y = !x; // x=T,y=F; x=F,y=T

if (x); // Empty then block for controlIf
else {
  // x is false, y was true.
  y = false; // yMadeFalsyInElse = true
}

// If x=T, y was F, remains F.
// If x=F, y was T, becomes F.
// So y is always false.
if (y) {
  $('THEN');
} else {
  $('ELSE');
}

/* Expected output:
let x = $(true);
let y = !x;
if (x); 
else {
  y = false;
}
{ // Simplified from if(y)
  $('ELSE');
}
*/
`````


## Settled


`````js filename=intro
$(true);
$(`ELSE`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(true);
$(`ELSE`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( true );
$( "ELSE" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = $(true);
let y = !x;
if (x) {
} else {
  y = false;
}
if (y) {
  $(`THEN`);
} else {
  $(`ELSE`);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - 2: 'ELSE'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
