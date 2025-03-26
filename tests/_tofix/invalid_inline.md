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
$fail;
if ($) {
  $(`keep`);
  const tmpClusterSSA_cTmp /*:unknown*/ = $($);
  $(tmpClusterSSA_cTmp);
} else {
  $($fail);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$fail;
if ($) {
  $(`keep`);
  $($($));
} else {
  $($fail);
}
`````


## PST Settled
With rename=true

`````js filename=intro
$fail;
if ($) {
  $( "keep" );
  const a = $( $ );
  $( a );
}
else {
  $( $fail );
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
