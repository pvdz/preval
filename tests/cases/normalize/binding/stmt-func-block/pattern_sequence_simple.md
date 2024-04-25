# Preval test case

# pattern_sequence_simple.md

> Normalize > Binding > Stmt-func-block > Pattern sequence simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
function f(){
if ($(true)) {
let x = 1, y = 2, z = [10, 20, 30];
  let [a, b] = ($(x), $(y), z);
  $(a, b, x, y, z);
}
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  if ($(true)) {
    let x = 1,
      y = 2,
      z = [10, 20, 30];
    let [a, b] = ($(x), $(y), z);
    $(a, b, x, y, z);
  }
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  const tmpIfTest = $(true);
  if (tmpIfTest) {
    let x = 1;
    let y = 2;
    let z = [10, 20, 30];
    $(x);
    $(y);
    let bindingPatternArrRoot = z;
    let arrPatternSplat = [...bindingPatternArrRoot];
    let a = arrPatternSplat[0];
    let b = arrPatternSplat[1];
    $(a, b, x, y, z);
    return undefined;
  } else {
    return undefined;
  }
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpIfTest = $(true);
if (tmpIfTest) {
  $(1);
  $(2);
  const z = [10, 20, 30];
  const arrPatternSplat = [...z];
  const a = arrPatternSplat[0];
  const b = arrPatternSplat[1];
  $(a, b, 1, 2, z);
} else {
}
$(undefined);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( true );
if (a) {
  $( 1 );
  $( 2 );
  const b = [ 10, 20, 30 ];
  const c = [ ... b ];
  const d = c[ 0 ];
  const e = c[ 1 ];
  $( d, e, 1, 2, b );
}
$( undefined );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - 2: 1
 - 3: 2
 - 4: 10, 20, 1, 2, [10, 20, 30]
 - 5: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
