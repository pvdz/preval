# Preval test case

# auto_ident_prop_s-seq.md

> Normalize > Expressions > Statement > Call spread > Auto ident prop s-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
$(...(1, 2, b).c);
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
$(...(1, 2, b).c);
$(a, b);
`````

## Normalized


`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCompObj = b;
const tmpCalleeParamSpread = tmpCompObj.c;
tmpCallCallee(...tmpCalleeParamSpread);
$(a, b);
`````

## Output


`````js filename=intro
$(...1);
const a /*:object*/ = { a: 999, b: 1000 };
const b /*:object*/ = { c: 1 };
$(a, b);
`````

## PST Output

With rename=true

`````js filename=intro
$( ...1 );
const a = {
  a: 999,
  b: 1000,
};
const b = { c: 1 };
$( a, b );
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
