# Preval test case

# auto_pattern_arr_s-seq.md

> Normalize > Expressions > Assignments > For c > Auto pattern arr s-seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let [a] = { a: 999, b: 1000 };
for (; $(1); [a] = ($(10), $(20), [1, 2]));
$(a);
`````

## Pre Normal

`````js filename=intro
let [a] = { a: 999, b: 1000 };
{
  while ($(1)) {
    [a] = ($(10), $(20), [1, 2]);
  }
}
$(a);
`````

## Normalized

`````js filename=intro
let bindingPatternArrRoot = { a: 999, b: 1000 };
let arrPatternSplat = [...bindingPatternArrRoot];
let a = arrPatternSplat[0];
let tmpIfTest = $(1);
while (true) {
  if (tmpIfTest) {
    $(10);
    $(20);
    const arrAssignPatternRhs = [1, 2];
    const arrPatternSplat$1 = [...arrAssignPatternRhs];
    a = arrPatternSplat$1[0];
    tmpIfTest = $(1);
  } else {
    break;
  }
}
$(a);
`````

## Output

`````js filename=intro
const bindingPatternArrRoot = { a: 999, b: 1000 };
const arrPatternSplat = [...bindingPatternArrRoot];
let a = arrPatternSplat[0];
let tmpIfTest = $(1);
if (tmpIfTest) {
  $(10);
  $(20);
  a = 1;
  tmpIfTest = $(1);
  while ($LOOP_UNROLL_10) {
    if (tmpIfTest) {
      $(10);
      $(20);
      tmpIfTest = $(1);
    } else {
      break;
    }
  }
} else {
}
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
a: 999,
b: 1000
;
const b = [ ... a,, ];
let c = b[ 0 ];
let d = $( 1 );
if (d) {
  $( 10 );
  $( 20 );
  c = 1;
  d = $( 1 );
  while ($LOOP_UNROLL_10) {
    if (d) {
      $( 10 );
      $( 20 );
      d = $( 1 );
    }
    else {
      break;
    }
  }
}
$( c );
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
