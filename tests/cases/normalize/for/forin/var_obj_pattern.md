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
let tmpForInPatDeclLhs = undefined;
let x = undefined;
for (tmpForInPatDeclLhs in tmpForInPatDeclRhs) {
  const arrAssignPatternRhs = tmpForInPatDeclLhs;
  const arrPatternSplat = [...arrAssignPatternRhs];
  x = arrPatternSplat[0];
  $(x);
}
`````

## Output

`````js filename=intro
let tmpForInPatDeclLhs = undefined;
let x = undefined;
const tmpForInPatDeclRhs = { a: 1, b: 2 };
for (tmpForInPatDeclLhs in tmpForInPatDeclRhs) {
  const arrPatternSplat = [...tmpForInPatDeclLhs];
  x = arrPatternSplat[0];
  $(x);
}
`````

## PST Output

With rename=true

`````js filename=intro
let a = undefined;
let b = undefined;
const c = {
a: 1,
b: 2
;
for (a in c) {
  const d = [ ... a ];
  b = d[ 0 ];
  $( b );
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
