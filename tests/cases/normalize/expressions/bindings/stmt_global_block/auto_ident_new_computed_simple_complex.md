# Preval test case

# auto_ident_new_computed_simple_complex.md

> Normalize > Expressions > Bindings > Stmt global block > Auto ident new computed simple complex
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
{
  let b = { $ };

  let a = new b[$("$")](1);
  $(a);
}
`````

## Pre Normal


`````js filename=intro
{
  let b = { $: $ };
  let a = new b[$(`\$`)](1);
  $(a);
}
`````

## Normalized


`````js filename=intro
let b = { $: $ };
const tmpCompObj = b;
const tmpCompProp = $(`\$`);
const tmpNewCallee = tmpCompObj[tmpCompProp];
let a = new tmpNewCallee(1);
$(a);
`````

## Output


`````js filename=intro
const tmpCompProp = $(`\$`);
const b = { $: $ };
const tmpNewCallee = b[tmpCompProp];
const a = new tmpNewCallee(1);
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( "$" );
const b = { $: $ };
const c = b[ a ];
const d = new c( 1 );
$( d );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '$'
 - 2: 1
 - 3: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
