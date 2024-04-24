# Preval test case

# var_pattern_for_in_func_top.md

> Normalize > Hoisting > Base > Var pattern for in func top
>
> Hosting in a block should end up in the parent

#TODO

## Input

`````js filename=intro
function f() {
  $(x);
  for (var [x] in {y: 100}) $(x, 'for');
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
  for ([x] in { y: 100 }) $(x, `for`);
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
  const tmpForInRhs = { y: 100 };
  let tmpForInLhsNode = undefined;
  for (tmpForInLhsNode in tmpForInRhs) {
    const arrAssignPatternRhs = tmpForInLhsNode;
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
let tmpForInLhsNode = undefined;
const tmpForInRhs = { y: 100 };
for (tmpForInLhsNode in tmpForInRhs) {
  const arrPatternSplat = [...tmpForInLhsNode];
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
let b = undefined;
const c = { y: 100 };
for (b in c) {
  const d = [ ... b,, ];
  a = d[ 0 ];
  $( a, "for" );
}
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: undefined
 - 2: 'y', 'for'
 - 3: 'y'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
