# Preval test case

# auto_ident_computed_c-seq_simple.md

> Normalize > Expressions > Bindings > Stmt global block > Auto ident computed c-seq simple
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
{
  let b = { c: 1 };

  let a = (1, 2, $(b))[$("c")];
  $(a, b);
}
`````

## Pre Normal


`````js filename=intro
{
  let b = { c: 1 };
  let a = (1, 2, $(b))[$(`c`)];
  $(a, b);
}
`````

## Normalized


`````js filename=intro
let b = { c: 1 };
const tmpCompObj = $(b);
const tmpCompProp = $(`c`);
let a = tmpCompObj[tmpCompProp];
$(a, b);
`````

## Output


`````js filename=intro
const b = { c: 1 };
const tmpCompObj = $(b);
const tmpCompProp = $(`c`);
const a = tmpCompObj[tmpCompProp];
$(a, b);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { c: 1 };
const b = $( a );
const c = $( "c" );
const d = b[ c ];
$( d, a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { c: '1' }
 - 2: 'c'
 - 3: 1, { c: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
