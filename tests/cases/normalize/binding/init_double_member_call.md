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
var tmpMemberComplexObj;
tmpMemberComplexObj = 'foo'.length;
let x = tmpMemberComplexObj.toString();
$(x);
`````

## Output

`````js filename=intro
var tmpMemberComplexObj;
tmpMemberComplexObj = 'foo'.length;
let x = tmpMemberComplexObj.toString();
$(x);
`````

## Result

Should call `$` with:
[['3'], null];

Normalized calls: Same

Final output calls: Same
