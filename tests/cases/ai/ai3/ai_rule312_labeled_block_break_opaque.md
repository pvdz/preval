# Preval test case

# ai_rule312_labeled_block_break_opaque.md

> Ai > Ai3 > Ai rule312 labeled block break opaque
>
> Test: Labeled block with a break, containing opaque calls.

## Input

`````js filename=intro
// Expected: myLabel: { $('inside_before_break'); break myLabel; $('after_break_unreachable'); } $('outside');
myLabel: {
  $('inside_before_break');
  break myLabel;
  $('after_break_unreachable'); // This should be removed
}
$('outside');
`````


## Settled


`````js filename=intro
$(`inside_before_break`);
$(`outside`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`inside_before_break`);
$(`outside`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "inside_before_break" );
$( "outside" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
$(`inside_before_break`);
$(`outside`);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'inside_before_break'
 - 2: 'outside'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
