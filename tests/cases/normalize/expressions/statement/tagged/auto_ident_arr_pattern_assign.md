# Preval test case

# auto_ident_arr_pattern_assign.md

> normalize > expressions > statement > tagged > auto_ident_arr_pattern_assign
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let x = 1,
  y = 2;

let a = { a: 999, b: 1000 };
$`before ${([x, y] = [$(3), $(4)])} after`;
$(a, x, y);
`````

## Normalized

`````js filename=intro
let x = 1;
let y = 2;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = ['before ', ' after'];
let tmpCalleeParam$1;
const tmpArrElement = $(3);
const tmpArrElement$1 = $(4);
const tmpNestedAssignArrPatternRhs = [tmpArrElement, tmpArrElement$1];
const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
x = arrPatternSplat[0];
y = arrPatternSplat[1];
tmpCalleeParam$1 = tmpNestedAssignArrPatternRhs;
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
$(a, x, y);
`````

## Output

`````js filename=intro
let x = 1;
let y = 2;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = ['before ', ' after'];
let tmpCalleeParam$1;
const tmpArrElement = $(3);
const tmpArrElement$1 = $(4);
const tmpNestedAssignArrPatternRhs = [tmpArrElement, tmpArrElement$1];
const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
x = arrPatternSplat[0];
y = arrPatternSplat[1];
tmpCalleeParam$1 = tmpNestedAssignArrPatternRhs;
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
$(a, x, y);
`````

## Result

Should call `$` with:
 - 1: 3
 - 2: 4
 - 3: 
  ['before ', ' after'],
  [3, 4],

 - 4: { a: '999', b: '1000' }, 3, 4
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
