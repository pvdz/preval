# Preval test case

# try_catch_throw.md

> Flow > Try no throw > Try catch throw
>
> The throw may leave the binding mutated anyways

## Input

`````js filename=intro
function f() {
  let x = 'fail';
  try {
    x = 'pass';
    throw 'yes';
  } catch {
    $('caught');
  }
  $(x);
}
f();
`````


## Settled


`````js filename=intro
try {
  throw `yes`;
} catch (e) {
  $(`caught`);
}
$(`pass`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
try {
  throw `yes`;
} catch (e) {
  $(`caught`);
}
$(`pass`);
`````


## PST Settled
With rename=true

`````js filename=intro
try {
  throw "yes";
}
catch (a) {
  $( "caught" );
}
$( "pass" );
`````


## Todos triggered


- (todo) can try-escaping support this expr node type? TemplateLiteral


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'caught'
 - 2: 'pass'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
