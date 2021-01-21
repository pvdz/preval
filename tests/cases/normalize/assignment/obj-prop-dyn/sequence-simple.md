# Preval test case

# sequence-simple.md

> normalize > assignment > obj-prop-dyn > sequence-simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {c: 2}, c = 'unused', d = 3;
$({[((a, b).c = d)]: 1000});
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpComputedKey;
var tmpNestedAssignObj;
let a = 1;
let b = { c: 2 };
let c = 'unused';
let d = 3;
a;
tmpNestedAssignObj = b;
tmpNestedAssignObj.c = d;
tmpComputedKey = d;
tmpArg = { [tmpComputedKey]: 1000 };
$(tmpArg);
$(a, b, c, d);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpComputedKey;
var tmpNestedAssignObj;
let b = { c: 2 };
tmpNestedAssignObj = b;
tmpNestedAssignObj.c = 3;
tmpComputedKey = 3;
tmpArg = { [tmpComputedKey]: 1000 };
$(tmpArg);
$(1, b, 'unused', 3);
`````

## Result

Should call `$` with:
 - 0: {"3":1000}
 - 1: 1,{"c":3},"unused",3
 - 2: undefined

Normalized calls: Same

Final output calls: Same
