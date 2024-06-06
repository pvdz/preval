# Preval test case

# auto_ident_upd_ip_simple.md

> Normalize > Expressions > Statement > For in left > Auto ident upd ip simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
for ((b++).x in $({ x: 1 }));
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
for ((b++).x in $({ x: 1 }));
$(a, b);
`````

## Normalized


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = { x: 1 };
const tmpForInRhs = tmpCallCallee(tmpCalleeParam);
let tmpForInLhsNode = undefined;
for (tmpForInLhsNode in tmpForInRhs) {
  const tmpPostUpdArgIdent = b;
  b = b + 1;
  const tmpAssignMemLhsObj = tmpPostUpdArgIdent;
  tmpAssignMemLhsObj.x = tmpForInLhsNode;
}
$(a, b);
`````

## Output


`````js filename=intro
let b = 1;
const a = { a: 999, b: 1000 };
const tmpCalleeParam = { x: 1 };
const tmpForInRhs = $(tmpCalleeParam);
let tmpForInLhsNode = undefined;
for (tmpForInLhsNode in tmpForInRhs) {
  const tmpPostUpdArgIdent = b;
  b = b + 1;
  tmpPostUpdArgIdent.x = tmpForInLhsNode;
}
$(a, b);
`````

## PST Output

With rename=true

`````js filename=intro
let a = 1;
const b = {
a: 999,
b: 1000
;
const c = { x: 1 };
const d = $( c );
let e = undefined;
for (e in d) {
  const f = a;
  a = a + 1;
  f.x = e;
}
$( b, a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1' }
 - eval returned: ("<crash[ Cannot create property 'x' on number '1' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
