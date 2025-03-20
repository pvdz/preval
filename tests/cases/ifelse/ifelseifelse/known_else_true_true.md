# Preval test case

# known_else_true_true.md

> Ifelse > Ifelseifelse > Known else true true
>
> Common pattern of doing if-elseif-else after normalization. Will want to test all variations of known and unknown booleans, as well as which branch updates the condition.

## Input

`````js filename=intro
let condition = true;
const f = function() {
  if (condition) {
    $('a');
  } else {
    $('b');
  }
};
if (condition) {
  f();
} else {
  condition = true;
  f();
}
`````


## Settled


`````js filename=intro
$(`a`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`a`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "a" );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'a'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
