# Preval test case

# auto_ident_computed_s-seq_simple.md

> Normalize > Expressions > Bindings > Stmt global block > Auto ident computed s-seq simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
{
  let b = { c: 1 };

  let a = (1, 2, b)[$("c")];
  $(a, b);
}
`````

## Pre Normal

`````js filename=intro
{
  let b = { c: 1 };
  let a = (1, 2, b)[$(`c`)];
  $(a, b);
}
`````

## Normalized

`````js filename=intro
let b = { c: 1 };
const tmpCompObj = b;
const tmpCompProp = $(`c`);
let a = tmpCompObj[tmpCompProp];
$(a, b);
`````

## Output

`````js filename=intro
const tmpCompProp = $(`c`);
const b = { c: 1 };
const a = b[tmpCompProp];
$(a, b);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( "c" );
const b = { c: 1 };
const c = b[ a ];
$( c, b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'c'
 - 2: 1, { c: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
