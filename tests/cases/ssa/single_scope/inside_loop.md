# Preval test case

# inside_loop.md

> Ssa > Single scope > Inside loop
>
> If the decl happens inside a loop the SSA should still be able to proceed

#TODO

## Input

`````js filename=intro
for (let styleName$5 in {x:100}) {
  let checkme = $(1);
  if (checkme) {
    checkme = $(2); // SSA here
    if (checkme) {
      $(3)
    }
  }
}
`````

## Pre Normal

`````js filename=intro
for (let styleName$5 in { x: 100 }) {
  let checkme = $(1);
  if (checkme) {
    checkme = $(2);
    if (checkme) {
      $(3);
    }
  }
}
`````

## Normalized

`````js filename=intro
const tmpForInDeclRhs = { x: 100 };
let styleName$5 = undefined;
for (styleName$5 in tmpForInDeclRhs) {
  let checkme = $(1);
  if (checkme) {
    checkme = $(2);
    if (checkme) {
      $(3);
    } else {
    }
  } else {
  }
}
`````

## Output

`````js filename=intro
const tmpForInDeclRhs = { x: 100 };
let styleName$5 = undefined;
for (styleName$5 in tmpForInDeclRhs) {
  const checkme = $(1);
  if (checkme) {
    const tmpSSA_checkme = $(2);
    if (tmpSSA_checkme) {
      $(3);
    } else {
    }
  } else {
  }
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same