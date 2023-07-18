# Preval test case

# var_arr_pattern.md

> Normalize > For > Forin > Var arr pattern
>
> For-in must be normalized

#TODO

## Input

`````js filename=intro
for (let {x} in {a: 1, b: 2}) $(x);
`````

## Pre Normal

`````js filename=intro
for (let { x: x } in { a: 1, b: 2 }) $(x);
`````

## Normalized

`````js filename=intro
const tmpForInPatDeclRhs = { a: 1, b: 2 };
let tmpForInPatDeclLhs = undefined;
let x = undefined;
for (tmpForInPatDeclLhs in tmpForInPatDeclRhs) {
  const tmpAssignObjPatternRhs = tmpForInPatDeclLhs;
  x = tmpAssignObjPatternRhs.x;
  $(x);
}
`````

## Output

`````js filename=intro
let tmpForInPatDeclLhs = undefined;
let x = undefined;
const tmpForInPatDeclRhs = { a: 1, b: 2 };
for (tmpForInPatDeclLhs in tmpForInPatDeclRhs) {
  x = tmpForInPatDeclLhs.x;
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
for (a in c {
  b = a.x;
  $( b );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: undefined
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
