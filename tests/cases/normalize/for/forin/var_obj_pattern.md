# Preval test case

# var_obj_pattern.md

> Normalize > For > Forin > Var obj pattern
>
> For-in must be normalized

#TODO

## Input

`````js filename=intro
for (let [x] in {a: 1, b: 2}) $(x);
`````

## Pre Normal

`````js filename=intro
for (let [x] in { a: 1, b: 2 }) $(x);
`````

## Normalized

`````js filename=intro
const tmpForInPatDeclRhs = { a: 1, b: 2 };
let tmpForInPatDeclLhs;
let x;
for (tmpForInPatDeclLhs in tmpForInPatDeclRhs) {
  const arrAssignPatternRhs = tmpForInPatDeclLhs;
  const arrPatternSplat = [...arrAssignPatternRhs];
  x = arrPatternSplat[0];
  $(x);
}
`````

## Output

`````js filename=intro
const tmpForInPatDeclRhs = { a: 1, b: 2 };
let tmpForInPatDeclLhs;
for (tmpForInPatDeclLhs in tmpForInPatDeclRhs) {
  const arrAssignPatternRhs = tmpForInPatDeclLhs;
  const arrPatternSplat = [...arrAssignPatternRhs];
  const SSA_x = arrPatternSplat[0];
  $(SSA_x);
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'a'
 - 2: 'b'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
