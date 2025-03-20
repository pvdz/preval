# Preval test case

# nested_break2.md

> Labels > Nested break2
>
> At the time of creating this test, the nested labels a&b were not eliminated.
> There's a normalization step that will merge them.

## Input

`````js filename=intro
a: {
  b: {
    while (true) {
      if ($(0)) {
        $(1);
        break a;
      }
      else {
        $(2);
        break b;
      }
    }
    $(3);
  }
}
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(0);
if (tmpIfTest) {
  $(1);
} else {
  $(2);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(0)) {
  $(1);
} else {
  $(2);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 0 );
if (a) {
  $( 1 );
}
else {
  $( 2 );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0
 - 2: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
