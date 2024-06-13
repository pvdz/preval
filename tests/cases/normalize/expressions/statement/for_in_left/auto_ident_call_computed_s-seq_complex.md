# Preval test case

# auto_ident_call_computed_s-seq_complex.md

> Normalize > Expressions > Statement > For in left > Auto ident call computed s-seq complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
for ((1, 2, b)[$("$")](1).x in $({ x: 1 }));
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
for ((1, 2, b)[$(`\$`)](1).x in $({ x: 1 }));
$(a);
`````

## Normalized


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = { x: 1 };
const tmpForInRhs = tmpCallCallee(tmpCalleeParam);
let tmpForInLhsNode = undefined;
for (tmpForInLhsNode in tmpForInRhs) {
  const tmpCallCompObj = b;
  const tmpCallCompProp = $(`\$`);
  const tmpAssignMemLhsObj = tmpCallCompObj[tmpCallCompProp](1);
  tmpAssignMemLhsObj.x = tmpForInLhsNode;
}
$(a);
`````

## Output


`````js filename=intro
const b = { $: $ };
const a = { a: 999, b: 1000 };
const tmpCalleeParam = { x: 1 };
const tmpForInRhs = $(tmpCalleeParam);
let tmpForInLhsNode = undefined;
for (tmpForInLhsNode in tmpForInRhs) {
  const tmpCallCompProp = $(`\$`);
  const tmpAssignMemLhsObj = b[tmpCallCompProp](1);
  tmpAssignMemLhsObj.x = tmpForInLhsNode;
}
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { $: $ };
const b = {
  a: 999,
  b: 1000,
};
const c = { x: 1 };
const d = $( c );
let e = undefined;
for (e in d) {
  const f = $( "$" );
  const g = a[ f ]( 1 )};
  g.x = e;
}
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: '$'
 - 3: 1
 - eval returned: ("<crash[ Cannot create property 'x' on number '1' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
