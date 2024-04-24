# Preval test case

# auto_ident_logic_or_or.md

> Normalize > Expressions > Assignments > For in left > Auto ident logic or or
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for ((a = $($(0)) || $($(1)) || $($(2))).x in $({ x: 1 }));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
for ((a = $($(0)) || $($(1)) || $($(2))).x in $({ x: 1 }));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = { x: 1 };
const tmpForInRhs = tmpCallCallee(tmpCalleeParam);
let tmpForInLhsNode = undefined;
for (tmpForInLhsNode in tmpForInRhs) {
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = $(0);
  a = tmpCallCallee$1(tmpCalleeParam$1);
  if (a) {
  } else {
    const tmpCallCallee$3 = $;
    const tmpCalleeParam$3 = $(1);
    a = tmpCallCallee$3(tmpCalleeParam$3);
    if (a) {
    } else {
      const tmpCallCallee$5 = $;
      const tmpCalleeParam$5 = $(2);
      a = tmpCallCallee$5(tmpCalleeParam$5);
    }
  }
  let tmpAssignMemLhsObj = a;
  tmpAssignMemLhsObj.x = tmpForInLhsNode;
}
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCalleeParam = { x: 1 };
const tmpForInRhs = $(tmpCalleeParam);
let tmpForInLhsNode = undefined;
for (tmpForInLhsNode in tmpForInRhs) {
  const tmpCalleeParam$1 = $(0);
  a = $(tmpCalleeParam$1);
  if (a) {
  } else {
    const tmpCalleeParam$3 = $(1);
    a = $(tmpCalleeParam$3);
    if (a) {
    } else {
      const tmpCalleeParam$5 = $(2);
      a = $(tmpCalleeParam$5);
    }
  }
  a.x = tmpForInLhsNode;
}
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
let a = {
a: 999,
b: 1000
;
const b = { x: 1 };
const c = $( b );
let d = undefined;
for (d in c) {
  const e = $( 0 );
  a = $( e );
  if (a) {

  }
  else {
    const f = $( 1 );
    a = $( f );
    if (a) {

    }
    else {
      const g = $( 2 );
      a = $( g );
    }
  }
  a.x = d;
}
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: 0
 - 3: 0
 - 4: 1
 - 5: 1
 - eval returned: ("<crash[ Cannot create property 'x' on number '1' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
