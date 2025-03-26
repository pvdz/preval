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
  const tmpClusterSSA_cTmp /*:unknown*/ = $($);
  $(tmpClusterSSA_cTmp);
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
