# Preval test case

# auto_ident_arr_pattern_assign_seq.md

> Normalize > Expressions > Statement > For in right > Auto ident arr pattern assign seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let x = 1,
  y = 2;

let a = { a: 999, b: 1000 };
for (let x in ([x, y] = ($(x), $(y), [$(3), $(4)])));
$(a, x, y);
`````

## Pre Normal


`````js filename=intro
let x = 1,
  y = 2;
let a = { a: 999, b: 1000 };
for (let x$1 in ([x$1, y] = ($(x$1), $(y), [$(3), $(4)])));
$(a, x, y);
`````

## Normalized


`````js filename=intro
let x = 1;
let y = 2;
let a = { a: 999, b: 1000 };
let tmpForInDeclRhs = undefined;
$(x$1);
$(y);
const tmpArrElement = $(3);
const tmpArrElement$1 = $(4);
const tmpNestedAssignArrPatternRhs = [tmpArrElement, tmpArrElement$1];
const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
x$1 = arrPatternSplat[0];
y = arrPatternSplat[1];
tmpForInDeclRhs = tmpNestedAssignArrPatternRhs;
let x$1 = undefined;
for (x$1 in tmpForInDeclRhs) {
}
$(a, x, y);
`````

## Output


`````js filename=intro
throw `Preval: This statement contained a read that reached no writes: \$(x\$1);`;
`````

## PST Output

With rename=true

`````js filename=intro
throw "Preval: This statement contained a read that reached no writes: $(x$1);";
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Cannot access '<ref>' before initialization ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
