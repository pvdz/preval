# Preval test case

# pattern_sequence_complex.md

> Normalize > Binding > Stmt-func-top > Pattern sequence complex
>
> Assignments of all kinds should be normalized in all circumstances

## Input

`````js filename=intro
function f() {
  let x = 1, y = 2, z = [10, 20, 30];
  let [a, b] = ($(x), $(y), $(z));
  $(a, b, x, y, z);
}
$(f());
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  let x = 1,
    y = 2,
    z = [10, 20, 30];
  let [a, b] = ($(x), $(y), $(z));
  $(a, b, x, y, z);
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  let x = 1;
  let y = 2;
  let z = [10, 20, 30];
  $(x);
  $(y);
  let bindingPatternArrRoot = $(z);
  let arrPatternSplat = [...bindingPatternArrRoot];
  let a = arrPatternSplat[0];
  let b = arrPatternSplat[1];
  $(a, b, x, y, z);
  return undefined;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
$(1);
$(2);
const z /*:array*/ = [10, 20, 30];
const bindingPatternArrRoot /*:unknown*/ = $(z);
const arrPatternSplat /*:array*/ = [...bindingPatternArrRoot];
const a /*:unknown*/ = arrPatternSplat[0];
const b /*:unknown*/ = arrPatternSplat[1];
$(a, b, 1, 2, z);
$(undefined);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
$( 2 );
const a = [ 10, 20, 30 ];
const b = $( a );
const c = [ ...b ];
const d = c[ 0 ];
const e = c[ 1 ];
$( d, e, 1, 2, a );
$( undefined );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: [10, 20, 30]
 - 4: 10, 20, 1, 2, [10, 20, 30]
 - 5: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
