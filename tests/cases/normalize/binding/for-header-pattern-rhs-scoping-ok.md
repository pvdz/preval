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
  let y = 2;
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
  const tmpForInDeclRhs = [y];
  let tmpForInDeclLhs;
  let x;
  for (tmpForInDeclLhs in tmpForInDeclRhs) {
    arrAssignPatternRhs = tmpForInDeclLhs;
    arrPatternSplat = [...arrAssignPatternRhs];
    x = arrPatternSplat[0];
    arrAssignPatternRhs;
    {
      let y_1 = 2;
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
const tmpForInDeclRhs = [y];
let tmpForInDeclLhs;
let x;
for (tmpForInDeclLhs in tmpForInDeclRhs) {
  arrAssignPatternRhs = tmpForInDeclLhs;
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

