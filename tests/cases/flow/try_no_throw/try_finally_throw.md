# Preval test case

# try_finally_throw.md

> Flow > Try no throw > Try finally throw
>
> The throw may leave the binding mutated anyways

## Input

`````js filename=intro
function f() {
  let x = 'fail';
  try {
    x = 'pass';
    throw 'yes';
  } finally {
    $('still throws');
    $(x); // but we can observe x here
  }
  $(x);
}
f();
`````


## Settled


`````js filename=intro
$(`still throws`);
$(`pass`);
throw `yes`;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`still throws`);
$(`pass`);
throw `yes`;
`````


## PST Settled
With rename=true

`````js filename=intro
$( "still throws" );
$( "pass" );
throw "yes";
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'still throws'
 - 2: 'pass'
 - eval returned: ('<crash[ yes ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
