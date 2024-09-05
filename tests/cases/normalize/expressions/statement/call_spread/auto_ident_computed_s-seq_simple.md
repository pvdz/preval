# Preval test case

# auto_ident_computed_s-seq_simple.md

> Normalize > Expressions > Statement > Call spread > Auto ident computed s-seq simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
$(...(1, 2, b)[$("c")]);
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
$(...(1, 2, b)[$(`c`)]);
$(a, b);
`````

## Normalized


`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCompObj = b;
const tmpCompProp = $(`c`);
const tmpCalleeParamSpread = tmpCompObj[tmpCompProp];
tmpCallCallee(...tmpCalleeParamSpread);
$(a, b);
`````

## Output


`````js filename=intro
const tmpCompProp = $(`c`);
const b = { c: 1 };
const tmpCalleeParamSpread = b[tmpCompProp];
$(...tmpCalleeParamSpread);
const a = { a: 999, b: 1000 };
$(a, b);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( "c" );
const b = { c: 1 };
const c = b[ a ];
$( ... c );
const d = {
  a: 999,
  b: 1000,
};
$( d, b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'c'
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
