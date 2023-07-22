# Preval test case

# auto_pattern_arr_c-seq.md

> Normalize > Expressions > Statement > For c > Auto pattern arr c-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let [a] = { a: 999, b: 1000 };
for (; $(1); $(10), $(20), $([1, 2]));
$(a);
`````

## Pre Normal

`````js filename=intro
let [a] = { a: 999, b: 1000 };
{
  while ($(1)) {
    $(10), $(20), $([1, 2]);
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
    const tmpCallCallee = $;
    const tmpCalleeParam = [1, 2];
    tmpCallCallee(tmpCalleeParam);
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
let tmpIfTest = $(1);
let $tmpLoopUnrollCheck = true;
if (tmpIfTest) {
  $(10);
  $(20);
  const tmpCalleeParam = [1, 2];
  $(tmpCalleeParam);
  tmpIfTest = $(1);
} else {
  $tmpLoopUnrollCheck = false;
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_10) {
    if (tmpIfTest) {
      $(10);
      $(20);
      const tmpCalleeParam$1 = [1, 2];
      $(tmpCalleeParam$1);
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
const c = b[ 0 ];
let d = $( 1 );
let e = true;
if (d) {
  $( 10 );
  $( 20 );
  const f = [ 1, 2,, ];
  $( f );
  d = $( 1 );
}
else {
  e = false;
}
if (e) {
  while ($LOOP_UNROLL_10) {
    if (d) {
      $( 10 );
      $( 20 );
      const g = [ 1, 2,, ];
      $( g );
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
