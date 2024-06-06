# Preval test case

# auto_ident_s-seq.md

> Normalize > Expressions > Assignments > For in left > Auto ident s-seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
for ((a = ($(1), $(2), x)).x in $({ x: 1 }));
$(a, x);
`````

## Pre Normal


`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
for ((a = ($(1), $(2), x)).x in $({ x: 1 }));
$(a, x);
`````

## Normalized


`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = { x: 1 };
const tmpForInRhs = tmpCallCallee(tmpCalleeParam);
let tmpForInLhsNode = undefined;
for (tmpForInLhsNode in tmpForInRhs) {
  $(1);
  $(2);
  a = x;
  let tmpAssignMemLhsObj = a;
  tmpAssignMemLhsObj.x = tmpForInLhsNode;
}
$(a, x);
`````

## Output


`````js filename=intro
const tmpCalleeParam = { x: 1 };
const tmpForInRhs = $(tmpCalleeParam);
let tmpForInLhsNode = undefined;
for (tmpForInLhsNode in tmpForInRhs) {
  $(1);
  $(2);
  (1).x = tmpForInLhsNode;
}
$(1, 1);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { x: 1 };
const b = $( a );
let c = undefined;
for (c in b) {
  $( 1 );
  $( 2 );
  1.x = c;
}
$( 1, 1 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: 1
 - 3: 2
 - eval returned: ("<crash[ Cannot create property 'x' on number '1' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
