# Preval test case

# simple_complex.md

> normalize > for > forin > simple_complex
>
> For-in must be normalized

#TODO

## Input

`````js filename=intro
for (let {x} in {a: 1, b: 2}) $(x);
`````

## Normalized

`````js filename=intro
var objAssignPatternRhs;
{
  const tmpForInPatDeclRhs = { a: 1, b: 2 };
  let tmpForInPatDeclLhs;
  let x;
  for (tmpForInPatDeclLhs in tmpForInPatDeclRhs) {
    objAssignPatternRhs = tmpForInPatDeclLhs;
    x = objAssignPatternRhs.x;
    objAssignPatternRhs;
    $(x);
  }
}
`````

## Output

`````js filename=intro
var objAssignPatternRhs;
const tmpForInPatDeclRhs = { a: 1, b: 2 };
let tmpForInPatDeclLhs;
let x;
for (tmpForInPatDeclLhs in tmpForInPatDeclRhs) {
  objAssignPatternRhs = tmpForInPatDeclLhs;
  x = objAssignPatternRhs.x;
  $(x);
}
`````

## Result

Should call `$` with:
 - 0: null
 - 1: null
 - 2: undefined

Normalized calls: Same

Final output calls: Same
