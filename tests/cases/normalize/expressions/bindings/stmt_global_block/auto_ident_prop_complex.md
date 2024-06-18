# Preval test case

# auto_ident_prop_complex.md

> Normalize > Expressions > Bindings > Stmt global block > Auto ident prop complex
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
{
  let b = { c: 1 };

  let a = $(b).c;
  $(a, b);
}
`````

## Pre Normal


`````js filename=intro
{
  let b = { c: 1 };
  let a = $(b).c;
  $(a, b);
}
`````

## Normalized


`````js filename=intro
let b = { c: 1 };
const tmpCompObj = $(b);
let a = tmpCompObj.c;
$(a, b);
`````

## Output


`````js filename=intro
const b = { c: 1 };
const tmpCompObj = $(b);
const a = tmpCompObj.c;
$(a, b);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { c: 1 };
const b = $( a );
const c = b.c;
$( c, a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { c: '1' }
 - 2: 1, { c: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
