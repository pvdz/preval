# Preval test case

# decl_after_looped.md

> Normalize > Dce > Return > Decl after looped
>
> Can we DCE without worrying about things?

We have to be careful not to leave `x` as being an implicit global.

When eliminating dead code we can scan for any declarations and either mark all usages as invalid/dead, or hoist the decl above the return without breaking the TDZ error.

Single loop doesn't change anything because the let is block scoped.

## Input

`````js filename=intro
function f() {
  while (true) {
    if ($(false)) {
      x = $('fail too');
    }
    return;
      
    let x = $('fail');
  }
}
$(f());
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(false);
if (tmpIfTest) {
  $(`fail too`);
  throw `Preval: TDZ triggered for this assignment: x = \$('fail too')`;
} else {
  $(undefined);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(false)) {
  $(`fail too`);
  throw `Preval: TDZ triggered for this assignment: x = \$('fail too')`;
} else {
  $(undefined);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( false );
if (a) {
  $( "fail too" );
  throw "Preval: TDZ triggered for this assignment: x = $('fail too')";
}
else {
  $( undefined );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  while (true) {
    const tmpIfTest = $(false);
    if (tmpIfTest) {
      $(`fail too`);
      throw `Preval: TDZ triggered for this assignment: x = \$('fail too')`;
    } else {
      return undefined;
      let x = $(`fail`);
    }
  }
  return undefined;
};
let tmpCalleeParam = f();
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: false
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
