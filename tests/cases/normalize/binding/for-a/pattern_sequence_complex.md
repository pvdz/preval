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

## Settled


`````js filename=intro
$(1);
$(2);
const z /*:array*/ = [10, 20, 30];
const bindingPatternArrRoot /*:unknown*/ = $(z);
const arrPatternSplat /*:array*/ = [...bindingPatternArrRoot];
arrPatternSplat[0];
arrPatternSplat[1];
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(2);
const bindingPatternArrRoot = $([10, 20, 30]);
const arrPatternSplat = [...bindingPatternArrRoot];
arrPatternSplat[0];
arrPatternSplat[1];
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

## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$( 2 );
const a = [ 10, 20, 30 ];
const b = $( a );
const c = [ ...b ];
c[ 0 ];
c[ 1 ];
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: [10, 20, 30]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- inline computed array property read
