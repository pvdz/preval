# Preval test case

# computed_member_simple_simple.md

> normalize > assignment > throw > computed_member_simple_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
throw a[$('x')] = b;
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpAssignComputedObj;
var tmpAssignComputedProp;
var tmpAssignComputedRhs;
let a = { x: 10 };
let b = 2;
let c = 3;
{
  {
    tmpAssignComputedObj = a;
    tmpAssignComputedProp = $('x');
    tmpAssignComputedRhs = b;
    tmpAssignComputedObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
  }
  let tmpStmtArg = b;
  throw tmpStmtArg;
}
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpAssignComputedObj;
var tmpAssignComputedProp;
var tmpAssignComputedRhs;
let a = { x: 10 };
tmpAssignComputedObj = a;
tmpAssignComputedProp = $('x');
tmpAssignComputedRhs = 2;
tmpAssignComputedObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
throw 2;
$(a, 2, 3);
`````

## Result

Should call `$` with:
 - 0: "x"
 - 1: <crash[ 2 ]>

Normalized calls: Same

Final output calls: Same