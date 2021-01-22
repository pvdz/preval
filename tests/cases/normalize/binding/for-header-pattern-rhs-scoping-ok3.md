# Preval test case

# for-header-rhs-scoping.md

> normalize > binding > for-header-rhs-scoping
>
> The RHS of a for-of and for-in are scoped to the special for-header scope, not the scope that wraps the statement. As such, the `x` is tdz'd and it the `[x,y]` part should result in a runtime tdz error over accessing `x`.

#TODO

## Input

`````js filename=intro
let x = 1;
let y = {};
for (let [x] in [y]) {
  $(x);
}
`````

## Normalized

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
let x = 1;
let y = {};
{
  const tmpForInPatDeclRhs = [y];
  let tmpForInPatDeclLhs;
  let x;
  for (tmpForInPatDeclLhs in tmpForInPatDeclRhs) {
    arrAssignPatternRhs = tmpForInPatDeclLhs;
    arrPatternSplat = [...arrAssignPatternRhs];
    x = arrPatternSplat[0];
    arrAssignPatternRhs;
    {
      $(x);
    }
  }
}
`````

## Output

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
let x = 1;
let y = {};
const tmpForInPatDeclRhs = [y];
let tmpForInPatDeclLhs;
let x;
for (tmpForInPatDeclLhs in tmpForInPatDeclRhs) {
  arrAssignPatternRhs = tmpForInPatDeclLhs;
  arrPatternSplat = [...arrAssignPatternRhs];
  x = arrPatternSplat[0];
  $(x);
}
`````

## Result

Should call `$` with:
 - 0: "0"
 - 1: undefined

Normalized calls: Same

Final output calls: BAD!!
["<crash[ Identifier 'x' has already been declared ]>"];

