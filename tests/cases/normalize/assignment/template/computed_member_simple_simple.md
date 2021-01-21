# Preval test case

# computed_member_simple_simple.md

> normalize > assignment > template > computed_member_simple_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
$(`abc ${a[$('x')] = b} def`)
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpAssignComMemLhsObj;
var tmpAssignComMemLhsProp;
let a = { x: 10 };
let b = 2;
let c = 3;
tmpArg = `abc ${((tmpAssignComMemLhsObj = a), (tmpAssignComMemLhsProp = $('x')), (tmpAssignComMemLhsObj[tmpAssignComMemLhsProp] = b))} def`;
$(tmpArg);
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpAssignComMemLhsObj;
var tmpAssignComMemLhsProp;
let a = { x: 10 };
tmpArg = `abc ${((tmpAssignComMemLhsObj = a), (tmpAssignComMemLhsProp = $('x')), (tmpAssignComMemLhsObj[tmpAssignComMemLhsProp] = 2))} def`;
$(tmpArg);
$(a, 2, 3);
`````

## Result

Should call `$` with:
 - 0: "x"
 - 1: "abc 2 def"
 - 2: {"x":2},2,3
 - 3: undefined

Normalized calls: Same

Final output calls: Same
