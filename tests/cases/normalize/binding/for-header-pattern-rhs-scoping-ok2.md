# Preval test case

# for-header-pattern-rhs-scoping-ok2.md

> Normalize > Binding > For-header-pattern-rhs-scoping-ok2
>
> The RHS of a for-of and for-in are scoped to the special for-header scope, not the scope that wraps the statement. As such, the `x` is tdz'd and it the `[x,y]` part should result in a runtime tdz error over accessing `x`.

#TODO

## Input

`````js filename=intro
let y = {};
for (let [x] in [y]) {
  $(x);
}
`````

## Pre Normal


`````js filename=intro
let y = {};
for (let [x] in [y]) {
  $(x);
}
`````

## Normalized


`````js filename=intro
let y = {};
const tmpForInPatDeclRhs = [y];
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
const y = {};
const tmpForInPatDeclRhs = [y];
let tmpForInPatDeclLhs = undefined;
for (tmpForInPatDeclLhs in tmpForInPatDeclRhs) {
  const arrPatternSplat = [...tmpForInPatDeclLhs];
  const tmpClusterSSA_x = arrPatternSplat[0];
  $(tmpClusterSSA_x);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = {};
const b = [ a ];
let c = undefined;
for (c in b) {
  const d = [ ... c ];
  const e = d[ 0 ];
  $( e );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '0'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
