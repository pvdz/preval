# Preval test case

# invalid_inline.md

> Tofix > invalid inline
>
> The output has a ` $($);` which is invalid because $ is an unknown global
> and may have been updated between initial assignment and a call to itself.
>
> Additionally, and separately, `if ($) {} else { x = y; $(); }` must throw
> so we should be able to infer that.

## Input

`````js filename=intro
let cTmp = $;
let cTail = $fail;
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
const cTail /*:unknown*/ = $fail;
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
const cTail = $fail;
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
const a = $fail;
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
let cTail = $fail;
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

$fail


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
