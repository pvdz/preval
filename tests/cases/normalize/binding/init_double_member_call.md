# Preval test case

# init_double_member_call.md

> normalize > binding > init_double_member_call
>
> Binding declaration with a long init should be outlined

#TODO

## Input

`````js filename=intro
let x = "foo".length.toString();
$(x);
`````

## Normalized

`````js filename=intro
var tmpComplexMemberObj;
tmpComplexMemberObj = 'foo'.length;
let x = tmpComplexMemberObj.toString();
$(x);
`````

## Output

`````js filename=intro
var tmpComplexMemberObj;
tmpComplexMemberObj = 'foo'.length;
let x = tmpComplexMemberObj.toString();
$(x);
`````
