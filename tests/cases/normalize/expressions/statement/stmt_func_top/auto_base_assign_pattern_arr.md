# Preval test case

# auto_base_assign_pattern_arr.md

> Normalize > Expressions > Statement > Stmt func top > Auto base assign pattern arr
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
function f() {
  let b = [];

  let a = { a: 999, b: 1000 };
  [b] = $([$(2)]);
  $(a, b);
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  let b = [];
  let a = { a: 999, b: 1000 };
  [b] = $([$(2)]);
  $(a, b);
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  let b = [];
  let a = { a: 999, b: 1000 };
  const tmpCallCallee = $;
  const tmpArrElement = $(2);
  const tmpCalleeParam = [tmpArrElement];
  const arrAssignPatternRhs = tmpCallCallee(tmpCalleeParam);
  const arrPatternSplat = [...arrAssignPatternRhs];
  b = arrPatternSplat[0];
  $(a, b);
};
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = f();
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Output

`````js filename=intro
const f = function () {
  const a = { a: 999, b: 1000 };
  const tmpArrElement = $(2);
  const tmpCalleeParam = [tmpArrElement];
  const arrAssignPatternRhs = $(tmpCalleeParam);
  const arrPatternSplat = [...arrAssignPatternRhs];
  const SSA_b = arrPatternSplat[0];
  $(a, SSA_b);
};
const tmpCalleeParam$1 = f();
$(tmpCalleeParam$1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - 2: [2]
 - 3: { a: '999', b: '1000' }, 2
 - 4: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
