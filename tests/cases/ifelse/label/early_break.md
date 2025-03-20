# Preval test case

# early_break.md

> Ifelse > Label > Early break
>
>

## Input

`````js filename=intro
function f() {
  foo: {
    if ($(true)) {
      $(100);
      break foo;
      $('fail');
    }
  }
  $('after');
}

f();
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(true);
if (tmpIfTest) {
  $(100);
  $(`after`);
} else {
  $(`after`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(true)) {
  $(100);
  $(`after`);
} else {
  $(`after`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( true );
if (a) {
  $( 100 );
  $( "after" );
}
else {
  $( "after" );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - 2: 100
 - 3: 'after'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
