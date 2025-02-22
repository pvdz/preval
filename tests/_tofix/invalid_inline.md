# Preval test case

# invalid_inline.md

> Tests > Tofix > Invalid inline
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

## Pre Normal


`````js filename=intro
let cTmp = $;
let cTail = $fail;
while (true) {
  if ($) {
    cTail = $(`keep`);
    cTmp = $(cTmp);
  } else {
    cTmp = cTail;
  }
  break;
}
$(cTmp);
`````

## Normalized


`````js filename=intro
let cTmp = $;
let cTail = $fail;
if ($) {
  cTail = $(`keep`);
  cTmp = $(cTmp);
} else {
  cTmp = cTail;
}
$(cTmp);
`````

## Output


`````js filename=intro
const cTail = $fail;
if ($) {
  $(`keep`);
  const tmpClusterSSA_cTmp = $($);
  $(tmpClusterSSA_cTmp);
} else {
  $(cTail);
}
`````

## PST Output

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

## Globals

BAD@! Found 1 implicit global bindings:

$fail

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
