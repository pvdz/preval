# Preval test case

# auto_pattern_arr_c-seq.md

> Normalize > Expressions > Statement > Do while > Auto pattern arr c-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let [a] = { a: 999, b: 1000 };
do {
  $(100);
} while (($(10), $(20), $([1, 2])));
$(a);
`````

## Pre Normal

`````js filename=intro
let [a] = { a: 999, b: 1000 };
{
  let tmpDoWhileFlag = true;
  while (tmpDoWhileFlag) {
    {
      $(100);
    }
    tmpDoWhileFlag = ($(10), $(20), $([1, 2]));
  }
}
$(a);
`````

## Normalized

`````js filename=intro
let bindingPatternArrRoot = { a: 999, b: 1000 };
let arrPatternSplat = [...bindingPatternArrRoot];
let a = arrPatternSplat[0];
let tmpDoWhileFlag = true;
while (true) {
  if (tmpDoWhileFlag) {
    $(100);
    $(10);
    $(20);
    const tmpCallCallee = $;
    const tmpCalleeParam = [1, 2];
    tmpDoWhileFlag = tmpCallCallee(tmpCalleeParam);
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
$(100);
$(10);
$(20);
const tmpCalleeParam = [1, 2];
let tmpDoWhileFlag = $(tmpCalleeParam);
if (tmpDoWhileFlag) {
  $(100);
  $(10);
  $(20);
  const tmpCalleeParam$1 = [1, 2];
  tmpDoWhileFlag = $(tmpCalleeParam$1);
  while ($LOOP_UNROLL_9) {
    if (tmpDoWhileFlag) {
      $(100);
      $(10);
      $(20);
      const tmpCalleeParam$2 = [1, 2];
      tmpDoWhileFlag = $(tmpCalleeParam$2);
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
$( 100 );
$( 10 );
$( 20 );
const d = [ 1, 2,, ];
let e = $( d );
if (e) {
  $( 100 );
  $( 10 );
  $( 20 );
  const f = [ 1, 2,, ];
  e = $( f );
  while ($LOOP_UNROLL_9) {
    if (e) {
      $( 100 );
      $( 10 );
      $( 20 );
      const g = [ 1, 2,, ];
      e = $( g );
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
