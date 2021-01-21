# Preval test case

# computed_no_no_no.md

> normalize > optional > computed_no_no_no
>
> Mix optional with regular member expressions

#TODO

## Input

`````js filename=intro
const a = {};
$(a[b][c][d]);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpMemberComplexObj;
var tmpMemberComplexObj_1;
const a = {};
tmpMemberComplexObj_1 = a[b];
tmpMemberComplexObj = tmpMemberComplexObj_1[c];
tmpArg = tmpMemberComplexObj[d];
$(tmpArg);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpMemberComplexObj;
var tmpMemberComplexObj_1;
const a = {};
tmpMemberComplexObj_1 = a[b];
tmpMemberComplexObj = tmpMemberComplexObj_1[c];
tmpArg = tmpMemberComplexObj[d];
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: <crash[ <ref> is not defined ]>

Normalized calls: Same

Final output calls: Same
