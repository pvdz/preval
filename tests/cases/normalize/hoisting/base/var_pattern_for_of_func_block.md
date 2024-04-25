# Preval test case

# var_pattern_for_of_func_block.md

> Normalize > Hoisting > Base > Var pattern for of func block
>
> Hosting in a block should end up in the parent

#TODO

## Input

`````js filename=intro
function f() {
  $(x);
  {
    for (var [x] of [[100]]) $(x, 'for');
  }
  $(x);
}
f();
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  let x = undefined;
  $(x);
  {
    for ([x] of [[100]]) $(x, `for`);
  }
  $(x);
};
f();
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  let x = undefined;
  $(x);
  const tmpArrElement = [100];
  const tmpForOfRhs = [tmpArrElement];
  let tmpForOfLhsNode = undefined;
  for (tmpForOfLhsNode of tmpForOfRhs) {
    const arrAssignPatternRhs = tmpForOfLhsNode;
    const arrPatternSplat = [...arrAssignPatternRhs];
    x = arrPatternSplat[0];
    $(x, `for`);
  }
  $(x);
  return undefined;
};
f();
`````

## Output

`````js filename=intro
let x = undefined;
$(undefined);
const tmpArrElement = [100];
const tmpForOfRhs = [tmpArrElement];
let tmpForOfLhsNode = undefined;
for (tmpForOfLhsNode of tmpForOfRhs) {
  const arrPatternSplat = [...tmpForOfLhsNode];
  x = arrPatternSplat[0];
  $(x, `for`);
}
$(x);
`````

## PST Output

With rename=true

`````js filename=intro
let a = undefined;
$( undefined );
const b = [ 100 ];
const c = [ b ];
let d = undefined;
for (d of c) {
  const e = [ ... d ];
  a = e[ 0 ];
  $( a, "for" );
}
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: undefined
 - 2: 100, 'for'
 - 3: 100
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
