# Preval test case

# ident_computed_member_complex_assign.md

> normalize > assignment > stmt > ident_computed_member_complex_assign
>
> Assignments of all kinds should be normalized in all circumstances

The computed property should be evaluated after the object, not before.

#TODO

## Input

`````js filename=intro
let x;
x = $(1)[$(2)];
$(3);
$(x); 
`````

## Normalized

`````js filename=intro
var tmpMemberComplexObj;
var tmpComputedObj;
var tmpComputedProp;
let x;
tmpMemberComplexObj = $(1);
tmpComputedObj = tmpMemberComplexObj;
tmpComputedProp = $(2);
x = tmpComputedObj[tmpComputedProp];
$(3);
$(x);
`````

## Output

`````js filename=intro
var tmpMemberComplexObj;
var tmpComputedObj;
var tmpComputedProp;
let x;
tmpMemberComplexObj = $(1);
tmpComputedObj = tmpMemberComplexObj;
tmpComputedProp = $(2);
x = tmpComputedObj[tmpComputedProp];
$(3);
$(x);
`````

## Result

Should call `$` with:
 - 0: 1
 - 1: 2
 - 2: <crash[ Cannot read property 'undefined' of undefined ]>

Normalized calls: Same

Final output calls: Same
