# Preval test case

# auto_ident_arr_pattern_assign.md

> Normalize > Expressions > Bindings > Stmt global block > Auto ident arr pattern assign
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
{
  let x = 1,
    y = 2;

  let a = ([x, y] = [$(3), $(4)]);
  $(a, x, y);
}
`````

## Pre Normal

`````js filename=intro
{
  let x = 1,
    y = 2;
  let a = ([x, y] = [$(3), $(4)]);
  $(a, x, y);
}
`````

## Normalized

`````js filename=intro
let x = 1;
let y = 2;
let a = undefined;
const tmpArrElement = $(3);
const tmpArrElement$1 = $(4);
const tmpNestedAssignArrPatternRhs = [tmpArrElement, tmpArrElement$1];
const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
x = arrPatternSplat[0];
y = arrPatternSplat[1];
a = tmpNestedAssignArrPatternRhs;
$(a, x, y);
`````

## Output

`````js filename=intro
const tmpArrElement = $(3);
const tmpArrElement$1 = $(4);
const tmpNestedAssignArrPatternRhs = [tmpArrElement, tmpArrElement$1];
const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
const tmpSSA_x = arrPatternSplat[0];
const tmpSSA_y = arrPatternSplat[1];
$(tmpNestedAssignArrPatternRhs, tmpSSA_x, tmpSSA_y);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 3 );
const b = $( 4 );
const c = [ a, b,, ];
const d = [ ... c,, ];
const e = d[ 0 ];
const f = d[ 1 ];
$( c, e, f );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 3
 - 2: 4
 - 3: [3, 4], 3, 4
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
