# Preval test case

# dupe_label.md

> Function > Constructor > Dupe label
>
> Label state should also clone

## Input

`````js filename=intro
const test = $(true, 1);
label_x: {
  const f = Function(`label_x: { if (test) break label_x; return 100; } return 500`);
  $(f(), 3);
  break label_x;
}
$('end');
`````


## Settled


`````js filename=intro
$(true, 1);
if (test) {
  $(500, 3);
  $(`end`);
} else {
  $(100, 3);
  $(`end`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(true, 1);
if (test) {
  $(500, 3);
  $(`end`);
} else {
  $(100, 3);
  $(`end`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
$( true, 1 );
if (test) {
  $( 500, 3 );
  $( "end" );
}
else {
  $( 100, 3 );
  $( "end" );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const test$1 = $(true, 1);
const f = function () {
  debugger;
  label_x$2: {
    if (test) {
      break label_x$2;
    } else {
      return 100;
    }
  }
  return 500;
};
let tmpCalleeParam = f();
$(tmpCalleeParam, 3);
$(`end`);
`````


## Todos triggered


None


## Globals


BAD@! Found 1 implicit global bindings:

test


## Runtime Outcome


Should call `$` with:
 - 1: true, 1
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
