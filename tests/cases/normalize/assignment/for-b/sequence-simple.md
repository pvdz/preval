# Preval test case

# sequence-simple.md

> normalize > assignment > for-b > sequence-simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {c: 2}, c = 'unused', d = 0;
for (;(a, b).c = d;);
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
var tmpAssignMemLhsObj;
let a = 1;
let b = { c: 2 };
let c = 'unused';
let d = 0;
{
  while (true) {
    a;
    tmpAssignMemLhsObj = b;
    tmpAssignMemLhsObj.c = d;
    const tmpIfTest = d;
    if (tmpIfTest) {
    } else {
      break;
    }
  }
}
$(a, b, c, d);
`````

## Output

`````js filename=intro
var tmpAssignMemLhsObj;
let b = { c: 2 };
while (true) {
  tmpAssignMemLhsObj = b;
  tmpAssignMemLhsObj.c = 0;
  break;
}
$(1, b, 'unused', 0);
`````

## Result

Should call `$` with:
 - 0: 1,{"c":0},"unused",0
 - 1: undefined

Normalized calls: Same

Final output calls: Same
