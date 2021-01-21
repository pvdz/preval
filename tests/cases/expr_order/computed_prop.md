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
var tmpComputedObj;
var tmpComputedProp;
{
  tmpMemberComplexObj = $(1);
  tmpComputedObj = tmpMemberComplexObj;
  tmpComputedProp = $(2);
  tmpComputedObj[tmpComputedProp];
}
`````

## Output

`````js filename=intro
var tmpMemberComplexObj;
var tmpComputedObj;
var tmpComputedProp;
tmpMemberComplexObj = $(1);
tmpComputedObj = tmpMemberComplexObj;
tmpComputedProp = $(2);
tmpComputedObj[tmpComputedProp];
`````

## Result

Should call `$` with:
 - 0: 1
 - 1: 2
 - 2: undefined

Normalized calls: Same

Final output calls: Same
