# Preval test case

# obj.md

> normalize > pattern > param > _base > obj
>
> Testing simple pattern normalizations

#TODO: arrow

## Input

`````js filename=intro
const f = (a = { x } = 1) => { return a };
`````

## Normalized

`````js filename=intro
const f = ($tdz$__a) => {
  var objAssignPatternRhs;
  let a;
  const tmpIfTest = $tdz$__a === undefined;
  if (tmpIfTest) {
    objAssignPatternRhs = 1;
    x = objAssignPatternRhs.x;
    a = objAssignPatternRhs;
  } else {
    a = $tdz$__a;
  }
  return a;
};
`````

## Output

`````js filename=intro
($tdz$__a) => {
  var objAssignPatternRhs;
  let a;
  const tmpIfTest = $tdz$__a === undefined;
  if (tmpIfTest) {
    objAssignPatternRhs = 1;
    x = objAssignPatternRhs.x;
    a = objAssignPatternRhs;
  } else {
    a = $tdz$__a;
  }
  return a;
};
`````

## Result

Should call `$` with:
 - 0: undefined

Normalized calls: Same

Final output calls: Same
