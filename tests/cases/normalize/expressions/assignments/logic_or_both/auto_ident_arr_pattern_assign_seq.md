# Preval test case

# auto_ident_arr_pattern_assign_seq.md

> normalize > expressions > assignments > logic_or_both > auto_ident_arr_pattern_assign_seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let x = 1,
  y = 2;

let a = { a: 999, b: 1000 };
$(
  (a = [x, y] = ($(x), $(y), [$(3), $(4)])) ||
    (a = [x, y] = ($(x), $(y), [$(3), $(4)]))
);
$(a, x, y);
`````

## Normalized

`````js filename=intro
let x = 1;
let y = 2;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
$(x);
$(y);
const tmpArrElement = $(3);
const tmpArrElement$1 = $(4);
const tmpNestedAssignArrPatternRhs = [tmpArrElement, tmpArrElement$1];
const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
x = arrPatternSplat[0];
y = arrPatternSplat[1];
a = tmpNestedAssignArrPatternRhs;
let tmpCalleeParam = a;
if (tmpCalleeParam) {
} else {
  let tmpNestedComplexRhs;
  $(x);
  $(y);
  const tmpArrElement$2 = $(3);
  const tmpArrElement$3 = $(4);
  const tmpNestedAssignArrPatternRhs$1 = [tmpArrElement$2, tmpArrElement$3];
  const arrPatternSplat$1 = [...tmpNestedAssignArrPatternRhs$1];
  x = arrPatternSplat$1[0];
  y = arrPatternSplat$1[1];
  tmpNestedComplexRhs = tmpNestedAssignArrPatternRhs$1;
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
tmpCallCallee(tmpCalleeParam);
$(a, x, y);
`````

## Output

`````js filename=intro
let x = 1;
let y = 2;
let a = { a: 999, b: 1000 };
$(x);
$(y);
const tmpArrElement = $(3);
const tmpArrElement$1 = $(4);
const tmpNestedAssignArrPatternRhs = [tmpArrElement, tmpArrElement$1];
const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
x = arrPatternSplat[0];
y = arrPatternSplat[1];
a = tmpNestedAssignArrPatternRhs;
let tmpCalleeParam = a;
if (tmpCalleeParam) {
} else {
  $(x);
  $(y);
  const tmpArrElement$2 = $(3);
  const tmpArrElement$3 = $(4);
  const tmpNestedAssignArrPatternRhs$1 = [tmpArrElement$2, tmpArrElement$3];
  const arrPatternSplat$1 = [...tmpNestedAssignArrPatternRhs$1];
  x = arrPatternSplat$1[0];
  y = arrPatternSplat$1[1];
  const tmpNestedComplexRhs = tmpNestedAssignArrPatternRhs$1;
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
$(tmpCalleeParam);
$(a, x, y);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 3
 - 4: 4
 - 5: [3, 4]
 - 6: [3, 4], 3, 4
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
