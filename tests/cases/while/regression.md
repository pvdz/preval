# Preval test case

# regression.md

> While > Regression
>
> Tracking a regression from Tenko

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
c;
if ($) {
  $(`keep`);
  const tmpClusterSSA_cTmp = $($);
  $(tmpClusterSSA_cTmp);
} else {
  c;
  $(c);
}
`````

## PST Output

With rename=true

`````js filename=intro
c;
if ($) {
  $( "keep" );
  const a = $( $ );
  $( a );
}
else {
  c;
  $( c );
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
