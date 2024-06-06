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
let styleName$5 = undefined;
const tmpForInDeclRhs = { x: 100 };
for (styleName$5 in tmpForInDeclRhs) {
  const checkme = $(1);
  if (checkme) {
    const tmpClusterSSA_checkme = $(2);
    if (tmpClusterSSA_checkme) {
      $(3);
    } else {
    }
  } else {
  }
}
`````

## PST Output

With rename=true

`````js filename=intro
let a = undefined;
const b = { x: 100 };
for (a in b) {
  const c = $( 1 );
  if (c) {
    const d = $( 2 );
    if (d) {
      $( 3 );
    }
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
