# Preval test case

# known_if_true_false.md

> Ifelse > Ifelseifelse > Known if true false
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
  condition = false;
  f();
} else {
  f();
}
`````


## Settled


`````js filename=intro
$(`b`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`b`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "b" );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'b'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
