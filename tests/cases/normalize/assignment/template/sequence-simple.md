# Preval test case

# sequence-simple.md

> normalize > assignment > template > sequence-simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {c: 2}, c = 'unused', d = 3;
$(`abc ${(a, b).c = d} def`);
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpAssignMemLhsObj;
let a = 1;
let b = { c: 2 };
let c = 'unused';
let d = 3;
tmpArg = `abc ${(a, (tmpAssignMemLhsObj = b), (tmpAssignMemLhsObj.c = d))} def`;
$(tmpArg);
$(a, b, c, d);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpAssignMemLhsObj;
let b = { c: 2 };
tmpArg = `abc ${(1, (tmpAssignMemLhsObj = b), (tmpAssignMemLhsObj.c = 3))} def`;
$(tmpArg);
$(1, b, 'unused', 3);
`````

## Result

Should call `$` with:
 - 0: "abc 3 def"
 - 1: 1,{"c":3},"unused",3
 - 2: undefined

Normalized calls: Same

Final output calls: Same
