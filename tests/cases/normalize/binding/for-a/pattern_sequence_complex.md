# Preval test case

# pattern_sequence_complex.md

> Normalize > Binding > For-a > Pattern sequence complex
>
> Assignments of all kinds should be normalized in all circumstances

## Input

`````js filename=intro
let a = 1, b = 2, z = [10, 20, 30];
for (let [x, y] = ($(a), $(b), $(z));false;) $(a, b, x, y, z);
`````

## Pre Normal


`````js filename=intro
let a = 1,
  b = 2,
  z = [10, 20, 30];
{
  let [x, y] = ($(a), $(b), $(z));
  while (false) {
    $(a, b, x, y, z);
  }
}
`````

## Normalized


`````js filename=intro
let a = 1;
let b = 2;
let z = [10, 20, 30];
$(a);
$(b);
let bindingPatternArrRoot = $(z);
let arrPatternSplat = [...bindingPatternArrRoot];
let x = arrPatternSplat[0];
let y = arrPatternSplat[1];
`````

## Output


`````js filename=intro
$(1);
$(2);
const z = [10, 20, 30];
const bindingPatternArrRoot = $(z);
const arrPatternSplat = [...bindingPatternArrRoot];
arrPatternSplat[0];
arrPatternSplat[1];
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
$( 2 );
const a = [ 10, 20, 30 ];
const b = $( a );
const c = [ ... b ];
c[ 0 ];
c[ 1 ];
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: [10, 20, 30]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
