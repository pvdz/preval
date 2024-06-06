# Preval test case

# auto_ident_obj_pattern_assign_seq.md

> Normalize > Expressions > Bindings > Stmt global block > Auto ident obj pattern assign seq
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
{
  let x = 1,
    y = 2;

  let a = ({ x, y } = ($(x), $(y), { x: $(3), y: $(4) }));
  $(a, x, y);
}
`````

## Pre Normal


`````js filename=intro
{
  let x = 1,
    y = 2;
  let a = ({ x: x, y: y } = ($(x), $(y), { x: $(3), y: $(4) }));
  $(a, x, y);
}
`````

## Normalized


`````js filename=intro
let x = 1;
let y = 2;
let a = undefined;
$(x);
$(y);
const tmpObjLitVal = $(3);
const tmpObjLitVal$1 = $(4);
const tmpNestedAssignObjPatternRhs = { x: tmpObjLitVal, y: tmpObjLitVal$1 };
x = tmpNestedAssignObjPatternRhs.x;
y = tmpNestedAssignObjPatternRhs.y;
a = tmpNestedAssignObjPatternRhs;
$(a, x, y);
`````

## Output


`````js filename=intro
$(1);
$(2);
const tmpObjLitVal = $(3);
const tmpObjLitVal$1 = $(4);
const tmpNestedAssignObjPatternRhs = { x: tmpObjLitVal, y: tmpObjLitVal$1 };
$(tmpNestedAssignObjPatternRhs, tmpObjLitVal, tmpObjLitVal$1);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
$( 2 );
const a = $( 3 );
const b = $( 4 );
const c = {
x: a,
y: b
;
$( c, a, b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 3
 - 4: 4
 - 5: { x: '3', y: '4' }, 3, 4
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
