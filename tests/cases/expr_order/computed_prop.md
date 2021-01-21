# Preval test case

# computed_prop.md

> expr_order > computed_prop
>
> The object is evaluated before the computed property

#TODO

## Input

`````js filename=intro
$(1)[$(2)];
`````

## Normalized

`````js filename=intro
var tmpMemberComplexObj;
var tmpComputedProp;
var tmpMemberSeqAssign;
((tmpComputedProp = $(2)), (tmpMemberComplexObj = $(1)), (tmpMemberSeqAssign = tmpMemberComplexObj), tmpMemberSeqAssign)[tmpComputedProp];
`````

## Output

`````js filename=intro
var tmpMemberComplexObj;
var tmpComputedProp;
var tmpMemberSeqAssign;
((tmpComputedProp = $(2)), (tmpMemberComplexObj = $(1)), (tmpMemberSeqAssign = tmpMemberComplexObj), tmpMemberSeqAssign)[tmpComputedProp];
`````

## Result

Should call `$` with:
 - 0: 1
 - 1: 2
 - 2: <crash[ Cannot read property 'undefined' of undefined ]>

Normalized calls: BAD?!
[[2], [1], "<crash[ Cannot read property 'undefined' of undefined ]>"];

Final output calls: BAD!!
[[2], [1], "<crash[ Cannot read property 'undefined' of undefined ]>"];

