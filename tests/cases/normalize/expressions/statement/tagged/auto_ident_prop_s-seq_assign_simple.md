# Preval test case

# auto_ident_prop_s-seq_assign_simple.md

> Normalize > Expressions > Statement > Tagged > Auto ident prop s-seq assign simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
$`before ${((1, 2, b).c = 2)} after`;
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
$([`before `, ` after`], ((1, 2, b).c = 2));
$(a, b);
`````

## Normalized


`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = [`before `, ` after`];
const varInitAssignLhsComputedObj = b;
const varInitAssignLhsComputedRhs = 2;
varInitAssignLhsComputedObj.c = varInitAssignLhsComputedRhs;
const tmpCalleeParam$1 = varInitAssignLhsComputedRhs;
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
$(a, b);
`````

## Output


`````js filename=intro
const b = { c: 2 };
const a = { a: 999, b: 1000 };
const tmpCalleeParam = [`before `, ` after`];
$(tmpCalleeParam, 2);
$(a, b);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { c: 2 };
const b = {
  a: 999,
  b: 1000,
};
const c = [ "before ", " after" ];
$( c, 2 );
$( b, a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: ['before ', ' after'], 2
 - 2: { a: '999', b: '1000' }, { c: '2' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
