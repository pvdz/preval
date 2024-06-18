# Preval test case

# for-header-pattern-rhs-scoping-ok.md

> Normalize > Binding > For-header-pattern-rhs-scoping-ok
>
> The RHS of a for-of and for-in are scoped to the special for-header scope, not the scope that wraps the statement. As such, the `x` is tdz'd and it the `[x,y]` part should result in a runtime tdz error over accessing `x`.

## Input

`````js filename=intro
let x = 1;
let y = {};
for (let [x] in [y]) {
  let y = 2;
  $(x);
}
`````

## Pre Normal


`````js filename=intro
let x = 1;
let y = {};
for (let [x$1] in [y]) {
  let y$1 = 2;
  $(x$1);
}
`````

## Normalized


`````js filename=intro
let x = 1;
let y = {};
const tmpForInPatDeclRhs = [y];
let tmpForInPatDeclLhs = undefined;
let x$1 = undefined;
for (tmpForInPatDeclLhs in tmpForInPatDeclRhs) {
  const arrAssignPatternRhs = tmpForInPatDeclLhs;
  const arrPatternSplat = [...arrAssignPatternRhs];
  x$1 = arrPatternSplat[0];
  let y$1 = 2;
  $(x$1);
}
`````

## Output


`````js filename=intro
const y = {};
const tmpForInPatDeclRhs = [y];
let tmpForInPatDeclLhs = undefined;
for (tmpForInPatDeclLhs in tmpForInPatDeclRhs) {
  const arrPatternSplat = [...tmpForInPatDeclLhs];
  const tmpClusterSSA_x$1 = arrPatternSplat[0];
  $(tmpClusterSSA_x$1);
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
