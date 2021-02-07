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
let x = 1;
let y = {};
{
  const tmpForInPatDeclRhs = [y];
  let tmpForInPatDeclLhs;
  let x_1;
  for (tmpForInPatDeclLhs in tmpForInPatDeclRhs) {
    const arrAssignPatternRhs = tmpForInPatDeclLhs;
    const arrPatternSplat = [...arrAssignPatternRhs];
    x_1 = arrPatternSplat[0];
    arrAssignPatternRhs;
    {
      $(x_1);
    }
  }
}
`````

## Output

`````js filename=intro
let y = {};
const tmpForInPatDeclRhs = [y];
let tmpForInPatDeclLhs;
let x_1;
for (tmpForInPatDeclLhs in tmpForInPatDeclRhs) {
  const arrAssignPatternRhs = tmpForInPatDeclLhs;
  const arrPatternSplat = [...arrAssignPatternRhs];
  x_1 = arrPatternSplat[0];
  $(x_1);
}
`````

## Result

Should call `$` with:
 - 1: '0'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
