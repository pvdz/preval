# Preval test case

# auto_pattern_arr_s-seq.md

> Normalize > Expressions > Statement > For c > Auto pattern arr s-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let [a] = { a: 999, b: 1000 };
for (; $(1); $(10), $(20), [1, 2]);
$(a);
`````

## Pre Normal


`````js filename=intro
let [a] = { a: 999, b: 1000 };
{
  while ($(1)) {
    $(10), $(20), [1, 2];
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
const a = arrPatternSplat[0];
const tmpIfTest = $(1);
if (tmpIfTest) {
  $(10);
  $(20);
  let tmpClusterSSA_tmpIfTest = $(1);
  while ($LOOP_UNROLL_10) {
    if (tmpClusterSSA_tmpIfTest) {
      $(10);
      $(20);
      tmpClusterSSA_tmpIfTest = $(1);
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
const b = [ ... a ];
const c = b[ 0 ];
const d = $( 1 );
if (d) {
  $( 10 );
  $( 20 );
  let e = $( 1 );
  while ($LOOP_UNROLL_10) {
    if (e) {
      $( 10 );
      $( 20 );
      e = $( 1 );
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
