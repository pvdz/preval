# Preval test case

# ai_if_identical_branches.md

> Ai > Ai1 > Ai if identical branches
>
> Test: Redundant if statement with identical then and else branches.

## Input

`````js filename=intro
// Expected: let cond = $("C"); $("X"); $("Y"); $("D");
let cond = $("C");
if (cond) {
  $("X");
  $("Y");
} else {
  $("X");
  $("Y");
}
$("D");
`````


## Settled


`````js filename=intro
$(`C`);
$(`X`);
$(`Y`);
$(`D`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`C`);
$(`X`);
$(`Y`);
$(`D`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "C" );
$( "X" );
$( "Y" );
$( "D" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let cond = $(`C`);
if (cond) {
  $(`X`);
  $(`Y`);
  $(`D`);
} else {
  $(`X`);
  $(`Y`);
  $(`D`);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'C'
 - 2: 'X'
 - 3: 'Y'
 - 4: 'D'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
