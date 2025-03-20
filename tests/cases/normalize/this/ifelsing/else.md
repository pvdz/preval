# Preval test case

# else.md

> Normalize > This > Ifelsing > Else
>
> Test various ways in which `this` can occur

## Input

`````js filename=intro
const a = {
  foo: 10,
  f: function f() {
    if ($(0)) {
      $('fail');
    } else {
      return this.foo;
    }
  }
};
$(a.f());
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(0);
if (tmpIfTest) {
  $(`fail`);
  $(undefined);
} else {
  $(10);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(0)) {
  $(`fail`);
  $(undefined);
} else {
  $(10);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 0 );
if (a) {
  $( "fail" );
  $( undefined );
}
else {
  $( 10 );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0
 - 2: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
