# Preval test case

# computed_member_complex_simple.md

> normalize > assignment > template > computed_member_complex_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
$(`abc ${$(a)[$('x')] = b} def`)
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpAssignMemLhsObj;
var tmpAssignComMemLhsObj;
var tmpAssignComMemLhsProp;
let a = { x: 10 };
let b = 2;
let c = 3;
tmpArg = `abc ${
  ((tmpAssignMemLhsObj = $(a)),
  (tmpAssignComMemLhsObj = tmpAssignMemLhsObj),
  (tmpAssignComMemLhsProp = $('x')),
  (tmpAssignComMemLhsObj[tmpAssignComMemLhsProp] = b))
} def`;
$(tmpArg);
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpAssignMemLhsObj;
var tmpAssignComMemLhsObj;
var tmpAssignComMemLhsProp;
let a = { x: 10 };
tmpArg = `abc ${
  ((tmpAssignMemLhsObj = $(a)),
  (tmpAssignComMemLhsObj = tmpAssignMemLhsObj),
  (tmpAssignComMemLhsProp = $('x')),
  (tmpAssignComMemLhsObj[tmpAssignComMemLhsProp] = 2))
} def`;
$(tmpArg);
$(a, 2, 3);
`````

## Result

Should call `$` with:
 - 0: {"x":2}
 - 1: "x"
 - 2: "abc 2 def"
 - 3: {"x":2},2,3
 - 4: undefined

Normalized calls: Same

Final output calls: Same
