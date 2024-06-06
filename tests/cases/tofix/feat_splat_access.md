# Preval test case

# feat_splat_access.md

> Tofix > Feat splat access
>
> Normalization of assignments should work the same everywhere they are

index access of property result of splat is not observable so the index access can be eliminated

existing test

## Input

`````js filename=intro
let [a] = { a: 999, b: 1000 };
for (; ([a] = ($(10), $(20), [1, 2])); $(1));
$(a);
`````

## Pre Normal

`````js filename=intro
let [a] = { a: 999, b: 1000 };
{
  while (([a] = ($(10), $(20), [1, 2]))) {
    $(1);
  }
}
$(a);
`````

## Normalized

`````js filename=intro
let bindingPatternArrRoot = { a: 999, b: 1000 };
let arrPatternSplat = [...bindingPatternArrRoot];
let a = arrPatternSplat[0];
while (true) {
  let tmpIfTest = undefined;
  $(10);
  $(20);
  const tmpNestedAssignArrPatternRhs = [1, 2];
  const arrPatternSplat$1 = [...tmpNestedAssignArrPatternRhs];
  a = arrPatternSplat$1[0];
  tmpIfTest = tmpNestedAssignArrPatternRhs;
  if (tmpIfTest) {
    $(1);
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
arrPatternSplat[0];
$(10);
$(20);
$(1);
$(10);
$(20);
$(1);
$(10);
$(20);
$(1);
$(10);
$(20);
$(1);
$(10);
$(20);
$(1);
$(10);
$(20);
$(1);
$(10);
$(20);
$(1);
$(10);
$(20);
$(1);
$(10);
$(20);
$(1);
$(10);
$(20);
$(1);
$(10);
$(20);
$(1);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(10);
  $(20);
  $(1);
}
$(1);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
a: 999,
b: 1000
;
const b = [ ... a ];
b[ 0 ];
$( 10 );
$( 20 );
$( 1 );
$( 10 );
$( 20 );
$( 1 );
$( 10 );
$( 20 );
$( 1 );
$( 10 );
$( 20 );
$( 1 );
$( 10 );
$( 20 );
$( 1 );
$( 10 );
$( 20 );
$( 1 );
$( 10 );
$( 20 );
$( 1 );
$( 10 );
$( 20 );
$( 1 );
$( 10 );
$( 20 );
$( 1 );
$( 10 );
$( 20 );
$( 1 );
$( 10 );
$( 20 );
$( 1 );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( 10 );
  $( 20 );
  $( 1 );
}
$( 1 );
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
