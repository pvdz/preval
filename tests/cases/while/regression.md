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
c;
if ($) {
  $(`keep`);
  const cTmp /*:unknown*/ = $($);
  $(cTmp);
} else {
  $(c);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
c;
if ($) {
  $(`keep`);
  $($($));
} else {
  $(c);
}
`````


## PST Settled
With rename=true

`````js filename=intro
c;
if ($) {
  $( "keep" );
  const a = $( $ );
  $( a );
}
else {
  $( c );
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
