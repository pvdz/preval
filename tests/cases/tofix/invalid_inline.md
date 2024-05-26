# Preval test case

# invalid_inline.md

> Tofix > Invalid inline
>
> The output has a ` $($);` which is invalid because $ is an unknown global and may have been updated between initial assignment and a call to itself.
> Additionally, and separately, `if ($) {} else { x = y; $(); }` must throw so we should be able to infer that.

#TODO

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

## Pre Normal

`````js filename=intro
let cTmp = $;
let cTail = c;
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
let cTail = c;
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

## Output

`````js filename=intro
let cTmp = $;
let cTail = c;
if ($) {
  cTail = $(`keep`);
  cTmp = $($);
  $(cTmp);
} else {
  cTmp = cTail;
  $(cTmp);
}
`````

## PST Output

With rename=true

`````js filename=intro
let a = $;
let b = c;
if ($) {
  b = $( "keep" );
  a = $( $ );
  $( a );
}
else {
  a = b;
  $( a );
}
`````

## Globals

BAD@! Found 1 implicit global bindings:

c

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
