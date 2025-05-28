# Preval test case

# regression.md

> While > Regression
>
> Tracking a regression from Tenko

## Input

`````js filename=intro
let cTmp = $;
let cTail = c;
while (true) {
  if ($) {
    cTail = $('keep');
    cTmp = $(cTmp);
  } else {
    cTmp = cTail;
  }
  break;
}
$(cTmp);
`````


## Settled


`````js filename=intro
const cTail /*:unknown*/ = c;
if ($) {
  $(`keep`);
  const tmpClusterSSA_cTmp /*:unknown*/ = $($);
  $(tmpClusterSSA_cTmp);
} else {
  $(cTail);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const cTail = c;
if ($) {
  $(`keep`);
  $($($));
} else {
  $(cTail);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = c;
if ($) {
  $( "keep" );
  const b = $( $ );
  $( b );
}
else {
  $( a );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let cTmp = $;
let cTail = c;
if ($) {
  cTail = $(`keep`);
  cTmp = $(cTmp);
  $(cTmp);
} else {
  cTmp = cTail;
  $(cTail);
}
`````


## Todos triggered


None


## Globals


BAD@! Found 1 implicit global bindings:

c


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
