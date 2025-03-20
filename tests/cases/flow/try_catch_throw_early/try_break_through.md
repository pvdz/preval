# Preval test case

# try_break_through.md

> Flow > Try catch throw early > Try break through
>
> The throw may leave the binding mutated anyways

## Input

`````js filename=intro
function f() {
  let x = 'fail';
  foo: {
    try {
      if ($) {
        return;
      } else {
        x = 'pass';
        throw 'too';
      }
      x = 'fail2'; // This is dead code either way
    } catch {
      $('caught');
    }
    $(x);
  }
}
f();
`````


## Settled


`````js filename=intro
if ($) {
} else {
  try {
    throw `too`;
  } catch (e) {
    $(`caught`);
  }
  $(`pass`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if (!$) {
  try {
    throw `too`;
  } catch (e) {
    $(`caught`);
  }
  $(`pass`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
if ($) {

}
else {
  try {
    throw "too";
  }
  catch (a) {
    $( "caught" );
  }
  $( "pass" );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
